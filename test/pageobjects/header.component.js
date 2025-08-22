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

    get languageEN () {
        return $('a[data-test="lang-en"]');
    }

    get languageES () {
        return $('a[data-test="lang-es"]');
    }

    get languageFR () {
        return $('a[data-test="lang-fr"]');
    }

    get cartLink () {
        return $('a[data-test="nav-cart"]');
    }

    get cartQuantity () {
        return $('a[data-test="nav-cart"] span[data-test="cart-quantity"]');
    }

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
