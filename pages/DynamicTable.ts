import { type Page, type Locator, expect, firefox } from "@playwright/test";

export class DynamicTable {
  readonly page: Page;
  readonly locators: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    const dynamicTable = page.locator("table#taskTable");
    this.locators = {
      tableHeading: this.page.getByRole("heading", {
        name: "Dynamic Web Table",
      }),
      theaders: dynamicTable.locator("thead > tr#headers > th"),
      rows: page.locator("tbody#rows > tr"),
    };
  }

  async verifyTableName() {
    console.log(
      "Table Name:",
      `${await this.locators.tableHeading.innerText()}`
    );
    expect(this.locators.tableHeading).toHaveText("Dynamic Web Table");
  }
  async verifyTableHeaders() {
    console.log(
      "Table Headers : ",
      await this.locators.theaders.allInnerTexts()
    );
    await expect(this.locators.theaders).toHaveCount(5);
    // await expect(this.locators.theaders).toContainText([ 'Name', 'Network (Mbps)', 'CPU (%)', 'Memory (MB)', 'Disk (MB/s)' ]);
  }

  async verifyTableRows() {
    await expect(this.locators.rows).toHaveCount(4);
  }
}
