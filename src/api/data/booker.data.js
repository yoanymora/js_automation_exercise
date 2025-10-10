import Joi from "joi";

export const bookingData = {
	authData: {
		username: "admin",
		password: "password123",
	},
	createBooking: {
		correct: {
			firstname: "Test",
			lastname: "Test",
			totalprice: 111,
			depositpaid: true,
			bookingdates: {
				checkin: "2025-01-01",
				checkout: "2026-01-01",
			},
			additionalneeds: "Breakfast",
		},
		incomplete: {
			lastname: "Test",
			totalprice: 111,
			depositpaid: true,
			bookingdates: {
				checkin: "2025-01-01",
				checkout: "2026-01-01",
			},
			additionalneeds: "Breakfast",
		},
		incorrect: {
			firstname: 666,
			lastname: "Test",
			totalprice: 111,
			depositpaid: true,
			bookingdates: {
				checkin: "2025-01-01",
				checkout: "2026-01-01",
			},
			additionalneeds: "Breakfast",
		},
	},
	headers: {
		contentType: "application/json; charset=utf-8",
	},
	multipleBookingCreationData: [
		{
			firstname: "Mercurio",
			lastname: "Azul",
			totalprice: 666,
			depositpaid: true,
			bookingdates: {
				checkin: "2025-01-01",
				checkout: "2026-01-01",
			},
			additionalneeds: "Breakfast",
		},
		{
			firstname: "Tierra",
			lastname: "Azul",
			totalprice: 111,
			depositpaid: true,
			bookingdates: {
				checkin: "2025-01-01",
				checkout: "2026-01-01",
			},
			additionalneeds: "Water",
		},
		{
			firstname: "Saturno",
			lastname: "Azul",
			totalprice: 111,
			depositpaid: true,
			bookingdates: {
				checkin: "2025-01-01",
				checkout: "2026-01-01",
			},
			additionalneeds: "More Water",
		},
	],
	responseSchema: {
		createBookingKeys: ["bookingid", "booking"],
		createBooking: Joi.object({
			bookingid: Joi.number().required(),
			booking: Joi.object({
				firstname: Joi.string().required(),
				lastname: Joi.string().required(),
				totalprice: Joi.number().required(),
				depositpaid: Joi.boolean().required(),
				bookingdates: Joi.object({
					checkin: Joi.date().required(),
					checkout: Joi.date().required(),
				}).required(),
				additionalneeds: Joi.string(),
			}).required(),
		}),
		updateBooking: Joi.object({
			firstname: Joi.string().required(),
			lastname: Joi.string().required(),
			totalprice: Joi.number().required(),
			depositpaid: Joi.boolean().required(),
			bookingdates: Joi.object({
				checkin: Joi.date().required(),
				checkout: Joi.date().required(),
			}).required(),
			additionalneeds: Joi.string(),
		}),
	},
	updateBooking: {
		firstname: "Test Test",
		lastname: "Test",
		totalprice: 111,
		depositpaid: true,
		bookingdates: {
			checkin: "2025-01-01",
			checkout: "2026-01-01",
		},
		additionalneeds: "Breakfast",
	},
};

export const filterData = {
	firstname: "Tierra",
	incorrectLastname: "Media",
	checkin: "2025-01-01",
	lastname: "Azul",
};

export const expectedResponseTime = 900; // in milliseconds
