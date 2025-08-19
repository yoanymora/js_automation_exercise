import HomePage from "../pageobjects/home.page";

describe("Sort products", () => {
    it("User sorts products by price from highest to lowest", async () => {
        await HomePage.open('');
        await expect(await HomePage.productCardTitles[0]).toHaveText("Combination Pliers");
        await HomePage.sortByPriceHighestToLowest();
        await expect(await HomePage.productCardTitles[0]).toHaveText("Drawer Tool Cabinet");
    });

    it("User sorts products by price from lowest to highest", async () => {
        await HomePage.open('');
        await expect(await HomePage.productCardTitles[0]).toHaveText("Combination Pliers");
        await HomePage.sortByPriceLowestToHighest();
        await expect(await HomePage.productCardTitles[0]).toHaveText("Washers");
    });
});