import { $ } from "@wdio/globals";
import Page from "./page";

class LoginPage extends Page {
	constructor() {
		super("auth/login");
	}

	get form() {
		return $("div.auth-form");
	}

	get inputEmail() {
		return $("#email");
	}

	get inputPassword() {
		return $("#password");
	}

	get submit() {
		return $('input[data-test="login-submit"]');
	}

	get errorMessage() {
		return $('div[data-test="login-error"]');
	}

	get blockedAccountMessage() {
		return "Account locked, too many failed attempts. Please contact the administrator.";
	}
}

export default new LoginPage();
