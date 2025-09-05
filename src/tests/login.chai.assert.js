import LoginPage from "../po/pages/login.page";
import RegisterPage from "../po/pages/register.page";
import { assert } from 'chai';

describe("Login Page", () => {
    it("User's account is blocked after 3 failed attempts to log in", async () => {
        await RegisterPage.createUser();
        await LoginPage.open();
        await LoginPage.login('test@test.com', 'test');
        await LoginPage.submit.click();
        await LoginPage.submit.click();
        await LoginPage.submit.click();
        assert.exists(await LoginPage.errorMessage);
        assert.equal(await LoginPage.errorMessage.getText(), 'Account locked, too many failed attempts. Please contact the administrator.');
    });
});
