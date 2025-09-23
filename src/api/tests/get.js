import { should } from 'chai';
import { expectedResponseTime, filterData } from '../services/booker.data.js';
import bookerService from '../services/booker.service.js';

should();

describe('Get bookings', () => {

    it('Get all booking ids', async () => {
        const getBookingsResponse = await bookerService.getBookings({});
        (getBookingsResponse.responseTime).should.be.below(expectedResponseTime);
        (getBookingsResponse.statusCode).should.equal(200);
    });

    it('Bad request to get all booking ids', async () => {
        const getBookingsResponse = await bookerService.getBookings({endpoint: '/boking'});
        (getBookingsResponse.statusCode).should.equal(404);
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

});
