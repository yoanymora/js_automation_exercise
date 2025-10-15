import { Then } from "@cucumber/cucumber";
import HomePage from "../../../po/pages/home.page.js";
import HomeService from "../../../po/services/home.service.js";
import LoginPage from "../../../po/pages/login.page.js";
import ProductDetailsPage from "../../../po/pages/product.details.page.js";
import Common from "../../../po/services/common.js";
import CartPage from "../../../po/pages/cart.page.js";
import CartService from "../../../po/services/cart.service.js";

Then("the products matrix is updated after {string}", async function (sortAction) {
	if (sortAction === "sort") {
		await HomeService.waitUntilFilterSortingCompleted("sorting");
	} else {
		await HomeService.waitUntilFilterSortingCompleted("filter");
	}
});

Then(
	"the first product of the products matrix after {string} is {string}",
	async function (sortAction, productName) {
		await expect(await HomePage.productCardTitles[0].getText()).toEqual(productName);
	}
);
Then(
	"{string} see that the price range selector was updated to {string}",
	async function (userName, maxPriceRange) {
		await expect(await HomePage.filter.priceRangeMaxValue).toHaveText(maxPriceRange);
	}
);

Then("the product {string} is not listed in the products matrix", async function (productName) {
	await expect(await HomePage.boltCuttersTool).not.toBeExisting();
});
Then("the language selector displays the label {string}", async function (language) {
	if (language === "spanish") {
		await expect(await HomePage.header.languageSelector).toHaveText("ES");
	}
	if (language === "french") {
		await expect(await HomePage.header.languageSelector).toHaveText("FR");
	}
});

Then(
	"the currency symbols of product prices change from {string} to {string}",
	async function (currency, newCurrency) {
		await expect(await HomePage.productCardPrices[0]).not.toHaveText(
			expect.stringContaining(newCurrency)
		);
	}
);

Then("a message indicating that the account is blocked is displayed", async function () {
	await expect(LoginPage.errorMessage).toBeDisplayed();
	await expect(LoginPage.errorMessage).toHaveText(LoginPage.blockedAccountMessage);
});

Then("a confirmation message is displayed for {string}", async (confirmationAction) => {
	if (confirmationAction === "product added to cart") {
		await Common.waitForExisting(await ProductDetailsPage.confirmationMessageContainer);
		await Common.waitForExisting(await ProductDetailsPage.header.cartQuantity);
		await expect(ProductDetailsPage.confirmationMessageContainer).toBeDisplayed();
	}
	if (confirmationAction === "product quantity changed") {
		await Common.waitForExisting(CartPage.successMessageContainer);
		await expect(CartPage.successMessageContainer).toBeDisplayed();
		await expect(CartPage.successMessage).toHaveText(CartPage.productQuantityUpdatedMessage);
	}
});

Then("the cart quantity is {string}", async (cartQuantity) => {
	await expect(ProductDetailsPage.header.cartQuantity).toHaveText("1");
});

Then("{string} sees a table with the product details", async (userName) => {
	await Common.waitForExisting(CartPage.productsTable);
	await expect(CartPage.productsTable).toExist();
	await expect(CartPage.productQuantity).toExist();
	await expect(await CartService.getProductQuantity()).toEqual("1");
	await expect(CartPage.productPrice).toExist();
	await expect(CartPage.linePrice).toExist();
	await expect(CartPage.checkoutButton).toExist();
	await expect(CartPage.deleteProductButton).toExist();
});

Then(
	"the total amount of the {string} is updated to {string}",
	async (elementChanged, newTotal) => {
		if (elementChanged === "product line") {
			await expect(CartPage.linePrice).toHaveText(newTotal);
		}
		if (elementChanged === "cart total") {
			await expect(CartPage.cartTotal).toHaveText(newTotal);
		}
	}
);
