import { browser } from '@wdio/globals';
import HeaderComponent from '../components/header.component';
import FilterComponent from '../components/filter.component';
/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    constructor(endpoint) {
        this.endpoint = endpoint;
        this.header = new HeaderComponent();
        this.filter = new FilterComponent();
    }
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    async open () {
        await browser.url(`https://practicesoftwaretesting.com/${this.endpoint}`);
    }

    waitForVisible(element, timeout = 5000) {
        element.waitForDisplayed({ timeout });
    }

    waitForClickable(element, timeout = 5000) {
        element.waitForClickable({ timeout });
    }

    async waitUntilUpdateText(selector, value, timeout = 5000) {
        await browser.waitUntil(
            async () => (await selector.getText()) === value,
            { timeout, timeoutMsg: `expected text to be different after ${timeout}ms` }
        );
    }

}
