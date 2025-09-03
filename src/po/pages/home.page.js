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

    get priceRangeSelectorMax () {
        return $('span.ngx-slider-pointer-max');
    }

    get priceRangeMaxValue () {
        return $('span.ngx-slider-model-high');
    }

    get forgeFlexToolsBrand () {
        return $('label*=ForgeFlex Tools');
    }

    get boltCuttersTool () {
        return $('h5=Bolt Cutters');
    }

    get priceSelectorBarWidth () {
        return $('.ngx-slider-selection-bar').getCSSProperty("width");
    }

    async filterProductsByBrandForgeFlexTools () {
        await this.forgeFlexToolsBrand.click();
    }

    async sortByPriceHighestToLowest () {
        await this.sortDropdown.selectByAttribute('value', 'price,desc');
    }

    async sortByPriceLowestToHighest () {
        await this.sortDropdown.selectByAttribute('value', 'price,asc');
    }

    async computePriceRangeTo39() {
        let priceSelectorBarWidth = await this.priceSelectorBarWidth;
        let priceSelectorBarWidthValue = priceSelectorBarWidth['parsed']['value']
        let valueToRest = (39 * await priceSelectorBarWidthValue) / parseInt(await this.priceRangeMaxValue.getText());
        return 0 - (await priceSelectorBarWidthValue - valueToRest);
    }
}

export default new Homepage();
