import RegisterPage from "../pages/register.page";
import Common from "./common";

class RegisterService {
	async fillRegisterForm({ fillEmailAndPassword = true }) {
		await RegisterPage.open();
		await Common.waitForExisting(await RegisterPage.form);
		await RegisterPage.name.setValue("test");
		await RegisterPage.lastName.setValue("test");
		await RegisterPage.birthDay.setValue("2000-01-01");
		await RegisterPage.street.setValue("test");
		await RegisterPage.postalCode.setValue("29301");
		await RegisterPage.city.setValue("test");
		await RegisterPage.state.setValue("test");
		await RegisterPage.country.selectByAttribute("value", "AL");
		await RegisterPage.phone.setValue("3332221111");
		if (fillEmailAndPassword) {
			await this.fillEmailAndPassword("test@test.com", "Testtest01.");
		}
	}

	async submitRegisterForm() {
		await RegisterPage.registerButton.click();
	}

	async fillEmailAndPassword(email, password) {
		await RegisterPage.email.setValue(email);
		await RegisterPage.password.setValue(password);
	}
}

export default new RegisterService();
