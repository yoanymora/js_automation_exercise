import request from 'supertest';
import { bookingData } from '../data/booker.data.js';

class BookerService  {

    constructor () {
        this.url = 'https://restful-booker.herokuapp.com';
        this.endpoint = {
            booking: '/booking',
            auth: '/auth',
            ping: '/ping',
        };
        this.authorizationBasic = 'Basic YWRtaW46cGFzc3dvcmQxMjM=';
    }

    async computeResponseTime(startTime, endTime) {
        return await endTime - startTime;
    }

    async createMultipleBookings() {
        bookingData.multipleBookingCreationData.forEach(async (booking) => {
            await this.createBooking(booking);
        });
    }

    /**
     *
     * @param {string} verb Http verb of the request
     * @param {string} endpoint
     * @param {data} object
     * @returns {object} contains the response of the request and the computed response time
     */
    async createRequest({verb, endpoint, data, incompleteHeaders, auth}) {
        let doRequest = {
            get: this.getRequest(endpoint),
            post: this.postRequest(endpoint, data, incompleteHeaders),
            put: this.putRequest({endpoint: endpoint, data: data, auth: auth}),
            auth: this.authRequest(),
            delete: this.deleteBooking({endpoint: endpoint, auth: auth})
        }
        const startTime = performance.now();
        let response = await doRequest[verb];
        const endTime = performance.now();
        return {
            body: response.body,
            error: response.error,
            headers: response.headers,
            responseTime: await this.computeResponseTime(startTime, endTime),
            statusCode: response.statusCode,
            bookingId: response.body.bookingid || false,
            length: response.body.length,
        }
    }

    async authRequest(endpoint = this.endpoint.auth) {
        return await request(this.url)
        .post(endpoint)
        .set('Content-type', 'application/json')
        .send(bookingData.authData);
    }

    async getRequest(endpoint) {
        return await request(this.url)
        .get(endpoint)
        .set('Accept', 'application/json');
    }

    async postRequest(endpoint = this.endpoint.booking, data, incompleteHeaders = false) {
        if (incompleteHeaders) {
            return await request(this.url)
            .post(endpoint)
            .send(data);
        }
        return await request(this.url)
        .post(endpoint)
        .set('Content-type', 'application/json')
        .set('Accept', 'application/json')
        .send(data);
    }

    async putRequest({endpoint = this.endpoint.booking, data, auth}) {
        if (auth === 'basic') {
            return await request(this.url)
            .put(endpoint)
            .set('Accept', 'application/json')
            .set('Content-type', 'application/json')
            .auth(bookingData.authData['username'], bookingData.authData['password'])
            .send(data);
        }
        return await request(this.url)
        .put(endpoint)
        .set('Accept', 'application/json')
        .set('Content-type', 'application/json')
        .set('Authorization', this.authorizationBasic)
        .send(data);
    }

    async deleteRequest({endpoint, auth}) {
        if (auth === 'basic') {
            return await request(this.url)
            .delete(endpoint)
            .auth(bookingData.authData['username'], bookingData.authData['password']);
        }
        return await request(this.url)
        .delete(endpoint)
        .set('Authorization', this.authorizationBasic);
    }

    async getBookings({bookingId, endpoint = this.endpoint.booking}) {
        endpoint += bookingId ? `/${bookingId}` : '';
        return await this.createRequest(
            {
                verb: 'get',
                endpoint: endpoint
            }
        );
    }

    async createBooking(data = bookingData.createBooking.correct) {
        return await this.createRequest(
            {verb: 'post', data: data}
        );
    }

    async updateBooking({bookingId, auth, data = bookingData.updateBooking}) {
        return await this.createRequest(
            {
                verb: 'put',
                endpoint: `${this.endpoint.booking}/${bookingId}`,
                auth: auth,
                data: data,
            }
        );
    }

    async deleteBooking({bookingId, auth}) {
        return await this.deleteRequest(
            {
                verb: 'delete',
                endpoint: `${this.endpoint.booking}/${bookingId}`,
                auth: auth,
            }
        );
    }

}

export default new BookerService();
