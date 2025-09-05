import HomePage from "../po/pages/home.page";

describe("Sort products", () => {
    beforeEach( async () => {
        await HomePage.open();
    });

    it("User sorts products by price from highest to lowest", async () => {
        await expect(await HomePage.productCardTitles[0]).toHaveText("Combination Pliers");
        await HomePage.filter.sortBy('priceHighestToLowest');
        await expect(await HomePage.productCardTitles[0]).toHaveText("Drawer Tool Cabinet");
    });

    it("User sorts products by price from lowest to highest", async () => {
        await expect(await HomePage.productCardTitles[0]).toHaveText("Combination Pliers");
        await HomePage.filter.sortBy('priceLowestToHighest');
        await expect(await HomePage.productCardTitles[0]).toHaveText("Washers");
    });
});
