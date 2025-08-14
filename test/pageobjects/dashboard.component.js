import { $ } from '@wdio/globals'

export default class Dashboard {
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

    get cartLink () {
        return $('a[data-test="nav-cart"]');
    }

    get cartQuantity () {
        return $('a[data-test="nav-cart"] span[data-test="cart-quantity"]').textContent;
    }

    // TODO learn how to get different links throush the same method with a
    // parameter
    // get userProfile () {
    //     return $(`#menu li[data-test="nav-my-${option}"]`);
    // }
}
