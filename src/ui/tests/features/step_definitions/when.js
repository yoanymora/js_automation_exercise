import { When } from "@cucumber/cucumber";
import HomeService from "../../../po/services/home.service.js";
import LoginService from "../../../po/services/login.service.js";
import ProductDetailsPage from "../../../po/pages/product.details.page.js";
import Common from "../../../po/services/common.js";
import CartPage from "../../../po/pages/cart.page.js";
import CartService from "../../../po/services/cart.service.js";
import RegisterService from "../../../po/services/register.service.js";

When("{string} sorts the products by price from {string}", async function (userName, sortBy) {
	if (sortBy === "highest to lowest") {
		await HomeService.sortBy("priceHighestToLowest");
	} else {
		await HomeService.sortBy("priceLowestToHighest");
	}
});

When("{string} filters products by brand {string}", async function (userName, brandName) {
	await HomeService.filterProductsByBrandForgeFlexTools();
});

When("{string} changes the price range from 1 to 39", async function (userName) {
	await HomeService.setMaxPriceRangeSelectorTo39();
});

When("{string} switches the language to {string}", async function (userName, language) {
	await HomeService.changeLanguageTo(language);
});

When(
	"{string} tried to log in {int} times with incorrect credentials",
	async function (userName, logInAttempts) {
		await LoginService.login("test@test.com", "test");
		await LoginService.loginSubmitMultipleTimes(logInAttempts);
	}
);

When("{string} clicks the button to add the product to the cart", async (userName) => {
	await ProductDetailsPage.addToCartButton.click();
});

When(
	"{string} changes the product quantity from {string} to {string}",
	async (userName, quantity, newQuantity) => {
		await Common.waitForExisting(CartPage.productQuantity);
		await CartService.setProductQuantity("2");
	}
);

When(
	"{string} add the following email: {string} and password: {string}",
	async (unerName, email, password) => {
		await RegisterService.fillEmailAndPassword(email, password);
	}
);

When("submit the register form", async () => {
	await RegisterService.submitRegisterForm();
});
