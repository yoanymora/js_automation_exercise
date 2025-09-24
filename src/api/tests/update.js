import { bookingData } from '../data/booker.data.js';
import bookerService from '../services/booker.service.js';
import Validate from '../utils/validations.js';

describe('Update bookings', () => {

    it('Incorrectly update booking', async () => {
        const createBookingResponse = await bookerService.createBooking();
        Validate.statusCode('ok', createBookingResponse.statusCode);
        Validate.recordFirstname({current: createBookingResponse.body.booking.firstname});
        const updateBookingResponse = await bookerService.updateBooking(
            {
                bookingId: createBookingResponse.bookingId,
                auth: 'basic',
                data: bookingData.createBooking.incorrect
            }
        );
        Validate.statusCode('internal-server-error', updateBookingResponse.statusCode);
    });

    it('Update booking with Basic Auth', async () => {
        const createBookingResponse = await bookerService.createBooking();
        Validate.recordFirstname({current: createBookingResponse.body.booking.firstname});
        const updateBookingResponse = await bookerService.updateBooking(
            {
                bookingId: createBookingResponse.bookingId,
                auth: 'basic'
            }
        );
        Validate.statusCode('ok', updateBookingResponse.statusCode);
        Validate.recordFirstname({current: updateBookingResponse.body.firstname, assertion: false});
        Validate.recordFirstname({current: updateBookingResponse.body.firstname, expected: bookingData.updateBooking.firstname});
        Validate.responseBody(
            {level: 'schema', request: 'update', value: updateBookingResponse.body, assertion: true}
        );
    });

    it('Update booking with Cookie', async () => {
        const createBookingResponse = await bookerService.createBooking();
        Validate.recordFirstname({current: createBookingResponse.body.booking.firstname});
        const authResponse = await bookerService.createRequest({verb: 'auth'});
        const updateBookingResponse = await bookerService.updateBooking(
            {
                bookingId: createBookingResponse.bookingId,
                auth: 'cookie',
                token: authResponse.body.token
            }
        );
        Validate.recordFirstname({current: updateBookingResponse.body.firstname, assertion: false});
        Validate.recordFirstname({current: updateBookingResponse.body.firstname, expected: bookingData.updateBooking.firstname});
        Validate.responseBody(
            {level: 'schema', request: 'update', value: updateBookingResponse.body, assertion: true}
        );
    });

});
