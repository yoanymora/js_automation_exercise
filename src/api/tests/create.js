import { bookingData } from '../data/booker.data.js';
import bookerService from '../services/booker.service.js';
import Validate from '../utils/validations.js';

describe('Create bookings', () => {

    it('Create booking with correct data', async () => {
        const createBookingResponse = await bookerService.createBooking();
        Validate.responseTime(createBookingResponse.responseTime);
        Validate.responseBody({level: 'key', request: 'create', value: createBookingResponse.body});
        Validate.statusCode('ok', createBookingResponse.statusCode);
        Validate.responseHeaders(createBookingResponse.headers['content-type']);
        Validate.responseBody({level: 'schema', request: 'create', value: createBookingResponse.body});
    });

    it('Create booking with incomplete data', async () => {
        const createBookingResponse = await bookerService.createBooking(bookingData.createBooking.incomplete);
        Validate.responseTime(createBookingResponse.responseTime);
        Validate.responseBody(
            {level: 'key', request: 'create', value: createBookingResponse.body, assertion: false}
        );
        Validate.statusCode('internal-server-error', createBookingResponse.statusCode);
        Validate.responseBody(
            {level: 'schema', request: 'create', value: createBookingResponse.body, assertion: false}
        );
    });

    it('Create booking with incorrect data', async () => {
        const createBookingResponse = await bookerService.createBooking(bookingData.createBooking.incorrect);
        Validate.responseTime(createBookingResponse.responseTime);
        Validate.responseBody(
            {level: 'key', request: 'create', value: createBookingResponse.body, assertion: false}
        );
        Validate.statusCode('internal-server-error', createBookingResponse.statusCode);
        Validate.responseBody(
            {level: 'schema', request: 'create', value: createBookingResponse.body, assertion: false}
        );
    });

    it('Create booking with missing headers Accept & Content-type', async () => {
        const createBookingResponse = await bookerService.createRequest(
            {verb: 'post', data: bookingData.createBooking.correct, incompleteHeaders: true}
        );
        Validate.responseTime(createBookingResponse.responseTime);
        Validate.responseBody(
            {level: 'key', request: 'create', value: createBookingResponse.body, assertion: false}
        );
        Validate.statusCode('teapot', createBookingResponse.statusCode);
        Validate.responseBody(
            {level: 'schema', request: 'create', value: createBookingResponse.body, assertion: false}
        );
    });

});
