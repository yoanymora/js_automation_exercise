import { $ } from "@wdio/globals";
import BaseComponent from "./base.component";

export default class Header extends BaseComponent {
	constructor() {
		super(".navbar");
	}

	get languageSelector() {
		return $("#language");
	}

	get cartQuantity() {
		return this.rootElement.$('span[data-test="cart-quantity"]');
	}

	language(lang) {
		const languages = {
			spanish: "es",
			french: "fr",
		};
		return this.rootElement.$(`a[data-test="lang-${languages[lang]}"]`);
	}
}
