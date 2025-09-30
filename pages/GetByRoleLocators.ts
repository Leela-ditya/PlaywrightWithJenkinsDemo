import { expect, type Locator, type Page } from "@playwright/test";

export class GetByRoleLocators {
  readonly page: Page;
  // Web Elements from getByRole Locators
  readonly username: Locator;
  readonly primaryActionBtn: Locator;
  readonly toggleButton: Locator;
  readonly listItem: Locator;
  readonly acceptTerms: Locator;
  readonly roleText: Locator;

  constructor(page: Page) {
    this.page = page;

    // Web Elements from getByRole Locators
    this.username = page.getByRole("textbox").first();
    this.primaryActionBtn = page.getByRole("button", {name: "Primary Action"});
    this.toggleButton = page.getByRole("button", {name: "Toggle Button"}).first();
    this.listItem = page.getByRole('menuitem', { name: 'Home' }).getByRole('link');
    this.acceptTerms = page.getByRole("checkbox").first();
    this.roleText = page.getByText("This is an important alert message!");
  }

  async gotoURL() {
    await this.page.goto(`${process.env.GOTO_URL}`);
  }

  // Web Elements from getByRole Locators
  async getByRoleLocator(userName: string) {
    
    await this.primaryActionBtn.click();
    expect(this.primaryActionBtn).toHaveText("Primary Action");
    await expect(this.toggleButton).toHaveText("Toggle Button");
    await this.username.fill(userName);
    await expect(this.username).not.toBeEmpty();
    await this.listItem.click();
    await this.acceptTerms.check();
    await expect(this.acceptTerms).toBeChecked();

    const roleTextUI = await this.roleText.textContent();
    const trimRoleText = roleTextUI?.trim();
    expect(trimRoleText).toEqual("This is an important alert message!");
  }
}
