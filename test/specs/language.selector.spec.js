import Homepage from "../pageobjects/home.page";

describe("Language selector", () => {
    beforeEach( async () => {
        await Homepage.open('');
    });

    it("User switches the language from EN to ES", async () => {
        await expect(await Homepage.languageSelector).toHaveText('EN');
        await Homepage.languageSelector.click();
        await Homepage.languageES.click();
        await expect(await Homepage.languageSelector).toHaveText('ES');
    });

    it("User switches the language from ES to FR", async () => {
        await expect(await Homepage.productCardPrice).toHaveText(expect.stringContaining('$'));
        await Homepage.languageSelector.click();
        await Homepage.languageFR.click();
        await expect(await Homepage.languageSelector).toHaveText('FR');
        await expect(await Homepage.productCardPrice).toHaveText(expect.stringContaining('€'));
    });
});
