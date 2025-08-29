import Homepage from "../pageobjects/home.page";
import { should } from 'chai';

should();

describe("Language selector", () => {
    beforeEach( async () => {
        await Homepage.open('');
    });

    it("User switches the language from EN to ES", async () => {
        (await Homepage.languageSelector.getText()).should.to.equal('EN');
        await Homepage.languageSelector.click();
        await Homepage.languageES.click();
        (await Homepage.languageSelector.getText()).should.to.equal('ES');
    });

    it("User switches the language from ES to FR", async () => {
        (await Homepage.productCardPrices[0].getText()).should.to.match(/^\$/);
        await Homepage.languageSelector.click();
        await Homepage.languageFR.click();
        (await Homepage.languageSelector.getText()).should.to.equal('FR');
        (await Homepage.productCardPrices[0].getText()).should.not.to.match(/^\€/);
    });
});
