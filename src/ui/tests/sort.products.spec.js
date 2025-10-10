import HomePage from "../po/pages/home.page";
import HomeService from "../po/services/home.service";
import { assert } from "chai";

describe("Sort products", () => {
	beforeEach(async () => {
		await HomePage.open();
	});

	it("User sorts products by price from highest to lowest with spec", async () => {
		await expect(await HomePage.productCardTitles[0]).toHaveText(
			HomePage.combinationPliersProduct
		);
		await HomeService.sortBy("priceHighestToLowest");
		await expect(await HomePage.productCardTitles[0]).toHaveText(HomePage.drawerProduct);
	});

	it("User sorts products by price from lowest to highest with spec", async () => {
		await expect(await HomePage.productCardTitles[0]).toHaveText(
			HomePage.combinationPliersProduct
		);
		await HomeService.sortBy("priceLowestToHighest");
		await expect(await HomePage.productCardTitles[0]).toHaveText(HomePage.washersProduct);
	});

	it("User sorts products by price from highest to lowest with chai - assert", async () => {
		assert.equal(
			await HomePage.productCardTitles[0].getText(),
			HomePage.combinationPliersProduct
		);
		await HomeService.sortBy("priceHighestToLowest");
		await HomeService.waitUntilFilterSortingCompleted("sorting");
		assert.equal(await HomePage.productCardTitles[0].getText(), HomePage.drawerProduct);
	});

	it("User sorts products by price from lowest to highest with chai - assert", async () => {
		assert.equal(
			await HomePage.productCardTitles[0].getText(),
			HomePage.combinationPliersProduct
		);
		await HomeService.sortBy("priceLowestToHighest");
		await HomeService.waitUntilFilterSortingCompleted("sorting");
		assert.equal(await HomePage.productCardTitles[0].getText(), HomePage.washersProduct);
	});
});
