import Page from "./page";
import { $ } from '@/wdio/globals';

class Cart extends Page {
    get checkoutButton () {
        return $('button[data-test="proceed-1"]');
    }
}
