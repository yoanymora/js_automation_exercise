import HomePage from "../po/pages/home.page";
import { should } from 'chai';

should();

describe("Filter products", () => {
    it("User filters products by brand", async () => {
        await HomePage.open("");
        await HomePage.productCardTitles[0].waitForDisplayed();
        (await HomePage.productCardTitles[0].getText()).should.equal("Combination Pliers");
        await HomePage.filterProductsByBrandForgeFlexTools();
        await browser.pause(5000);
        await HomePage.productCardTitles[0].waitForDisplayed();
        (await HomePage.productCardTitles[0].getText()).should.equal("Claw Hammer with Shock Reduction Grip");
    });

    it("User filters products by price range", async () => {
        await HomePage.open("");
        (await HomePage.boltCuttersTool).should.exist;
        let offset = await HomePage.computePriceRangeTo39();
        await HomePage.priceRangeSelectorMax.dragAndDrop({ x: offset, y: 0 });
        await browser.pause(5000);
        await HomePage.productsGrid.waitForDisplayed();
        (await HomePage.priceRangeMaxValue.getText()).should.equal("39");
        (await await HomePage.boltCuttersTool.isExisting()).should.to.be.false;
    });
});
