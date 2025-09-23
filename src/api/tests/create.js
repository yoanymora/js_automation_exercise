import { should } from 'chai';
import { bookingData, expectedResponseTime, filterData } from '../services/booker.data.js';
import bookerService from '../services/booker.service.js';
import Joi from 'joi';

should();

describe('Create bookings', () => {

    it('Create booking with correct data', async () => {
        const getBookingsResponse = await bookerService.createBooking();
        (getBookingsResponse.responseTime).should.be.below(expectedResponseTime);
        (getBookingsResponse.body).should.to.have.all.keys(bookingData.responseSchema.createBookingKeys);
        (getBookingsResponse.statusCode).should.be.equal(200);
        (getBookingsResponse.headers['content-type']).should.equal(bookingData.headers.contentType);
        Joi.assert(getBookingsResponse.body, bookingData.responseSchema.createBooking);
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

});
