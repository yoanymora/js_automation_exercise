import { $ } from '@wdio/globals'
import Page from './page'

class ProductDetailsPage extends Page {

    get addToCartButton() {
        return $('#btn-add-to-cart');
    }

    get addToFavoritesButton() {
        return $('#btn-add-to-favorites');
    }

    get confirmationMessageContainer() {
        return $('.toast-success');
    }
}

export default new ProductDetailsPage();
