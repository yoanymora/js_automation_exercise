import ProductDetailsPage from "../pageobjects/product.details.page";
import CartPage from "../pageobjects/cart.page";
import HomePage from "../pageobjects/home.page";
import { expect } from 'chai';

describe('Cart', () => {
    it('User adds a product to the cart', async () => {
        await HomePage.open('');
        await HomePage.productCards[0].click();
        await ProductDetailsPage.addToCartButton.click();
        await ProductDetailsPage.confirmationMessageContainer.waitForDisplayed();
        expect(await ProductDetailsPage.confirmationMessageContainer.getText()).to.equal('Product added to shopping cart.');
        await ProductDetailsPage.cartQuantity.waitForDisplayed();
        expect(await ProductDetailsPage.cartQuantity.getText()).to.equal('1');
    });

    it('User goes to the cart page', async() => {
        expect(await ProductDetailsPage.cartQuantity.getText()).to.equal('1');
        await CartPage.open('checkout');
        expect(await CartPage.productsTable).to.exist;
        expect(await CartPage.productQuantity).to.exist;
        let productQuantity = await CartPage.productQuantity.getValue();
        expect(await productQuantity).to.equal('1');
        expect(await CartPage.productPrice).to.exist;
        expect(await CartPage.linePrice).to.exist;
        expect(await CartPage.checkoutButton).to.exist;
        expect(await CartPage.deleteProductButton).to.exist;
    });

    it("User increases the quantity of products in its cart", async () => {
        expect(await ProductDetailsPage.cartQuantity.getText()).to.equal('1');
        await CartPage.open('checkout');
        await CartPage.productQuantity.waitForDisplayed({ timeout: 5000 });
        await CartPage.productQuantity.setValue('2');
        await browser.keys('Enter');
        await browser.pause(2000);
        await CartPage.successMessageContainer.waitForExist({timeout: 1000});
        expect(await CartPage.successMessageContainer).to.be.ok;
        expect(await CartPage.successMessage.getText()).to.equal("Product quantity updated.");
        await browser.pause(2000);
        expect(await CartPage.linePrice.getText()).to.equal("$28.30");
        expect(await CartPage.cartTotal.getText()).to.equal("$28.30");
    });
});
