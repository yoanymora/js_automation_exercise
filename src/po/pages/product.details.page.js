import { $ } from '@wdio/globals'
import Page from './page'

class ProductDetailsPage extends Page {

    constructor() {
        super('product/1');
    }

    get addToCartButton() {
        return $('#btn-add-to-cart');
    }

    get confirmationMessageContainer() {
        return $('.toast-success');
    }
}

export default new ProductDetailsPage();
