import { $ } from "@wdio/globals";
import Page from "./page";

class RegisterPage extends Page {
	constructor() {
		super("auth/register");
	}

	get form() {
		return $("div.auth-form");
	}

	get name() {
		return $("#first_name");
	}

	get lastName() {
		return $("#last_name");
	}

	get birthDay() {
		return $("#dob");
	}

	get street() {
		return $("#street");
	}

	get postalCode() {
		return $("#postal_code");
	}

	get city() {
		return $("#city");
	}

	get state() {
		return $("#state");
	}

	get country() {
		return $("#country");
	}

	get countryAlbania() {
		return $('option[value="AL"]');
	}

	get phone() {
		return $("#phone");
	}

	get email() {
		return $("#email");
	}

	get password() {
		return $("#password");
	}

	get registerButton() {
		return $('button[data-test="register-submit"]');
	}

	get passwordError() {
		return $('[data-test="password-error"]');
	}
}

export default new RegisterPage();
