import HomePage from "../po/pages/home.page";
import { assert } from "chai";

describe("Sort products", () => {
    beforeEach( async () => {
        await HomePage.open();
    });

    it("User sorts products by price from highest to lowest", async () => {
        assert.equal(await HomePage.productCardTitles[0].getText(), "Combination Pliers");
        await HomePage.filter.sortBy('priceHighestToLowest');
        await browser.pause(5000);
        assert.equal(await HomePage.productCardTitles[0].getText(), "Drawer Tool Cabinet");
    });

    it("User sorts products by price from lowest to highest", async () => {
        assert.equal(await HomePage.productCardTitles[0].getText(), "Combination Pliers");
        await HomePage.filter.sortBy('priceLowestToHighest');
        await browser.pause(5000);
        assert.equal(await HomePage.productCardTitles[0].getText(), "Washers");
    });
});
