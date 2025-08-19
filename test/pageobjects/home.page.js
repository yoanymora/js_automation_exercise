import Page from './page';

class Homepage extends Page {
    get productsGrid () {
        return $('div.row div.container');
    }

    get productCards () {
        return $$('a.card');
    }

    get productCardTitles () {
        return $$('h5[data-test="product-name"]');
    }

    get productCardPrices () {
        return $$('span[data-test="product-price"]');
    }

    get sortDropdown () {
        return $('select[data-test="sort"]');
    }

    get priceRangeSelector () {
        return $('.ngx-slider');
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

    async sortByPriceHighestToLowest () {
        await this.sortDropdown.selectByAttribute('value', 'price,desc');
    }

    async sortByPriceLowestToHighest () {
        await this.sortDropdown.selectByAttribute('value', 'price,asc');
    }
}

export default new Homepage();
