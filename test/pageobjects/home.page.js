import Page from './page';

class Homepage extends Page {
    get productsGrid () {
        return $('div.row div.container');
    }

    get productCard () {
        return $('a.card');
    }

    get productCardTitle () {
        return $('a.card div.card-body h5[data-test="product-name"]');
    }

    get productCardPrice () {
        return $('a.card div.card-footer span[data-test="product-price"]');
    }
}

export default new Homepage();
