import { type Page, type Locator, expect } from "@playwright/test";

export class GetByTestIdLocators {
  readonly page: Page;
  readonly locators: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.locators = {
      name: this.page.getByTestId("profile-name"),
      email: this.page.getByTestId("profile-email"),

      productName1: this.page.getByTestId("product-name").first(),

      productPrice1: this.page.getByTestId("product-price").first(),

      productName2: this.page.getByTestId("product-card-2").getByTestId("product-name"),

      productPrice2: this.page.getByTestId("product-card-2").getByTestId("product-price"),

      productName3: this.page.getByTestId("product-card-3").getByTestId("product-name"),

      productPrice3: this.page.getByTestId("product-card-3").getByTestId("product-price"),

      navContact: this.page.getByTestId("nav-contact").getByRole('link', {name: "Contact"}),

      topBtn: this.page.getByTestId("footer-button"),
    };
  }

  // async datapw() {
  //   const nameText = await this.locators.name.innerText();
  //   // console.log(nameText);
  //   expect(nameText).toBe("John Doe");
  //   const emailAddress = await this.locators.email.innerText();
  //   expect(emailAddress).toBe("john.doe@example.com");
  // }

  async dataTestId() {

    const nameText = await this.locators.name.innerText();
    expect(nameText).toEqual("John Doe")
    expect(this.locators.email).toHaveText("john.doe@example.com")
    
    expect(this.locators.productName1).toHaveText("Product A");
    
    const productPriceTxt1 = await this.locators.productPrice1.innerText();
    expect(productPriceTxt1).toEqual("$19.99");
    
    expect(this.locators.productName2).toHaveText("Product B");
    
    expect(this.locators.productPrice2).toHaveText("$29.99");
    
    expect(this.locators.productName3).toHaveText("Product C");
    
    const productPriceTxt3 = await this.locators.productPrice3.innerText();
    expect(productPriceTxt3).toEqual("$39.99");

    await this.locators.navContact.click();

    await this.locators.topBtn.click();

  }
}
