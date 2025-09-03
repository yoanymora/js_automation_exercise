import Homepage from "../po/pages/home.page";
import { should } from 'chai';

should();

describe("Language selector", () => {
    beforeEach( async () => {
        await Homepage.open('');
    });

    it("User switches the language from EN to ES", async () => {
        (await Homepage.languageSelector.getText()).should.to.equal('EN');
        await Homepage.languageSelector.click();
        await Homepage.language('spanish').click();
        (await Homepage.languageSelector.getText()).should.to.equal('ES');
    });

    it("User switches the language from ES to FR", async () => {
        (await Homepage.productCardPrices[0].getText()).should.to.match(/^\$/);
        await Homepage.languageSelector.click();
        await Homepage.language('french').click();
        (await Homepage.languageSelector.getText()).should.to.equal('FR');
        (await Homepage.productCardPrices[0].getText()).should.not.to.match(/^\€/);
    });
});
