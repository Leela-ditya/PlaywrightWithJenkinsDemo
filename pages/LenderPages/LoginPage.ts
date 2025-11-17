import {expect, type Locator, type Page, test} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly locators : Record<string, Locator>;

    constructor (page: Page){
        this.page = page;
        this.locators = {
            username : page.getByLabel('Username', {exact: true}),
            password : page.getByLabel('Password', {exact: true}),
            loginButton : page.getByLabel('Login', {exact: true}),
            dashboard : page.getByRole('link', {name: 'Dashboard'}),
        }
    }

    async navigateToURL(){
        await this.page.goto(`${process.env.LENDER_PRICE_URL}`)
    }

    async loginData(){
        await this.locators.username.click();
        await expect(this.locators.username).toBeEmpty();
        await this.locators.username.fill(`${process.env.USER_NAME}`);
        await expect(this.locators.username).not.toBeEmpty();
        await expect(this.locators.username).toHaveValue(`${process.env.USER_NAME}`);
        await this.locators.password.click();
        await expect(this.locators.password).toBeEmpty();
        await this.locators.password.fill(`${process.env.PASSWORD}`);
        await expect(this.locators.password).not.toBeEmpty();
        await expect(this.locators.password).toHaveValue(`${process.env.PASSWORD}`);
        await expect(this.locators.loginButton).toBeVisible();
        await this.locators.loginButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        // await this.page.waitForTimeout(2000);
        await expect(this.locators.dashboard).toBeVisible();
        // await expect(this.page).toHaveURL('https://ext-qa.lpcorrtest.com/cp/#/dashboard');
    }
}


