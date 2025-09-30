import { type Page, type Locator, expect } from "@playwright/test";

export class GetByTitleLocators{
    readonly page: Page;
    readonly homeText : Locator;
    readonly htmlText : Locator;
    readonly tooltipText : Locator;

    constructor(page: Page){
        this.page = page;
        this.homeText = page.getByTitle("Home page link");
        this.htmlText = page.getByTitle("HyperText Markup Language");
        this.tooltipText = page.getByTitle("Tooltip text");
    }

    async getByTitle(){

        expect(this.homeText).toHaveText("Home");
        await this.homeText.evaluate(el => el.classList.add("visited-link"));
        expect(this.homeText).toHaveCSS('color',"rgb(181, 18, 0)");

        expect(this.htmlText).toHaveText("HTML");

        expect(this.tooltipText).toHaveText("This text has a tooltip")
    }
}
