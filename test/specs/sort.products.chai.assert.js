import HomePage from "../pageobjects/home.page";
import { assert } from "chai";

describe("Sort products", () => {
    it("User sorts products by price from highest to lowest", async () => {
        await HomePage.open('');
        assert.equal(await HomePage.productCardTitles[0].getText(), "Combination Pliers");
        await HomePage.sortByPriceHighestToLowest();
        await browser.pause(5000);
        assert.equal(await HomePage.productCardTitles[0].getText(), "Drawer Tool Cabinet");
    });

    it("User sorts products by price from lowest to highest", async () => {
        await HomePage.open('');
        assert.equal(await HomePage.productCardTitles[0].getText(), "Combination Pliers");
        await HomePage.sortByPriceLowestToHighest();
        await browser.pause(5000);
        assert.equal(await HomePage.productCardTitles[0].getText(), "Washers");
    });
});
