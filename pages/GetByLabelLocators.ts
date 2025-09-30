import { type Page, type Locator, expect } from "@playwright/test";
import { time } from "console";

export class GetByLabelLocators {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Getters for locators
    get emailAddress(): Locator {
        return this.page.getByLabel("Email Address:",{exact: true});
    }

    get password(): Locator{
        return this.page.getByLabel('Password:', {exact: true});
    }

    get yourAge(): Locator{
        return this.page.getByLabel('Your Age:',{exact: true});
    }

    get express(): Locator{
        return this.page.getByLabel('Standard', {exact: true});
    }

    async formControls(emailId: string, password: string, age: number){
        expect(this.emailAddress).toBeEmpty();
        await this.emailAddress.fill(emailId);
        expect(this.emailAddress).not.toBeEmpty();
        await this.password.fill(password);
        expect(this.password).not.toBeEmpty();
        await this.yourAge.fill(String(age));
        expect(this.express).not.toBeChecked();
        await this.express.check();
        expect(this.express).toBeChecked();
}

}