import { $ } from '@wdio/globals'
import Page from './page';

class LoginPage extends Page {
    get inputEmail () {
        return $('#email');
    }

    get inputPassword () {
        return $('#password');
    }

    get submit () {
        return $('input[type="submit"]');
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
