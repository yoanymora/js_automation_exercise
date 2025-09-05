import Page from './page';

class Homepage extends Page {

    constructor() {
        super('');
    }

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

    get forgeFlexToolsBrand () {
        return $('label*=ForgeFlex Tools');
    }

    get boltCuttersTool () {
        return $('h5=Bolt Cutters');
    }

    async filterProductsByBrandForgeFlexTools () {
        await this.forgeFlexToolsBrand.click();
    }

}

export default new Homepage();
