import HomePage from "../po/pages/home.page";

describe("Filter products", () => {
    beforeEach( async () => {
        await HomePage.open();
    });

    it("User filters products by brand", async () => {
        await expect(HomePage.productCardTitles[0]).toHaveText("Combination Pliers");
        await HomePage.filterProductsByBrandForgeFlexTools();
        await expect(HomePage.productCardTitles[0]).toHaveText("Claw Hammer with Shock Reduction Grip");
    });

    it("User filters products by price range", async () => {
        await expect(await HomePage.boltCuttersTool).toBeExisting();
        let offset = await HomePage.filter.computePriceRangeTo39();
        await HomePage.filter.priceRangeSelectorMax.dragAndDrop({ x: offset, y: 0 });
        await HomePage.productsGrid.waitForDisplayed();
        await expect(await HomePage.filter.priceRangeMaxValue).toHaveText("39");
        await expect(await HomePage.boltCuttersTool).not.toBeExisting();
    });
});
