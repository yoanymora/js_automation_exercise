import bookerService from "../services/booker.service.js";
import Validate from "../utils/validations.js";

describe("Delete booking", () => {
	it("Delete booking with Basic Auth", async () => {
		const createBookingResponse = await bookerService.createBooking();
		const deleteBookingResponse = await bookerService.deleteBooking({
			bookingId: createBookingResponse.bookingId,
			auth: "basic",
		});
		Validate.statusCode("created", deleteBookingResponse.statusCode);
	});

	it("Delete booking with Authorization header", async () => {
		const createBookingResponse = await bookerService.createBooking();
		const deleteBookingResponse = await bookerService.deleteBooking({
			bookingId: createBookingResponse.bookingId,
			auth: "authorization_header",
		});
		Validate.statusCode("created", deleteBookingResponse.statusCode);
		const getDeletedBookingResponse = await bookerService.getBookings({
			bookingId: createBookingResponse.bookingId,
		});
		Validate.statusCode("not-found", getDeletedBookingResponse.statusCode);
	});
});
