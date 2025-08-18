import ProductDetailsPage from "../pageobjects/product.details.page";
import CartPage from "../pageobjects/cart.page";
import HomePage from "../pageobjects/home.page";

describe('Cart', () => {
    it('User adds a product to the cart', async () => {
        await HomePage.open('');
        await HomePage.productCard.click();
        await ProductDetailsPage.addToCartButton.click();
        await expect(ProductDetailsPage.confirmationMessageContainer).toBeDisplayed();
        await expect(ProductDetailsPage.cartQuantity).toHaveText('1');
    });

    it('User goes to the cart page', async() => {
        // await HomePage.open('');
        // await HomePage.productCard.click();
        // await ProductDetailsPage.addToCartButton.click();
        // await expect(ProductDetailsPage.cartQuantity).toHaveText('1');
        await CartPage.open('checkout');
        await expect(CartPage.productsTable).toExist();
        await expect(CartPage.productQuantity).toExist();
        let productQuantity = await CartPage.productQuantity.getValue();
        await expect(productQuantity).toEqual('1');
        //ASK andrea If i should modify the scenario to add the products name and price and also
        // check that here
        await expect(CartPage.productPrice).toExist();
        await expect(CartPage.linePrice).toExist();
        await expect(CartPage.checkoutButton).toExist();
        await expect(CartPage.deleteProductButton).toExist();
    });

    it("User increases the quantity of products in its cart", async () => {
        await expect(ProductDetailsPage.cartQuantity).toHaveText('1');
        await CartPage.open('checkout');
        // Ask Andrea If is it OK to do this or should I use specific values?
        // Also this is going to have an error always because the price
        // copied have the currency symbol, thus the convertions and multiplication of the
        // element text is useless
        let linePrice = parseInt(await CartPage.linePrice.getText());
        let cartTotal = parseInt(await CartPage.cartTotal.getText());
        await CartPage.productQuantity.setValue('2');
        await browser.keys('Enter');
        await CartPage.successMessageContainer.waitForExist();
        await expect(CartPage.successMessageContainer).toBeDisplayed();
        await expect(CartPage.successMessage).toHaveText("Product quantity updated.");
        // Ask Andrea If is it OK to do this or should I use specific values?
        // await expect(CartPage.linePrice).toHaveText(linePrice * 2);
        // await expect(CartPage.cartTotal).toHaveText(cartTotal * 2);
    });
});