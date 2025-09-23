import HomePage from "../pages/home.page";

class HomeService {

    async filterProductsByBrandForgeFlexTools () {
        await HomePage.forgeFlexToolsBrand.click();
    }

    async waitUntilFilterSortingCompleted(action, timeout = 5000) {
        await browser.waitUntil(
            async () => (await HomePage.productsGrid.getAttribute('data-test')) === `${action}_completed`,
            { timeout }
        );
    }

    async changeLanguageTo(language) {
        HomePage.waitForClickable(await HomePage.header.languageSelector);
        await HomePage.header.languageSelector.click();
        HomePage.waitForClickable(await HomePage.header.language(language));
        await HomePage.header.language(language).click();
    }

    async sortBy(option) {
        const options = {
            'priceHighestToLowest': 'price,desc',
            'priceLowestToHighest': 'price,asc'
        };
        await HomePage.filter.sortDropdown.selectByAttribute('value', options[option]);
    }

    async computePriceRangeTo39() {
        let priceSelectorBarWidth = await HomePage.filter.priceSelectorBarWidth;
        let priceSelectorBarWidthValue = priceSelectorBarWidth['parsed']['value']
        let valueToRest = (39 * await priceSelectorBarWidthValue) / parseInt(await HomePage.filter.priceRangeMaxValue.getText());
        return 0 - (await priceSelectorBarWidthValue - valueToRest);
    }

    async setMaxPriceRangeSelectorTo39() {
        let offset = await this.computePriceRangeTo39();
        await HomePage.filter.priceRangeSelectorMax.dragAndDrop({ x: offset, y: 0 });
    }

}

export default new HomeService();
