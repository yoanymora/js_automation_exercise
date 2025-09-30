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

}
