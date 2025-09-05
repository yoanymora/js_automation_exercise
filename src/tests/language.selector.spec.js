import HomePage from "../po/pages/home.page";

describe("Language selector", () => {
    beforeEach( async () => {
        await HomePage.open();
    });

    it("User switches the language from EN to ES", async () => {
        await expect(await HomePage.header.languageSelector).toHaveText('EN');
        await HomePage.header.languageSelector.click();
        await HomePage.header.language('spanish').click();
        await expect(await HomePage.header.languageSelector).toHaveText('ES');
    });

    it("User switches the language from ES to FR", async () => {
        await expect(await HomePage.productCardPrices[0]).toHaveText(expect.stringContaining('$'));
        await HomePage.header.languageSelector.click();
        await HomePage.header.language('french').click();
        await expect(await HomePage.header.languageSelector).toHaveText('FR');
        await expect(await HomePage.productCardPrices[0]).not.toHaveText(expect.stringContaining('€'));
    });
});
