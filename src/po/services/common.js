class Common {

    async getSelectorText(selector) {
        return await selector.getText();
    }

}

export default new Common();
