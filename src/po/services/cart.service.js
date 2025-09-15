import CartPage from "../pages/cart.page";

class CartService {
    async getProductQuantity() {
        return await CartPage.productQuantity.getValue();
    }

    async setProductQuantity(quantity) {
        await CartPage.productQuantity.setValue(quantity);
        await browser.keys('Enter');
    }

}

export default new CartService();
