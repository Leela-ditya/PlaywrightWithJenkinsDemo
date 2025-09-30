import { type Page, type Locator, expect } from "@playwright/test";

export class FormandShadowDOM {
  readonly page: Page;
  readonly locators: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    const formSection = page.locator("#footer-2-1 #HTML6");
    const footerSection = page.locator("#PageList1");
    const shadowDOMSection = page.locator("#footer-2-2");
    this.locators = {
      // footer Section
      formHeading: formSection.getByRole("heading", { name: "Form" }),
      formPara: formSection.locator("p"),
      formInput: formSection.locator("input"),
      formButton: formSection.locator("button"),
      footerHeading: footerSection.getByRole("heading", {
        name: "Footer Links",
      }),
      footerLinks: footerSection.getByRole("listitem").getByRole("link"),

      // shadow DOM Section
      shadowDOMHeading: shadowDOMSection.getByRole("heading", {
        name: "ShadowDOM",
      }),
      mobilesText: shadowDOMSection.getByText("Mobiles"),
      laptopsText: shadowDOMSection.getByText("Laptops"),
      blogLink: shadowDOMSection.getByRole("link", { name: "Blog" }),
      spanText: page.locator(".description > span"),
      textField: shadowDOMSection.getByRole("textbox"),
      checkboxField: shadowDOMSection.getByRole("checkbox"),
    //   fileField: shadowDOMSection.getByRole("link", { name: "Blog" }).filter({has: page.locator('//input[@type="file"]')}),
      youtubeLink: shadowDOMSection.getByRole("link", { name: "Youtube" }),
    };
  }

  async verifyFormSection() {
    const inputsData = [
      "Section 1 input field",
      "Section 2 input field",
      "Section 3 input field",
    ];

    for (let i = 0; i < inputsData.length; i++) {
      console.log(
        `Section ${i + 1} para is : ${await this.locators.formPara
          .nth(i)
          .innerText()}`
      );
      await this.locators.formInput.nth(i).fill(inputsData[i]);
      await expect(this.locators.formInput.nth(i)).not.toBeEmpty();
      await this.locators.formButton.nth(i).click();
    }
  }

  async verifyFooterLinksSection() {
    const linkCount = await this.locators.footerLinks.count();

    const links = [
      "http://testautomationpractice.blogspot.com/",
      "https://testautomationpractice.blogspot.com/p/gui-elements-ajax-hidden.html",
      "https://testautomationpractice.blogspot.com/p/download-files_25.html",
    ];

    for (let i = 0; i < linkCount; i++) {
      // Get href dynamically
      const hrefValue = await this.locators.footerLinks
        .nth(i)
        .getAttribute("href");
      console.log(`Footer link ${i + 1}: ${hrefValue}`);

      // Verify href matches expected value from linksData
      expect(hrefValue).toBe(links[i]);

      // Click the link
      await this.locators.footerLinks.nth(i).click();

      // Wait for navigation
      await this.page.waitForLoadState("domcontentloaded");

      // (Optional) verify title contains expected keyword
      const pageTitle = await this.page.title();
      console.log(`Visited Page Title: ${pageTitle}`);

      // Go back to footer page
      await this.page.goBack();
      await this.page.waitForLoadState("domcontentloaded");

      // Verify previous page contains expected title
      const prevPageTitle = await this.page.title();
      console.log(`Current Page Title: ${prevPageTitle}`);
    }
  }

  async verifyshadowDomSection() {
    // ShadowDOM text 
    console.log(await this.locators.shadowDOMHeading.innerText());
    await expect(this.locators.shadowDOMHeading).toHaveText('ShadowDOM');

    // Mobiles text
    console.log('Shadow DOM Text : ');
    console.log(await this.locators.mobilesText.innerText());
    await expect(this.locators.mobilesText).toHaveText('Mobiles');

    // Laptops text
    console.log(await this.locators.laptopsText.innerText());
    await expect(this.locators.laptopsText).toHaveText('Laptops');

    // blog anchor link
    await this.locators.blogLink.click();
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.page).toHaveURL('https://www.pavantestingtools.com/');
    await expect(this.page).toHaveTitle("SDET-QA Blog");
    await expect(this.locators.spanText).toHaveText(
      "Software Testing & Automation Tutorials"
    );
    await this.page.goBack();
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.page).toHaveURL(
      "https://testautomationpractice.blogspot.com/p/playwrightpractice.html"
    );

    // input field 
    await expect(this.locators.textField).toBeEmpty();
    await this.locators.textField.fill("ShadowDOM section input field");
    await expect(this.locators.textField).not.toBeEmpty();

    // checkbox field
    await expect(this.locators.checkboxField).not.toBeChecked();
    await this.locators.checkboxField.check();
    await expect(this.locators.checkboxField).toBeChecked();

    // await this.locators.fileField.click();
    // await this.locators.fileField.setInputFiles("tests/files/playwrightnotes.txt");
    // await expect(this.locators.fileField).not.toBeEmpty();

    // youtube anchor link text
    await this.locators.youtubeLink.click();
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.page).toHaveURL(
      "https://www.youtube.com/@sdetpavan/videos"
    );
  }
}
