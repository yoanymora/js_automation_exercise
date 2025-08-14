import LoginPage from "../pageobjects/login.page";

describe("Login Page", () => {
    beforeEach( async () => {
        await LoginPage.open('auth/login');
    });

    it("User's account is blocked after 3 failed attempts to log in", async () => {
        await LoginPage.login('test@test.com', 'test');
        await LoginPage.submit.click();
        await LoginPage.submit.click();
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText('Account blocked');
    });
});
