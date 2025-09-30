import { type Page, type Locator, expect } from "@playwright/test";

export class GetByPlaceholderLocaters {
    readonly page: Page;
    readonly locators: Record<string, Locator>;

    constructor(page: Page){
        this.page = page;
        this.locators = {
            fullName: this.page.getByPlaceholder("Enter your full name"),
            phoneNo: this.page.getByPlaceholder("Phone number (xxx-xxx-xxxx)"),
            message: this.page.getByPlaceholder("Type your message here..."),
            products: this.page.getByPlaceholder("Search products..."),
            searchBtn: this.page.locator('button',{hasText: "Search"}),
        }
    }

    async getByPlaceholder(fullname: string, phoneno: number, msg: string, productTxt: string){
        await this.locators.fullName.fill(fullname);
        expect(this.locators.fullName).not.toBeEmpty();
        await this.locators.phoneNo.fill(String(phoneno));
        expect(this.locators.phoneNo).not.toBeEmpty();
        await this.locators.message.fill(msg);
        expect(this.locators.message).not.toBeEmpty();
        await this.locators.products.fill(productTxt);
        expect(this.locators.products).not.toBeEmpty();
        expect(this.locators.searchBtn).toBeVisible();
        await this.locators.searchBtn.click();
    }

}