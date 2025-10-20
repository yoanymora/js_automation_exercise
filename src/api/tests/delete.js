import BookerService from "../services/booker.service.js";
import Validate from "../utils/validations.js";

describe("Delete booking", () => {
	it("Delete booking with Basic Auth", async () => {
		const createBookingResponse = await BookerService.createBooking();
		const deleteBookingResponse = await BookerService.deleteBooking({
			bookingId: createBookingResponse.bookingId,
			auth: "basic",
		});
		Validate.statusCode("created", deleteBookingResponse.statusCode);
	});

	it("Delete booking with Authorization header", async () => {
		const createBookingResponse = await BookerService.createBooking();
		const deleteBookingResponse = await BookerService.deleteBooking({
			bookingId: createBookingResponse.bookingId,
			auth: "authorization_header",
		});
		Validate.statusCode("created", deleteBookingResponse.statusCode);
		const getDeletedBookingResponse = await BookerService.getBookings({
			bookingId: createBookingResponse.bookingId,
		});
		Validate.statusCode("not-found", getDeletedBookingResponse.statusCode);
	});
});
