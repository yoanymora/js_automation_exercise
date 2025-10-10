import RegisterPage from "../pages/register.page";
import Common from "./common";

class RegisterService {
	async createUser() {
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
		await RegisterPage.email.setValue("test@test.com");
		await RegisterPage.password.setValue("Testtest01.");
		await RegisterPage.registerButton.click();
	}
}

export default new RegisterService();
