import { should } from 'chai';
import bookerService from '../services/booker.service.js';

should();

describe('Delete booking', () => {

    it('Delete booking with Basic Auth', async () => {
        const createBookingResponse = await bookerService.createBooking();
        const deleteBookingResponse = await bookerService.deleteBooking(
            {bookingId: createBookingResponse.bookingId, auth: 'basic'}
        );
        (deleteBookingResponse.statusCode).should.be.equal(201);
        (deleteBookingResponse.text).should.equal('Created');
    });

    it('Delete booking with Cookie', async () => {
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
