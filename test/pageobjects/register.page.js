import { $ } from '@wdio/globals';
import Page from './page';

class RegisterPage extends Page {
    get name () {
        return $('#first_name');
    }

    get lastName () {
        return $('#last_name');
    }

    get birthDay () {
        return $('#dob');
    }

    get street () {
        return $('#street');
    }

    get postalCode () {
        return $('#postal_code');
    }

    get city () {
        return $('#city');
    }

    get state () {
        return $('#state');
    }

    get country () {
        return $('#country');
    }

    get countryAlbania () {
        return $('option[value="AL"]');
    }

    get phone () {
        return $('#phone');
    }

    get email () {
        return $('#email');
    }

    get password () {
        return $('#password');
    }

    get registerButton () {
        return $('button[data-test="register-submit"]');
    }

    async createUser () {
        await this.open("auth/register");
        await this.name.setValue("test");
        await this.lastName.setValue("test");
        await this.birthDay.setValue("2000-01-01");
        await this.street.setValue("test");
        await this.postalCode.setValue("29301");
        await this.city.setValue("test");
        await this.state.setValue("test");
        await this.country.selectByAttribute('value', 'AL');
        await this.phone.setValue("3332221111");
        await this.email.setValue("test@test.com");
        await this.password.setValue("Testtest01.");
        await this.registerButton.click();
    }
}

export default new RegisterPage();
