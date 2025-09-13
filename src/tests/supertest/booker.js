import request from 'supertest';
import { should } from 'chai';
import { bookingData, expectedResponseTime, computeResponseTime } from './data.js';
import Joi from 'joi';

should();

describe('Booker API testing', () => {
    it('Get booking ids', async () => {
        const startTime = performance.now();
        const response = await request(bookingData.url)
        .get(bookingData.endpoint.booking)
        .set('Accept', 'application/json');
        const endTime = performance.now();
        let responseTime = computeResponseTime(startTime, endTime);
        (responseTime).should.be.below(expectedResponseTime);
        (response.statusCode).should.equal(200);
    });

    it('Bad request to get booking ids', async () => {
        const response = await request(bookingData.url)
            .get('/bookingss')
            .set('Accept', 'application/json');
        (response.statusCode).should.equal(404);
    });

    it('Create booking', async () => {
        const startTime = performance.now();
        const response = await request(bookingData.url)
        .post(bookingData.endpoint.booking)
        .set('Content-type', 'application/json')
        .set('Accept', 'application/json')
        .send(bookingData.createBooking.correct);
        const endTime = performance.now();
        let responseTime = computeResponseTime(startTime, endTime);
        (responseTime).should.be.below(expectedResponseTime);
        (response.body).should.to.have.all.keys("bookingid", "booking");
        (response.statusCode).should.be.equal(200);
        (response.headers['content-type']).should.equal('application/json; charset=utf-8');
        Joi.assert(response.body, bookingData.responseSchema.createBooking);
    });

    it('Get booking ids with filters', async () => {
        bookingData.multipleBookingCreationData.forEach(async (booking) => {
            await request(bookingData.url)
            .post(bookingData.endpoint.booking)
            .set('Accept', 'application/json')
            .set('Content-type', 'application/json')
            .send(booking);
        });
        return request(bookingData.url)
        .get(`${bookingData.endpoint.booking}?firstname=Tierra`)
        .then(responseFilterByFirstname => {
            (responseFilterByFirstname.body.length).should.be.at.least(1);
            return request(bookingData.url)
            .get(`${bookingData.endpoint.booking}?firstname=Tierra&lastname=Media`)
            .set('Accept', 'application/json');
        })
        .then((responseFilterByFirstnameAndLastname) => {
            (responseFilterByFirstnameAndLastname.body.length).should.equal(0);
            return request(bookingData.url)
            .get(`${bookingData.endpoint.booking}?checkin=2025-01-01&lastname=Azul`)
            .set('Accept', 'application/json');
        })
        .then(responseFilterByCheckin => {
            // this filter should return at least 3 elements, but the API has a bug and returns 0
            (responseFilterByCheckin.body.length).should.be.equal(0);
        });
    });

    it('Create booking with incomplete data', async () => {
        const startTime = performance.now();
        const response = await request(bookingData.url)
        .post(bookingData.endpoint.booking)
        .send(bookingData.createBooking.incomplete)
        .set('Accept', 'application/json')
        .set('Content-type', 'application/json');
        const endTime = performance.now();
        let responseTime = computeResponseTime(startTime, endTime);
        (responseTime).should.be.below(expectedResponseTime);
        (response.body).should.not.to.have.all.keys("bookingid", "booking");
        (response.statusCode).should.be.equal(500);
        (response.error.text).should.be.equal("Internal Server Error");
        Joi.assert(response.body, Joi.object());
        Joi.isError(bookingData.responseSchema.createBooking.validate(response.body));
    });

    it('Create booking with incorrect data', async () => {
        const startTime = performance.now();
        const response = await request(bookingData.url)
        .post(bookingData.endpoint.booking)
        .send(bookingData.createBooking.incorrect)
        .set('Accept', 'application/json')
        .set('Content-type', 'application/json');
        const endTime = performance.now();
        let responseTime = computeResponseTime(startTime, endTime);
        (responseTime).should.be.below(expectedResponseTime);
        (response.body).should.not.to.have.all.keys("bookingid", "booking");
        (response.statusCode).should.be.equal(500);
        (response.error.text).should.be.equal("Internal Server Error");
        Joi.assert(response.body, Joi.object());
        Joi.isError(bookingData.responseSchema.createBooking.validate(response.body));
    });

    it('Create booking with missing headers Accept & Content-type', async () => {
        const startTime = performance.now();
        const response = await request(bookingData.url)
        .post(bookingData.endpoint.booking)
        .send(bookingData.createBooking.correct);
        const endTime = performance.now();
        let responseTime = computeResponseTime(startTime, endTime);
        (responseTime).should.be.below(expectedResponseTime);
        (response.body).should.not.to.have.all.keys("bookingid", "booking");
        (response.statusCode).should.be.equal(418);
        (response.error.text).should.be.equal("I'm a Teapot");
        Joi.assert(response.body, Joi.object());
    });

    it('Create and incorrectly update booking', () => {
        return request(bookingData.url)
        .post(bookingData.endpoint.booking)
        .set('Accept', 'application/json')
        .set('Content-type', 'application/json')
        .send(bookingData.createBooking.correct)
        .then(response => {
            (response.statusCode).should.be.equal(200);
            (response.body.booking.firstname).should.equal(bookingData.createBooking.correct.firstname);
            return request(bookingData.url)
            .put(`${bookingData.endpoint.booking}/${response.body.bookingid}`)
            .set('Accept', 'application/json')
            .set('Content-type', 'application/json')
            .send(bookingData.updateBooking)
        })
        .then(updateResponse => {
            (updateResponse.statusCode).should.be.equal(403);
        });
    });

    it('Create and update booking with Basic Auth', () => {
        return request(bookingData.url)
        .post(bookingData.endpoint.booking)
        .set('Accept', 'application/json')
        .set('Content-type', 'application/json')
        .send(bookingData.createBooking.correct)
        .then(response => {
            (response.statusCode).should.be.equal(200);
            (response.body.booking.firstname).should.be.equal(bookingData.createBooking.correct.firstname);
            return request(bookingData.url)
            .put(`${bookingData.endpoint.booking}/${response.body.bookingid}`)
            .set('Accept', 'application/json')
            .set('Content-type', 'application/json')
            .auth('admin', 'password123')
            .send(bookingData.updateBooking)
        })
        .then(updateResponse => {
            (updateResponse.statusCode).should.be.equal(200);
            (updateResponse.body.firstname).should.not.to.equal(bookingData.createBooking.correct.firstname);
            (updateResponse.body.firstname).should.be.equal(bookingData.updateBooking.firstname);
            Joi.assert(updateResponse.body, bookingData.responseSchema.updateBooking);
        });
    });

    it('Create and update booking with Cookie', async () => {
        return request(bookingData.url)
        .post(bookingData.endpoint.booking)
        .set('Accept', 'application/json')
        .set('Content-type', 'application/json')
        .send(bookingData.createBooking.correct)
        .then(async response => {
            (response.statusCode).should.be.equal(200);
            const authResponse = await request(bookingData.url)
                .post(bookingData.endpoint.auth)
                .set('Content-type', 'application/json')
                .send(bookingData.authData);
            (response.body.booking.firstname).should.be.equal(bookingData.createBooking.correct.firstname);
            const updateResponse = await request(bookingData.url)
                .put(`${bookingData.endpoint.booking}/${response.body.bookingid}`)
                .set('Accept', 'application/json')
                .set('Content-type', 'application/json')
                .set('Cookie', `token=${authResponse.body.token}`)
                .send(bookingData.updateBooking);
            (updateResponse.body.firstname).should.not.to.equal(bookingData.createBooking.correct.firstname);
            (updateResponse.body.firstname).should.be.equal(bookingData.updateBooking.firstname);
            Joi.assert(updateResponse.body, bookingData.responseSchema.updateBooking);
        });
    });

    it('Create and delete booking with Basic Auth', () => {
        return request(bookingData.url)
        .post(bookingData.endpoint.booking)
        .set('Accept', 'application/json')
        .set('Content-type', 'application/json')
        .send(bookingData.createBooking.correct)
        .then(response => {
            (response.statusCode).should.be.equal(200);
            return request(bookingData.url)
            .delete(`${bookingData.endpoint.booking}/${response.body.bookingid}`)
            .auth('admin', 'password123')
        })
        .then(deleteResponse => {
            (deleteResponse.statusCode).should.be.equal(201);
            (deleteResponse.text).should.equal('Created');
        });
    });

    it('Create and delete booking with Cookie', async () => {
        return request(bookingData.url)
        .post(bookingData.endpoint.booking)
        .set('Accept', 'application/json')
        .set('Content-type', 'application/json')
        .send(bookingData.createBooking.correct)
        .then(async response => {
            (response.statusCode).should.be.equal(200);
            const authResponse = await request(bookingData.url)
                .post(bookingData.endpoint.auth)
                .set('Content-type', 'application/json')
                .send(bookingData.authData);
            (response.body.booking.firstname).should.be.equal(bookingData.createBooking.correct.firstname);
            const deleteResponse = await request(bookingData.url)
                .delete(`${bookingData.endpoint.booking}/${response.body.bookingid}`)
                .set('Cookie', `token=${authResponse.body.token}`);
            (deleteResponse.statusCode).should.be.equal(201);
            (deleteResponse.text).should.equal('Created');
            const getResponse = await request(bookingData.url)
                .get(`${bookingData.endpoint.booking}/${response.body.bookingid}`)
                .set('Accept', 'application/json');
            (getResponse.statusCode).should.be.equal(404);
        })
    });
});
