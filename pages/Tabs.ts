import { type Page, type Locator, expect } from "@playwright/test";

export class Tabs {
  readonly page: Page;
  readonly locators: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.locators = {
      //search field
      searchbox: page.locator("#Wikipedia1_wikipedia-search-input"),
      searchBtn: page.locator(".wikipedia-search-button"),
      searchResults: page.locator(
        "#Wikipedia1_wikipedia-search-results > #wikipedia-search-result-link > a"
      ),
      // dynamic button
      dynamicBtn: page.locator("#HTML5 button"),
      // dialogs
      alertBtn: page.locator("#alertBtn"),
      confirmBtn: page.locator("#confirmBtn"),
      promptBtn: page.locator("#promptBtn"),
      // New Tab
      newTabBtn: page.locator("button", { hasText: "New Tab" }),
      spanText: page.locator(".description > span"),
      // Popup Window
      popupWindows: page.getByRole("button", { name: "Popup Windows" }),
      // Point me button
      pointMeBtn: page.getByRole("button", { name: "Point Me" }),
      // doubleclick the copytext button
      copyText: page.getByRole("button", { name: "Copy Text" }),
      inputField1: page.locator("#field1"),
      inputField2: page.locator("#field2"),
      // drag and drop
      draggable: page.locator("#draggable"),
      droppable: page.locator("#droppable"),
      droppableText: page.locator("#droppable p"),
      // svg elements
      svgCircle: page.locator('.svg-container svg circle[fill="red"]'),
      svgRect: page.locator(".svg-container svg rect[fill='green']"),
      svgPolygon: page.locator(".svg-container svg polygon[fill='blue']"),
      // dynamic dropdown
      inputDropdown: page.locator(" #HTML17 #comboBox"),
      selectOptions: page.locator("#HTML17 #dropdown"),
      // links and labels
      linksAndLabelsHeading: page.locator("#HTML11 h2"),
      mobileLabels: page.getByRole("heading", { name: "Mobile Labels" }),
      mobileList: page.locator("#mobiles label"),
      laptopsLink: page.getByText("Laptop Links", { exact: true }),
      laptopsList: page.locator("#laptops a"),
      // broken links
      brokenLinkHeading: page.locator("#broken-links h4"),
      brokenLinks: page.locator("#broken-links > a"),
      // Visitors Web Elements
      visitorsHeading: page.getByRole("heading", { name: "Visitors" }),
      visitorsGraph: page.getByLabel("A chart.").first(),
      visitorsCount: page.locator("#Stats1_totalCount"),
      // slider
      slider: page.locator("#slider-range"),
    };
  }

  async searchField(searchText: string) {
    await this.locators.searchbox.click();
    await this.locators.searchbox.clear();
    await this.locators.searchbox.fill(searchText);
    await expect(this.locators.searchbox).not.toBeEmpty();
    await this.locators.searchBtn.click();

    await this.page.waitForTimeout(500);
    const searchResultsCount = await this.locators.searchResults.count();
    console.log("Count", await searchResultsCount);

    for (let i = 0; i < searchResultsCount; i++) {
      const searchResultsText = await this.locators.searchResults
        .nth(i)
        .innerText();
      console.log("Search texts: ", await searchResultsText);
      await expect(this.locators.searchResults).toHaveText([
        "Playwright",
        "Playwright (software)",
        "Playwrights Horizons",
        "Playwrights Guild of Canada",
        "Playwrights' Company",
      ]);
    }
  }

  async dynamicButton() {
    let nameValue = await this.locators.dynamicBtn.getAttribute("name");

    if (nameValue === "start") {
      await this.locators.dynamicBtn.isVisible();
      await this.locators.dynamicBtn.click();
      // const yellowGreenColor = await this.locators.dynamicBtn.evaluate(el => getComputedStyle(el).color);
      // await expect(yellowGreenColor).toBe('rgb(154, 205, 50)');
      // await expect(this.locators.dynamicBtn).toHaveCSS('background-color','YellowGreen');
    }
    // await this.page.waitForTimeout(500);
    let nameValue1 = await this.locators.dynamicBtn.getAttribute("name");
    console.log(nameValue1);

    if (nameValue1 === "stop") {
      await this.locators.dynamicBtn.isVisible();
      await this.locators.dynamicBtn.click();
    }
  }

  async alertsAndPopups() {
    this.page.once("dialog", async (dialog) => {
      console.log(dialog.type());
      expect(dialog.type()).toContain("alert");
      console.log(dialog.message());
      expect(dialog.message()).toContain("I am an alert box!");
      await dialog.accept();
    });
    await this.locators.alertBtn.click();
    this.page.once("dialog", async (dialog) => {
      console.log(dialog.type());
      expect(dialog.type()).toContain("confirm");
      console.log(dialog.message());
      expect(dialog.message()).toContain("Press a button!");
      dialog.dismiss();
    });
    await this.locators.confirmBtn.click();
    this.page.once("dialog", (dialog) => {
      console.log(dialog.type());
      expect(dialog.type()).toContain("prompt");
      console.log(dialog.message());
      expect(dialog.message()).toContain("Please enter your name:");
      console.log(dialog.defaultValue());
      expect(dialog.defaultValue()).toContain("Harry Potter");
      dialog.accept();
    });
    await this.locators.promptBtn.click();
  }

  async newTab() {
    // Wait for popup event while clicking "New Tab Button"
    const [newTab] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.locators.newTabBtn.click(),
    ]);

    // Wait until new tab is loaded
    await newTab.waitForLoadState("domcontentloaded");

    // Verify title
    const nextPageTitle = await newTab.title();
    console.log("Next Page Title : ", nextPageTitle);
    expect(nextPageTitle).toBe("SDET-QA Blog");

    // Verify URL
    const nextPageURL = newTab.url();
    console.log("Next Page URL : ", nextPageURL);
    await expect(nextPageURL).toBe("https://www.pavantestingtools.com/");

    await expect(
      newTab.locator("text=Software Testing & Automation Tutorials").first()
    ).toBeVisible();

    // Close new tab
    await newTab.close();

    // Back to original page
    await this.page.waitForLoadState("domcontentloaded");
    const originalPageURL = await this.page.url();
    if (
      originalPageURL ===
      "https://testautomationpractice.blogspot.com/p/playwrightpractice.html#"
    ) {
      await expect(originalPageURL).toBe(
        "https://testautomationpractice.blogspot.com/p/playwrightpractice.html#"
      );
      console.log("Original Page URL :", originalPageURL);
    } else {
      await expect(originalPageURL).toBe(
        "https://testautomationpractice.blogspot.com/p/playwrightpractice.html"
      );
      console.log("Original Page URL :", originalPageURL);
    }
    console.log(await this.page.title());
  }

  async popupWindow() {
    // Wait for popup window while clicking "Popup Windows"
    const originalPageURL = await this.page.url();
    const [popupWindow] = await Promise.all([
      this.page.waitForEvent("popup"), // Listen for popup event
      this.locators.popupWindows.click(), // Click the button that opens popup
    ]);

    // Wait until popup window loads
    await popupWindow.waitForLoadState("domcontentloaded");

    // Verify title of popup window
    const popupTitle = await popupWindow.title();
    console.log("Popup Window Title : ", popupTitle);
    if (popupTitle === "Selenium") {
      expect(popupTitle).toBe("Selenium");
    } else {
      expect(popupTitle).toBe(
        "Fast and reliable end-to-end testing for modern web apps | Playwright"
      );
    }

    // Verify URL of popup window
    const popupURL = await popupWindow.url();
    if (popupURL === "https://playwright.dev/") {
      expect(popupURL).toBe("https://playwright.dev/");
    } else {
      expect(popupURL).toBe("https://www.selenium.dev/");
    }

    const verifyPopupwindowTxt = await popupWindow.getByRole("heading", {
      name: "Selenium automates browsers. That's it!",
    });
    // await expect(verifyPopupwindowTxt).toBeVisible();
    await expect(verifyPopupwindowTxt).toHaveText(
      "Selenium automates browsers. That's it!"
    );

    // Close popup window
    await popupWindow.close();
    await popupWindow.isClosed();

    // Back to original page
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.page).toHaveURL(originalPageURL);
    console.log("Original page title:", await this.page.title());
  }

  async mouseHover() {
    await this.locators.pointMeBtn.hover();
    // await this.locators.pointMeBtn.screenshot({path: 'pointme.png'})
    const mobilesTxt = await this.page
      .locator(
        '//button[@class="dropbtn"]//following-sibling::div[@class="dropdown-content"]//a[2]'
      )
      .innerText();
    expect(mobilesTxt).toBe("Laptops");
  }

  async doubleClick() {
    await this.locators.copyText.dblclick();
    const field1Value = await this.locators.inputField1.inputValue();
    console.log("Field1 input value : ", field1Value);
    const field2Value = await this.locators.inputField2.inputValue();
    expect(this.locators.inputField2).not.toBeEmpty();
    console.log("Field2 input value : ", field2Value);
    expect(field1Value).toEqual(field2Value);
  }

  async dragAndDrop() {
    await this.locators.draggable.dragTo(this.locators.droppable);
    await expect(this.locators.droppableText).toHaveText("Dropped!");
    const droppedTxt = await this.locators.droppableText.innerText();
    console.log("Dropped Text : ", droppedTxt);
  }

  async slider() {
    await this.page.waitForTimeout(3000);
    for (let i = 0; i < 10; i++) {
      await this.locators.slider.locator("span").first().press("ArrowLeft");
    }
    await this.page.waitForTimeout(3000);
    for (let i = 0; i < 10; i++) {
      await this.locators.slider.locator("span").nth(1).press("ArrowRight");
    }
    await expect(
      this.page.getByRole("textbox", { name: "Price range:" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("textbox", { name: "Price range:" })
    ).toHaveValue("$65 - $310");
  }

  async svgElements() {
    // await this.locators.svgCircle.click();
    const circleFillColor = await this.locators.svgCircle.evaluate((el) =>
      el.getAttribute("fill")
    );
    expect(circleFillColor).toBe("red");
    // await this.locators.svgRect.click();
    const rectFillColor = await this.locators.svgRect.evaluate((el) =>
      el.getAttribute("fill")
    );
    expect(rectFillColor).toBe("green");
    // await this.locators.svgPolygon.click();
    const polygonFillColor = await this.locators.svgPolygon.evaluate((el) =>
      el.getAttribute("fill")
    );
    expect(polygonFillColor).toBe("blue");
  }

  async scrollingDropdown() {
    await this.locators.inputDropdown.click();
    await this.locators.selectOptions
      .getByText("Item 100")
      .scrollIntoViewIfNeeded();
    await this.locators.selectOptions.getByText("Item 100").click();
    await expect(this.locators.inputDropdown).not.toBeEmpty();
    console.log("Scrolling Dropdown is successfully Completed");
  }

  async labelsAndLinks() {
    const labelslinksTxt =
      await this.locators.linksAndLabelsHeading.innerText();
    console.log(
      "Labels and Links Heading : ",
      await this.locators.linksAndLabelsHeading.innerText()
    );
    expect(labelslinksTxt).toBe("Labels And Links");

    const mobileLabelTxt = await this.locators.mobileLabels.innerText();
    console.log(
      "Mobile Label Heading : ",
      await this.locators.mobileLabels.innerText()
    );
    expect(mobileLabelTxt).toBe("Mobile Labels");

    const mobileListCount = await this.locators.mobileList.count();
    await expect(this.locators.mobileList).toHaveCount(3);

    for (let i = 0; i < mobileListCount; i++) {
      const mobileListTxt = await this.locators.mobileList.nth(i).innerText();
      console.log("Mobile Label Texts : ", mobileListTxt);
    }
    await expect(this.locators.mobileList).toHaveText([
      "Samsung",
      "Real Me",
      "Moto",
    ]);

    const laptopLinkTxt = await this.locators.laptopsLink.innerText();
    console.log(
      "Laptop Heading : ",
      await this.locators.laptopsLink.innerText()
    );
    expect(laptopLinkTxt).toBe("Laptop Links");

    const laptopListsCount = await this.locators.laptopsList.count();
    await expect(this.locators.laptopsList).toHaveCount(3);
    console.log("Laptop Lists Count : ", laptopListsCount);

    const hrefValueArr = [
      "https://www.apple.com/",
      "https://www.lenovo.com/",
      "https://www.dell.com/",
    ];

    for (let i = 0; i < laptopListsCount; i++) {
      const hrefValue = await this.locators.laptopsList
        .nth(i)
        .getAttribute("href");
      await this.locators.laptopsList.nth(i).click();
      expect(hrefValueArr[i]).toBe(hrefValue);

      const navPageURL = await this.page.url();

      if (hrefValueArr[i] != navPageURL) {
        let verifyHrefValue = await hrefValueArr[i];
        await verifyHrefValue.concat("in/en/");
        expect(hrefValueArr[i]).toBe(verifyHrefValue);
        console.log("Automation : ", await this.page.title());
      } else {
        expect(hrefValueArr[i]).toBe(navPageURL);
        console.log("Automation : ", await this.page.title());
      }
      await this.page.goBack();
      await this.page.waitForLoadState("domcontentloaded");
      console.log("Laptop Original Page Title : ", await this.page.title());
    }
  }

  async brokenLinks() {
    console.log(
      "Display : ",
      await this.locators.brokenLinkHeading.innerText()
    );
    await expect(this.locators.brokenLinkHeading).toHaveText("Broken Links");

    const brokenLinksCount = await this.locators.brokenLinks.count();
    await expect(this.locators.brokenLinks).toHaveCount(8);

    for (let i = 0; i < brokenLinksCount-4; i++) {
      const hrefValue = await this.locators.brokenLinks.nth(i).getAttribute("href");
      await this.locators.brokenLinks.nth(i).click();
      await this.page.waitForLoadState("domcontentloaded");
      const nextPageURL = this.page.url();
      console.log(`URL ${i + 1} : ${nextPageURL}`);
      expect(hrefValue).toEqual(nextPageURL);
      await this.page.waitForLoadState("domcontentloaded");
      await this.page.goBack();
      await this.page.waitForLoadState("domcontentloaded");
    }
  }

  async visitors() {
    // Verify the heading text
    console.log(await this.locators.visitorsHeading.innerText());
    await expect(this.locators.visitorsHeading).toHaveText("Visitors");

    // Get the visitors count (string)
    const visitorsCountText = await this.locators.visitorsCount.innerText();
    console.log("Raw visitors count text:", visitorsCountText);

    // Clean the number (remove commas)
    const visitorsCount = Number(visitorsCountText.replace(/,/g, ""));
    console.log("Visitors Total Count:", visitorsCount);

    // Verify it's a valid number
    expect(visitorsCount).not.toBeNaN();

    // Verify count is greater than 1 million
    // expect(visitorsCount).toBeGreaterThan(4000000);

    // Verify graph image is visible
    await expect(this.locators.visitorsGraph).toBeVisible();
  }
}
