import BookerService from "../services/booker.service.js";
import Validate from "../utils/validations.js";
import { filterData } from "../data/booker.data.js";

describe("Get bookings", () => {
	it("Get all booking ids", async () => {
		const getBookingsResponse = await BookerService.getBookings({});
		Validate.responseTime(getBookingsResponse.responseTime);
		Validate.statusCode("ok", getBookingsResponse.statusCode);
	});

	it("Bad request to get all booking ids", async () => {
		const getBookingsResponse = await BookerService.getBookings({ endpoint: "/boking" });
		Validate.statusCode("not-found", getBookingsResponse.statusCode);
	});

	it("Get booking ids with filters", async () => {
		await BookerService.createMultipleBookings();
		const responseFilterByFirstname = await BookerService.getBookings({
			endpoint: `${BookerService.endpoint.booking}?firstname=${filterData.firstname}`,
		});
		Validate.recordsLength(responseFilterByFirstname.length, 1);
		const responseFilterByFirstAndLastname = await BookerService.getBookings({
			endpoint: `${BookerService.endpoint.booking}?firstname=${filterData.firstname}&lastname=${filterData.incorrectLastname}`,
		});
		Validate.recordsLength(responseFilterByFirstAndLastname.length, 0);
		const responseFilterByCheckinAndLastname = await BookerService.getBookings({
			endpoint: `${BookerService.endpoint.booking}?checkin=${filterData.checkin}&lastname=${filterData.lastname}`,
		});
		Validate.recordsLength(responseFilterByCheckinAndLastname.length, 0);
	});
});
