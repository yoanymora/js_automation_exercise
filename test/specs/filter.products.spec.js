import HomePage from "../pageobjects/home.page";

describe("Filter products", () => {
    it("User filters products by brand", async () => {
        await HomePage.open("");
        await expect(HomePage.productCardTitles[0]).toHaveText("Combination Pliers");
        await HomePage.filterProductsByBrandForgeFlexTools();
        await expect(HomePage.productCardTitles[0]).toHaveText("Claw Hammer with Shock Reduction Grip");
    });

    it("User filters products by price range", async () => {
        await HomePage.open("");
        await expect(await HomePage.boltCuttersTool).toBeExisting();
        let offset = await HomePage.computePriceRangeTo39();
        await HomePage.priceRangeSelectorMax.dragAndDrop({ x: offset, y: 0 });
        await HomePage.productsGrid.waitForDisplayed();
        await expect(await HomePage.priceRangeMaxValue).toHaveText("39");
        await expect(await HomePage.boltCuttersTool).not.toBeExisting();
    });
});
