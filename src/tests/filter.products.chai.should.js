import HomePage from "../po/pages/home.page";
import { should } from 'chai';

should();

describe("Filter products", () => {
    beforeEach( async () => {
        await HomePage.open();
    });

    it("User filters products by brand", async () => {
        await HomePage.productCardTitles[0].waitForDisplayed();
        (await HomePage.productCardTitles[0].getText()).should.equal("Combination Pliers");
        await HomePage.filterProductsByBrandForgeFlexTools();
        await browser.pause(5000);
        await HomePage.productCardTitles[0].waitForDisplayed();
        (await HomePage.productCardTitles[0].getText()).should.equal("Claw Hammer with Shock Reduction Grip");
    });

    it("User filters products by price range", async () => {
        (await HomePage.boltCuttersTool).should.exist;
        let offset = await HomePage.filter.computePriceRangeTo39();
        await HomePage.filter.priceRangeSelectorMax.dragAndDrop({ x: offset, y: 0 });
        await browser.pause(5000);
        await HomePage.productsGrid.waitForDisplayed();
        (await HomePage.filter.priceRangeMaxValue.getText()).should.equal("39");
        (await await HomePage.boltCuttersTool.isExisting()).should.to.be.false;
    });
});
