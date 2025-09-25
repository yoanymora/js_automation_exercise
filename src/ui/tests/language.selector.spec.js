import HomePage from "../po/pages/home.page";
import HomeService from "../po/services/home.service";
import { should } from 'chai';
import Common from "../po/services/common";

should();

describe("Language selector", () => {
    beforeEach( async () => {
        await HomePage.open();
    });

    it("User switches the language from EN to ES with spec", async () => {
        await expect(await HomePage.header.languageSelector).toHaveText('EN');
        await HomeService.changeLanguageTo('spanish');
        await expect(await HomePage.header.languageSelector).toHaveText('ES');
    });

    it("User switches the language from ES to FR with spec", async () => {
        await expect(await HomePage.productCardPrices[0]).toHaveText(expect.stringContaining('$'));
        await HomeService.changeLanguageTo('french');
        await expect(await HomePage.header.languageSelector).toHaveText('FR');
        await expect(await HomePage.productCardPrices[0]).not.toHaveText(expect.stringContaining('€'));
    });

    it("User switches the language from FR to ES with chai - should", async () => {
        (await Common.getSelectorText(await HomePage.header.languageSelector)).should.to.equal('FR');
        await HomeService.changeLanguageTo('spanish');
        (await Common.getSelectorText(await HomePage.header.languageSelector)).should.to.equal('ES');
    });

    it("User switches the language from ES to FR with chai - should", async () => {
        (await Common.getSelectorText(await HomePage.productCardPrices[0])).should.to.match(/^\$/);
        await HomeService.changeLanguageTo('french');
        (await Common.getSelectorText(await HomePage.header.languageSelector)).should.to.equal('FR');
        (await Common.getSelectorText(await HomePage.productCardPrices[0])).should.not.to.match(/^\€/);
    });

});
