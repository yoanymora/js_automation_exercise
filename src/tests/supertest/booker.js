import { should } from 'chai';
import { bookingData, expectedResponseTime, filterData } from '../../po/service/booker.data.js';
import bookerService from '../../po/service/booker.service.js';
import Joi from 'joi';

should();

describe('Booker API testing', () => {
    it('Get booking ids', async () => {
        const getBookingsResponse = await bookerService.getBookings({});
        (getBookingsResponse.responseTime).should.be.below(expectedResponseTime);
        (getBookingsResponse.statusCode).should.equal(200);
    });

    it('Bad request to get booking ids', async () => {
        const getBookingsResponse = await bookerService.getBookings({endpoint: '/boking'});
        (getBookingsResponse.statusCode).should.equal(404);
    });

    it('Create booking', async () => {
        const getBookingsResponse = await bookerService.createBooking();
        (getBookingsResponse.responseTime).should.be.below(expectedResponseTime);
        (getBookingsResponse.body).should.to.have.all.keys(bookingData.responseSchema.createBookingKeys);
        (getBookingsResponse.statusCode).should.be.equal(200);
        (getBookingsResponse.headers['content-type']).should.equal(bookingData.headers.contentType);
        Joi.assert(getBookingsResponse.body, bookingData.responseSchema.createBooking);
    });

    it('Get booking ids with filters', async () => {
        await bookerService.createMultipleBookings();
        const responseFilterByFirstname = await bookerService.getBookings(
            {endpoint: `${bookerService.endpoint.booking}?firstname=${filterData.firstname}`}
        );
        (responseFilterByFirstname.body.length).should.be.at.least(1);
        const responseFilterByFirstAndLastname = await bookerService.getBookings(
            {endpoint: `${bookerService.endpoint.booking}?firstname=${filterData.firstname}&lastname=${filterData.incorrectLastname}`}
        );
        (responseFilterByFirstAndLastname.body.length).should.equal(0);
        const responseFilterByCheckinAndLastname = await bookerService.getBookings(
            {endpoint: `${bookerService.endpoint.booking}?checkin=${filterData.checkin}&lastname=${filterData.lastname}`}
        );
        (responseFilterByCheckinAndLastname.body.length).should.be.equal(0);
    });

    it('Create booking with incomplete data', async () => {
        const createBookingResponse = await bookerService.createBooking(bookingData.createBooking.incomplete);
        (createBookingResponse.responseTime).should.be.below(expectedResponseTime);
        (createBookingResponse.body).should.not.to.have.all.keys(bookingData.responseSchema.createBookingKeys);
        (createBookingResponse.statusCode).should.be.equal(500);
        Joi.assert(createBookingResponse.body, Joi.object());
        Joi.isError(bookingData.responseSchema.createBooking.validate(createBookingResponse.body));
    });

    it('Create booking with incorrect data', async () => {
        const createBookingResponse = await bookerService.createBooking(bookingData.createBooking.incorrect);
        (createBookingResponse.responseTime).should.be.below(expectedResponseTime);
        (createBookingResponse.body).should.not.to.have.all.keys(bookingData.responseSchema.createBookingKeys);
        (createBookingResponse.statusCode).should.be.equal(500);
        Joi.assert(createBookingResponse.body, Joi.object());
        Joi.isError(bookingData.responseSchema.createBooking.validate(createBookingResponse.body));
    });

    it('Create booking with missing headers Accept & Content-type', async () => {
        const createBookingResponse = await bookerService.createRequest(
            {verb: 'post', data: bookingData.createBooking.correct, incompleteHeaders: true}
        );
        (createBookingResponse.responseTime).should.be.below(expectedResponseTime);
        (createBookingResponse.body).should.not.to.have.all.keys(bookingData.responseSchema.createBookingKeys);
        (createBookingResponse.statusCode).should.be.equal(418);
        (createBookingResponse.error.text).should.be.equal("I'm a Teapot");
        Joi.assert(createBookingResponse.body, Joi.object());
    });

    it('Create and incorrectly update booking', async () => {
        const createBookingResponse = await bookerService.createBooking();
        (createBookingResponse.statusCode).should.be.equal(200);
        (createBookingResponse.body.booking.firstname).should.equal(bookingData.createBooking.correct.firstname);
        const updateBookingResponse = await bookerService.updateBooking(
            {
                bookingId: createBookingResponse.bookingId,
                auth: 'basic',
                data: bookingData.createBooking.incorrect
            }
        );
        (updateBookingResponse.statusCode).should.be.equal(500);
    });

    it('Create and update booking with Basic Auth', async () => {
        const createBookingResponse = await bookerService.createBooking();
        (createBookingResponse.body.booking.firstname).should.be.equal(bookingData.createBooking.correct.firstname);
        const updateBookingResponse = await bookerService.updateBooking(
            {
                bookingId: createBookingResponse.bookingId,
                auth: 'basic'
            }
        );
        (updateBookingResponse.statusCode).should.be.equal(200);
        (updateBookingResponse.body.firstname).should.not.to.equal(bookingData.createBooking.correct.firstname);
        (updateBookingResponse.body.firstname).should.be.equal(bookingData.updateBooking.firstname);
        Joi.assert(updateBookingResponse.body, bookingData.responseSchema.updateBooking);
    });

    it('Create and update booking with Cookie', async () => {
        const createBookingResponse = await bookerService.createBooking();
        (createBookingResponse.body.booking.firstname).should.be.equal(bookingData.createBooking.correct.firstname);
        const authResponse = await bookerService.createRequest({verb: 'auth'});
        const updateBookingResponse = await bookerService.updateBooking(
            {
                bookingId: createBookingResponse.bookingId,
                auth: 'cookie',
                token: authResponse.body.token
            }
        );
        (updateBookingResponse.body.firstname).should.not.to.equal(bookingData.createBooking.correct.firstname);
        (updateBookingResponse.body.firstname).should.be.equal(bookingData.updateBooking.firstname);
        Joi.assert(updateBookingResponse.body, bookingData.responseSchema.updateBooking);
    });

    it('Create and delete booking with Basic Auth', async () => {
        const createBookingResponse = await bookerService.createBooking();
        const deleteBookingResponse = await bookerService.deleteBooking(
            {bookingId: createBookingResponse.bookingId, auth: 'basic'}
        );
        (deleteBookingResponse.statusCode).should.be.equal(201);
        (deleteBookingResponse.text).should.equal('Created');
    });

    it('Create and delete booking with Cookie', async () => {
        const createBookingResponse = await bookerService.createBooking();
        const authResponse = await bookerService.createRequest({verb: 'auth'});
        const deleteBookingResponse = await bookerService.deleteBooking(
            {bookingId: createBookingResponse.bookingId, auth: 'cookie', token: authResponse.body.token}
        );
        (deleteBookingResponse.statusCode).should.be.equal(201);
        (deleteBookingResponse.text).should.equal('Created');
        const getDeletedBookingResponse = await bookerService.getBookings({bookingId: createBookingResponse.bookingId});
        (getDeletedBookingResponse.statusCode).should.be.equal(404);
    });

});
