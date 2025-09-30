import { type Page, type Locator, expect } from "@playwright/test";

export class GetByTextLocators {
    readonly page: Page;
    readonly locators: Record<string, Locator>;

    constructor(page: Page) {
        this.page = page;
        this.locators = {
            important: page.getByText("important", {exact: true}),
            colorRedText: page.getByText("colored text", {exact: true}),
            linkText: page.getByText("link", {exact: true}),
            submitFormBtn: page.getByText("Submit Form", {exact: true}),
            submitFormSiblingElt: page.getByText("Click the button above to submit your information.", {exact: true}),
        }
    }

    async getByTextLocator() {

        expect(this.locators.important).toHaveText("important");

        expect(this.locators.colorRedText).toHaveText("colored text");
        const colorRed = await this.locators.colorRedText.evaluate(el => getComputedStyle(el).color);
        expect(colorRed).toBe("rgb(255, 0, 0)");

        await this.locators.linkText.evaluate(el => el.classList.add("visited-link"));
        expect(this.locators.linkText).toHaveCSS("color", "rgb(181, 18, 0)");

        expect(this.locators.submitFormBtn).not.toBeDisabled();
        // const submitFormBtnTxt = await this.locators.submitFormBtn.innerText();
        expect(this.locators.submitFormBtn).toHaveText("Submit Form");
        // const submitFormSiblingEltTxt = await this.locators.submitFormSiblingElt.textContent();
        expect(this.locators.submitFormSiblingElt).toHaveText("Click the button above to submit your information.");

    }
}

