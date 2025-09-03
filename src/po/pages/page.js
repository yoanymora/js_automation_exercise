import { browser } from '@wdio/globals';
import Header from '../components/header.component';
/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page extends Header {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    async open (path) {
        await browser.url(`https://practicesoftwaretesting.com/${path}`);
    }
}
