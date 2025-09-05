import BaseComponent from "./base.component";

export default class FilterComponent extends BaseComponent {
    constructor() {
        super('#filters');
    }

    get sortDropdown () {
        return this.rootElement.$('select[data-test="sort"]');
    }

    get priceRangeSelectorMax () {
        return this.rootElement.$('span.ngx-slider-pointer-max');
    }

    get priceRangeMaxValue () {
        return this.rootElement.$('span.ngx-slider-model-high');
    }

    get priceSelectorBarWidth () {
        return this.rootElement.$('.ngx-slider-selection-bar').getCSSProperty("width");
    }

    async sortBy(option) {
        const options = {
            'priceHighestToLowest': 'price,desc',
            'priceLowestToHighest': 'price,asc'
        };
        await this.sortDropdown.selectByAttribute('value', options[option]);
    }

    async computePriceRangeTo39() {
        let priceSelectorBarWidth = await this.priceSelectorBarWidth;
        let priceSelectorBarWidthValue = priceSelectorBarWidth['parsed']['value']
        let valueToRest = (39 * await priceSelectorBarWidthValue) / parseInt(await this.priceRangeMaxValue.getText());
        return 0 - (await priceSelectorBarWidthValue - valueToRest);
    }
}
