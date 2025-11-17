import { type Page, type Locator, expect } from "@playwright/test";

export class GetByAltTextLocators{
    readonly page: Page;
    readonly imgAltText: Locator;

    constructor(page: Page){
        this.page = page;
        this.imgAltText = page.getByAltText("logo image")
    }

    async getByAltText(){
        expect(this.imgAltText).toHaveAttribute('alt', 'logo image');
        expect(this.imgAltText).toBeVisible();
    }
}