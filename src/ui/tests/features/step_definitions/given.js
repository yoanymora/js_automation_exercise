import { Given } from "@cucumber/cucumber";
import HomePage from "../../../po/pages/home.page.js";
import LoginPage from "../../../po/pages/login.page.js";
import RegisterService from "../../../po/services/register.service.js";
import ProductDetailsPage from "../../../po/pages/product.details.page.js";
import Common from "../../../po/services/common";
import CartPage from "../../../po/pages/cart.page.js";

Given("{string} opens the {string} page", async function (userName, page) {
	if (page === "home") {
		await HomePage.open();
	}
	if (page === "login") {
		await LoginPage.open();
	}
	if (page === "product details") {
		await HomePage.open();
		await Common.waitForExisting(await HomePage.productsGrid);
		await Common.waitForExisting(await HomePage.productCards[0]);
		await Common.waitForClickable(await HomePage.productCards[0]);
		await HomePage.productCards[0].click();
	}
	if (page === "cart") {
		await CartPage.open();
	}
});

Given("the first product listed in the products matrix is {string}", async function (productName) {
	await expect(await HomePage.productCardTitles[0].getText()).toEqual(productName);
});

Given("the product {string} is listed in the products matrix", async function (productName) {
	if (productName === "Bolt Cutters") {
		await expect(await HomePage.boltCuttersTool).toBeExisting();
	}
});

Given("the website language is {string}", async function (language) {
	if (language === "spanish") {
		await expect(await HomePage.header.languageSelector).toHaveText("ES");
	}
	if (language === "english") {
		await expect(await HomePage.header.languageSelector).toHaveText("EN");
	}
});

Given("{string} is registered in the webpage", async function (userName) {
	await RegisterService.createUser();
});

Given("the button to add a product to the cart is visible", async () => {
	await Common.waitForClickable(await ProductDetailsPage.addToCartButton);
});
