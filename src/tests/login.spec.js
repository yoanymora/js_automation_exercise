import LoginPage from "../po/pages/login.page";
import RegisterPage from "../po/pages/register.page";

describe("Login Page", () => {
    it("User's account is blocked after 3 failed attempts to log in", async () => {
        await RegisterPage.createUser();
        await LoginPage.open('auth/login');
        await LoginPage.login('test@test.com', 'test');
        await LoginPage.submit.click();
        await LoginPage.submit.click();
        await LoginPage.submit.click();
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText('Account locked, too many failed attempts. Please contact the administrator.');
    });
});
