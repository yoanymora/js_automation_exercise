import { should } from 'chai';
import { bookingData, expectedResponseTime, filterData } from '../services/booker.data.js';
import bookerService from '../services/booker.service.js';
import Joi from 'joi';

should();

describe('Update bookings', () => {

    it('Incorrectly update booking', async () => {
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

    it('Update booking with Basic Auth', async () => {
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

    it('Update booking with Cookie', async () => {
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

});
