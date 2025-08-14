import Dashboard from "./dashboard.component";
import { $ } from '@/wdio/globals';

class Cart extends Dashboard {
    get checkoutButton () {
        return $('button[data-test="proceed-1"]');
    }
}
