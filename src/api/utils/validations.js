import { expectedResponseTime } from '../data/booker.data.js';
import { should } from 'chai';
import { bookingData } from '../data/booker.data.js';
import Joi from 'joi';

should();

class Validate {

    responseTime(current, expected = expectedResponseTime) {
        (current).should.be.below(expected);
    }

    statusCode(type, current) {
        const httpCodeType = {
            'OK': 200,
            'NOT-FOUND': 404,
            'INTERNAL-SERVER-ERROR': 500,
            'TEAPOT': 418,
            'CREATED': 201
        }
        current.should.equal(httpCodeType[type.toUpperCase()]);
    }

    recordsLength(current, expected) {
        (current).should.be.at.least(expected);
    }

    /**
     *
     * @param {string} level can be `key` or `schema`
     * @param {string} request indicates the request made to get the http response
     * @param {object} value the response body to validate
     * @param {boolean} assertion indicates if the validation must be positive or negative
     */
    responseBody({level, request, value, assertion = true}) {
        const validationValues = {
            'KEY': {
                'CREATE': bookingData.responseSchema.createBookingKeys,
            },
            'SCHEMA': {
                'CREATE': bookingData.responseSchema.createBooking,
                'UPDATE': bookingData.responseSchema.updateBooking
            }
        }
        if (level === 'key') {
            return this.bodyKeys(value, validationValues[level.toUpperCase()][request.toUpperCase()], assertion);
        }
        return this.bodySchema(value, validationValues[level.toUpperCase()][request.toUpperCase()], assertion);
    }

    bodyKeys(current, expected, assertion) {
        if (assertion) {
            return (current).should.to.have.all.keys(expected);
        }
        return (current).should.not.to.have.all.keys(expected);
    }

    bodySchema(current, expected, assertion) {
        if (assertion) {
            return Joi.assert(current, expected);
        }
        return Joi.isError(expected.validate(current));
    }

    responseHeaders(current, expected = bookingData.headers.contentType) {
        (current).should.equal(expected);
    }

    recordFirstname({current, expected = bookingData.createBooking.correct.firstname, assertion = true}) {
        if (assertion) {
            return (current).should.be.equal(expected);
        }
        return (current).should.not.to.equal(expected);
    }

}

export default new Validate();
