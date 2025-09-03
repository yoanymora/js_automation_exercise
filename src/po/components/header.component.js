import { $ } from '@wdio/globals'

export default class Header {
    get languageSelector () {
        return $('#language');
    }

    language(lang) {
        const languages = {
            'spanish': 'es',
            'french': 'fr'
        };
        return $(`a[data-test="lang-${languages[lang]}"]`);
    }

    get cartQuantity () {
        return $('span[data-test="cart-quantity"]');
    }
}
