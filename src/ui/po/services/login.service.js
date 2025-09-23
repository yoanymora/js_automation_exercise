import LoginPage from '../pages/login.page';

class LoginService {

    async login (email, password) {
        await LoginPage.inputEmail.setValue(email);
        await LoginPage.inputPassword.setValue(password);
        await LoginPage.submit.click();
    }

    async loginSubmitMultipleTimes(submitTimes) {
        let iteration = 0;
        while(iteration < submitTimes) {
            await LoginPage.submit.click();
            iteration++;
        }
    }

}

export default new LoginService();
