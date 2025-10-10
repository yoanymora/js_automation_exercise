import BaseComponent from "./base.component";

export default class FilterComponent extends BaseComponent {
	constructor() {
		super("#filters");
	}

	get sortDropdown() {
		return this.rootElement.$('select[data-test="sort"]');
	}

	get priceRangeSelectorMax() {
		return this.rootElement.$("span.ngx-slider-pointer-max");
	}

	get priceRangeMaxValue() {
		return this.rootElement.$("span.ngx-slider-model-high");
	}

	get priceSelectorBarWidth() {
		return this.rootElement.$(".ngx-slider-selection-bar").getCSSProperty("width");
	}
}
