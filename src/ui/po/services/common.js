class Common {

    async getSelectorText(selector) {
        return await selector.getText();
    }

    async waitForVisible(element, timeout = 5000) {
        await element.waitForDisplayed({ timeout });
    }

    async waitForExisting(element, timeout = 5000) {
        await element.waitForExist({ timeout });
    }

    async waitForClickable(element, timeout = 5000) {
        await element.waitForClickable({ timeout });
    }

    async waitUntilUpdateText(selector, value, timeout = 5000) {
        await browser.waitUntil(
            async () => (await selector.getText()) === value,
            { timeout, timeoutMsg: `expected text to be different after ${timeout}ms` }
        );
    }

}

export default new Common();
