import HomePage from "../po/pages/home.page";
import { should } from 'chai';

should();

describe("Language selector", () => {
    beforeEach( async () => {
        await HomePage.open();
    });

    it("User switches the language from EN to ES", async () => {
        (await HomePage.header.languageSelector.getText()).should.to.equal('EN');
        await HomePage.header.languageSelector.click();
        await HomePage.header.language('spanish').click();
        (await HomePage.header.languageSelector.getText()).should.to.equal('ES');
    });

    it("User switches the language from ES to FR", async () => {
        (await HomePage.productCardPrices[0].getText()).should.to.match(/^\$/);
        await HomePage.header.languageSelector.click();
        await HomePage.header.language('french').click();
        (await HomePage.header.languageSelector.getText()).should.to.equal('FR');
        (await HomePage.productCardPrices[0].getText()).should.not.to.match(/^\€/);
    });
});
