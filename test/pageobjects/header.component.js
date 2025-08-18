import { $ } from '@wdio/globals'

export default class Header {
    get homeLink () {
        return $('a[data-test="nav-home"');
    }

    get categoriesLink () {
        return $('a[data-test="nav-categories"');
    }

    get contactLink () {
        return $('a[data-test="nav-contact"');
    }

    get signInLink () {
        return $('a[data-test="nav-sign-in"');
    }

    get languageSelector () {
        return $('#language');
    }
    // TODO: ask Andrea if there is another way to create a function to return the
    // language passing a param
    get languageDE () {
        return $('a[data-test="lang-de"]');
    }

    get languageEN () {
        return $('a[data-test="lang-en"]');
    }

    get languageES () {
        return $('a[data-test="lang-es"]');
    }

    get languageFR () {
        return $('a[data-test="lang-fr"]');
    }

    get languageNL () {
        return $('a[data-test="lang-nl"]');
    }

    get languageTR () {
        return $('a[data-test="lang-tr"]');
    }

    get cartLink () {
        return $('a[data-test="nav-cart"]');
    }

    get cartQuantity () {
        return $('a[data-test="nav-cart"] span[data-test="cart-quantity"]');
    }

    // TODO learn how to get different links throush the same method with a
    // parameter
    get userAccount () {
        return $('#menu li[data-test="nav-my-account"]');
    }

    get userFavorites () {
        return $('#menu li[data-test="nav-my-favorites"]');
    }

    get userProfile () {
        return $('#menu li[data-test="nav-my-profile"]');
    }

    get userInvoices () {
        return $('#menu li[data-test="nav-my-invoices"]');
    }

    get userMessages () {
        return $('#menu li[data-test="nav-my-messages"]');
    }

    get signOut () {
        return $('#menu li[data-test="nav-sign-out"]');
    }
}
