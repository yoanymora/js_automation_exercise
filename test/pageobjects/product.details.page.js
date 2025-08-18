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

    // Ask Andrea If I have to create a get method
    // for each element of the page even if this isn't
    // needed for the task
}

export default new ProductDetailsPage();