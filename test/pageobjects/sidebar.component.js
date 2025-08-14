import { $ } from '@wdio/globals'

export default class Sidebar {

    get sortDropdown () {
        return $('select[data-test="sort"]');
    }

    get priceRangeSelector () {
        return $('ngx-slider');
    }

    get searchInput () {
        return $('#search-query');
    }

    get searchResetButton () {
        return $('#search-reset');
    }

    get searchButton () {
        return $('button[data-test="search-submit"]');
    }

    // ask Andrea how to code the category and brand filters,
    // should I create a get method for each category or create a universal method
    // and pass the category name?
}
