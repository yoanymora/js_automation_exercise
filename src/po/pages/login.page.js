import { $ } from '@wdio/globals'
import Page from './page';

class LoginPage extends Page {

    constructor() {
        super('auth/login');
    }

    get inputEmail () {
        return $('#email');
    }

    get inputPassword () {
        return $('#password');
    }

    get submit () {
        return $('input[data-test="login-submit"]');
    }

    get errorMessage () {
        return $('div[data-test="login-error"]');
    }

    async login (email, password) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.submit.click();
    }
}

export default new LoginPage();
