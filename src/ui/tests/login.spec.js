import LoginPage from "../po/pages/login.page";
import LoginService from "../po/services/login.service";
import RegisterService from "../po/services/register.service";
import Common from "../po/services/common";
import { assert } from "chai";

describe("Login Page", () => {
	it("User's account is blocked after 3 failed attempts to log in with spec", async () => {
		await RegisterService.createUser();
		await LoginPage.open();
		await LoginService.login("test@test.com", "test");
		await LoginService.loginSubmitMultipleTimes(3);
		await expect(LoginPage.errorMessage).toBeDisplayed();
		await expect(LoginPage.errorMessage).toHaveText(LoginPage.blockedAccountMessage);
	});

	it("User's account is blocked after 3 failed attempts to log in with chai - assert", async () => {
		await RegisterService.createUser();
		await LoginPage.open();
		await LoginService.login("test@test.com", "test");
		await LoginService.loginSubmitMultipleTimes(3);
		assert.exists(await LoginPage.errorMessage);
		assert.equal(
			await Common.getSelectorText(await LoginPage.errorMessage),
			LoginPage.blockedAccountMessage
		);
	});
});
