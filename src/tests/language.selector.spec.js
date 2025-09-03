import Homepage from "../po/pages/home.page";

describe("Language selector", () => {
    beforeEach( async () => {
        await Homepage.open('');
    });

    it("User switches the language from EN to ES", async () => {
        await expect(await Homepage.languageSelector).toHaveText('EN');
        await Homepage.languageSelector.click();
        await Homepage.language('spanish').click();
        await expect(await Homepage.languageSelector).toHaveText('ES');
    });

    it("User switches the language from ES to FR", async () => {
        await expect(await Homepage.productCardPrices[0]).toHaveText(expect.stringContaining('$'));
        await Homepage.languageSelector.click();
        await Homepage.language('french').click();
        await expect(await Homepage.languageSelector).toHaveText('FR');
        await expect(await Homepage.productCardPrices[0]).not.toHaveText(expect.stringContaining('€'));
    });
});
