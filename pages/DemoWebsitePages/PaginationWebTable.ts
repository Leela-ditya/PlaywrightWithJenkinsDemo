import { type Page, type Locator, expect } from "@playwright/test";

export class PaginationWebTable {
  readonly page: Page;
  readonly locators: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.locators = {
      tableName: page.getByRole("heading", { name: "Pagination Web Table" }),
      theaders: page
        .locator("table#productTable > thead > tr > th")
        .filter({ hasNotText: "Select" }),
      rows: page.locator("table#productTable > tbody > tr"),
      nextTable: page.locator("ul#pagination li a"),
    };
  }

  async verifyTableName() {
    // console.log(await this.locators.tableName.innerText());
    expect(this.locators.tableName).toHaveText("Pagination Web Table");
  }

  async verifyTableHeading() {
    // console.log(
    //   "Table Headers :",
    //   await this.locators.theaders.allInnerTexts()
    // );
    expect(this.locators.theaders).toHaveText(["ID", "Name", "Price"]);
  }

  async collectTableData() {
    // Table Counts
    // console.log("Tables Count: ", await this.locators.nextTable.count());
    const nextTableCount = await this.locators.nextTable.count();
    // console.log(nextTableCount);

    const rowCounts = await this.locators.rows.count();
    // console.log("Rows count from table :", await this.locators.rows.count());

    for (let i = 0; i < nextTableCount; i++) {
      await this.locators.nextTable.nth(i).click();

      const tableData: any[] = [];

      for (let j = 0; j < rowCounts; j++) {
        const rowData = await this.locators.rows.nth(j);
        const cells = await rowData.locator("td");
        // .filter({hasNot : this.page.locator('//input[@type="checkbox"]')});
        const cellTexts = await cells.allInnerTexts();

        tableData.push({
          ID: cellTexts[0]?.trim(),
          Name: cellTexts[1]?.trim(),
          Price: cellTexts[2]?.trim(),
          Select: cellTexts[3]?.trim(),
        });
      }
      console.table(tableData);
    }
  }
}
