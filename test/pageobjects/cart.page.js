import Page from "./page";
import { $ } from '@wdio/globals';

class CartPage extends Page {

    get productsTable() {
        return $('table');
    }

    get checkoutButton () {
        return $('button[data-test="proceed-1"]');
    }

    get productName() {
        return $('span[data-test="product-title"]');
    }

    get productQuantity() {
        return $('input[data-test="product-quantity"]');
    }

    get productPrice() {
        return $('span[data-test="product-price"]');
    }

    get linePrice() {
        return $('span[data-test="line-price"]');
    }

    get cartTotal() {
        return $('td[data-test="cart-total"]');
    }

    get deleteProductButton () {
        return $('a.btn.btn-danger');
    }

    get successMessageContainer () {
        return $('div.toast-success');
    }

    get successMessage () {
        return $('div.toast-message');
    }
}

export default new CartPage();
