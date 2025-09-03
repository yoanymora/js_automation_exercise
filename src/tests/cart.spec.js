import ProductDetailsPage from "../po/pages/product.details.page";
import CartPage from "../po/pages/cart.page";
import HomePage from "../po/pages/home.page";

describe('Cart', () => {
    it('User adds a product to the cart', async () => {
        await HomePage.open('');
        await HomePage.productCards[0].click();
        await ProductDetailsPage.addToCartButton.click();
        await expect(ProductDetailsPage.confirmationMessageContainer).toBeDisplayed();
        await expect(ProductDetailsPage.cartQuantity).toHaveText('1');
    });

    it('User goes to the cart page', async() => {
        await expect(ProductDetailsPage.cartQuantity).toHaveText('1');
        await CartPage.open('checkout');
        await expect(CartPage.productsTable).toExist();
        await expect(CartPage.productQuantity).toExist();
        let productQuantity = await CartPage.productQuantity.getValue();
        await expect(productQuantity).toEqual('1');
        await expect(CartPage.productPrice).toExist();
        await expect(CartPage.linePrice).toExist();
        await expect(CartPage.checkoutButton).toExist();
        await expect(CartPage.deleteProductButton).toExist();
    });

    it("User increases the quantity of products in its cart", async () => {
        await expect(ProductDetailsPage.cartQuantity).toHaveText('1');
        await CartPage.open('checkout');
        await CartPage.productQuantity.setValue('2');
        await browser.keys('Enter');
        await CartPage.successMessageContainer.waitForExist();
        await expect(CartPage.successMessageContainer).toBeDisplayed();
        await expect(CartPage.successMessage).toHaveText("Product quantity updated.");
        await expect(CartPage.linePrice).toHaveText("$28.30");
        await expect(CartPage.cartTotal).toHaveText("$28.30");
    });
});
