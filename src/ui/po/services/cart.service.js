import CartPage from "../pages/cart.page";
import { Key } from "webdriverio";

class CartService {
	async getProductQuantity() {
		return await CartPage.productQuantity.getValue();
	}

	async setProductQuantity(quantity) {
		await CartPage.productQuantity.click();
		await CartPage.productQuantity.setValue(quantity);
		await browser.keys([Key.ArrowLeft]);
		await browser.keys("Backspace");
		await browser.keys([Key.Enter]);
	}
}

export default new CartService();
