import bookerService from '../services/booker.service.js';
import Validate from '../utils/validations.js';
import { filterData } from '../data/booker.data.js';

describe('Get bookings', () => {

    it('Get all booking ids', async () => {
        const getBookingsResponse = await bookerService.getBookings({});
        Validate.responseTime(getBookingsResponse.responseTime);
        Validate.statusCode('ok', getBookingsResponse.statusCode);
    });

    it('Bad request to get all booking ids', async () => {
        const getBookingsResponse = await bookerService.getBookings({endpoint: '/boking'});
        Validate.statusCode('not-found', getBookingsResponse.statusCode);
    });

    it('Get booking ids with filters', async () => {
        await bookerService.createMultipleBookings();
        const responseFilterByFirstname = await bookerService.getBookings(
            {endpoint: `${bookerService.endpoint.booking}?firstname=${filterData.firstname}`}
        );
        Validate.recordsLength(responseFilterByFirstname.length, 1);
        const responseFilterByFirstAndLastname = await bookerService.getBookings(
            {endpoint: `${bookerService.endpoint.booking}?firstname=${filterData.firstname}&lastname=${filterData.incorrectLastname}`}
        );
        Validate.recordsLength(responseFilterByFirstAndLastname.length, 0);
        const responseFilterByCheckinAndLastname = await bookerService.getBookings(
            {endpoint: `${bookerService.endpoint.booking}?checkin=${filterData.checkin}&lastname=${filterData.lastname}`}
        );
        Validate.recordsLength(responseFilterByCheckinAndLastname.length, 0);
    });

});
