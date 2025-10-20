import HomePage from "../po/pages/home.page";
import HomeService from "../po/services/home.service";
import { should } from "chai";
import Common from "../po/services/common";

should();

describe("Filter products", () => {
	beforeEach(async () => {
		await HomePage.open();
	});

	it("User filters products by brand with spec", async () => {
		await expect(HomePage.productCardTitles[0]).toHaveText(HomePage.combinationPliersProduct);
		await HomeService.filterProductsByBrandForgeFlexTools();
		await expect(HomePage.productCardTitles[0]).toHaveText(HomePage.hammerProduct);
	});

	it("User filters products by price range with spec", async () => {
		await expect(await HomePage.boltCuttersTool).toBeExisting();
		await HomeService.setMaxPriceRangeSelectorTo39();
		await Common.waitForVisible(await HomePage.productsGrid);
		await expect(await HomePage.filter.priceRangeMaxValue).toHaveText("39");
		await expect(await HomePage.boltCuttersTool).not.toBeExisting();
	});

	it("User filters products by brand with chai - should", async () => {
		await Common.waitForVisible(await HomePage.productCardTitles[0]);
		(await Common.getSelectorText(await HomePage.productCardTitles[0])).should.equal(
			HomePage.combinationPliersProduct
		);
		await HomeService.filterProductsByBrandForgeFlexTools();
		await HomeService.waitUntilFilterSortingCompleted("filter");
		await Common.waitForVisible(await HomePage.productCardTitles[0]);
		(await Common.getSelectorText(await HomePage.productCardTitles[0])).should.equal(
			HomePage.hammerProduct
		);
	});

	it("User filters products by price range with chai - should", async () => {
		(await HomePage.boltCuttersTool).should.exist;
		await HomeService.setMaxPriceRangeSelectorTo39();
		await Common.waitUntilUpdateText(await HomePage.filter.priceRangeMaxValue, "39");
		(await Common.getSelectorText(await HomePage.filter.priceRangeMaxValue)).should.equal("39");
		(await HomePage.boltCuttersTool.isExisting()).should.to.be.false;
	});
});
