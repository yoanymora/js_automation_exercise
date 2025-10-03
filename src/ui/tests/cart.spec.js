import ProductDetailsPage from "../po/pages/product.details.page";
import CartPage from "../po/pages/cart.page";
import CartService from "../po/services/cart.service";
import HomePage from "../po/pages/home.page";
import { expect as chaiExpect } from 'chai';
import Common from "../po/services/common";

describe('Cart', () => {
    it('User adds a product to the cart with spect', async () => {
        await HomePage.open();
        await HomePage.productCards[0].click();
        await ProductDetailsPage.addToCartButton.click();
        await expect(ProductDetailsPage.confirmationMessageContainer).toBeDisplayed();
        await expect(ProductDetailsPage.header.cartQuantity).toHaveText('1');
    });

    it('User goes to the cart page with spect', async() => {
        await expect(ProductDetailsPage.header.cartQuantity).toHaveText('1');
        await CartPage.open();
        await expect(CartPage.productsTable).toExist();
        await expect(CartPage.productQuantity).toExist();
        await expect(await CartService.getProductQuantity()).toEqual('1');
        await expect(CartPage.productPrice).toExist();
        await expect(CartPage.linePrice).toExist();
        await expect(CartPage.checkoutButton).toExist();
        await expect(CartPage.deleteProductButton).toExist();
    });

    it('User increases the quantity of products in its cart with spect', async () => {
        await expect(ProductDetailsPage.header.cartQuantity).toHaveText('1');
        await CartPage.open();
        await CartService.setProductQuantity('2');
        await CartPage.successMessageContainer.waitForExist();
        await expect(CartPage.successMessageContainer).toBeDisplayed();
        await expect(CartPage.successMessage).toHaveText(CartPage.productQuantityUpdatedMessage);
        await expect(CartPage.linePrice).toHaveText(CartPage.productPriceValue);
        await expect(CartPage.cartTotal).toHaveText(CartPage.productPriceValue);
    });

    it('User adds a product to the cart with chai', async () => {
        await HomePage.open();
        await HomePage.waitForClickable(await HomePage.productCards[0], 5000);
        await HomePage.productCards[0].click();
        await HomePage.waitForClickable(await ProductDetailsPage.addToCartButton, 5000);
        await ProductDetailsPage.addToCartButton.click();
        await HomePage.waitForVisible(await ProductDetailsPage.confirmationMessageContainer, 5000);
        await HomePage.waitUntilUpdateText(await ProductDetailsPage.confirmationMessageContainer, CartPage.productAddedToCartMessage);
        chaiExpect(await Common.getSelectorText(await ProductDetailsPage.confirmationMessageContainer)).to.equal(CartPage.productAddedToCartMessage);
        await HomePage.waitForVisible(await ProductDetailsPage.header.cartQuantity, 5000);
        chaiExpect(await Common.getSelectorText(await ProductDetailsPage.header.cartQuantity)).to.equal('3');
    });

    it('User goes to the cart page with chai', async() => {
        chaiExpect(await Common.getSelectorText(await ProductDetailsPage.header.cartQuantity)).to.equal('3');
        await CartPage.open();
        chaiExpect(await CartPage.productsTable).to.exist;
        chaiExpect(await CartPage.productQuantity).to.exist;
        chaiExpect(await CartService.getProductQuantity()).to.equal('3');
        chaiExpect(await CartPage.productPrice).to.exist;
        chaiExpect(await CartPage.linePrice).to.exist;
        chaiExpect(await CartPage.checkoutButton).to.exist;
        chaiExpect(await CartPage.deleteProductButton).to.exist;
    });

    it('User increases the quantity of products in its cart with chai', async () => {
        chaiExpect(await Common.getSelectorText(await ProductDetailsPage.header.cartQuantity)).to.equal('3');
        await CartPage.open();
        await HomePage.waitForVisible(await CartPage.productQuantity, 5000);
        await CartService.setProductQuantity('2');
        await HomePage.waitUntilUpdateText(await CartPage.linePrice, '$28.30');
        await CartPage.successMessageContainer.waitForExist({timeout: 1000});
        chaiExpect(await CartPage.successMessageContainer).to.be.ok;
        chaiExpect(await Common.getSelectorText(await CartPage.successMessage)).to.equal(CartPage.productQuantityUpdatedMessage);
        chaiExpect(await Common.getSelectorText(await CartPage.linePrice)).to.equal(CartPage.productPriceValue);
        chaiExpect(await Common.getSelectorText(await CartPage.cartTotal)).to.equal(CartPage.productPriceValue);
    });

});
