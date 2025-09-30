import { type Page, type Locator, expect } from "@playwright/test";
import * as XLSX from "xlsx"; // Add this import

export class TableExcelPractice {
  readonly page: Page;
  readonly tableName: Locator;
  readonly theaders: Locator;
  readonly rows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tableName = page.getByRole("heading", { name: "Static Web Table" });
    this.theaders = page.locator('//table[@name="BookTable"]/tbody/tr/th');
    this.rows = page.locator('//table[@name="BookTable"]/tbody/tr');
  }

  async gotoURL() {
    await this.page.goto(`${process.env.GOTO_URL}`);
  }

  async verifyTableName() {
    console.log(`Table Name : ${await this.tableName.innerText()}`);
    expect(this.tableName).toHaveText("Static Web Table");
  }

  async verifyTableHeaders() {
    // verify expected table headers
    const headers = await this.theaders.allInnerTexts();
    console.log(headers);
    expect(this.theaders).toHaveText([
      "BookName",
      "Author",
      "Subject",
      "Price",
    ]);
  }

  async verify3RowData() {
    // verify 3rd row texts
    const row3 = await this.rows.nth(3).locator("td").allInnerTexts();
    console.log(row3);
    expect(row3).toEqual(["Learn JS", "Animesh", "Javascript", "300"]);
  }

  async collectTableDataAndExportToExcel(filePath: string = "tableData.xlsx") {
    const rowsCount = await this.rows.count();
    // expect(this.rows).toHaveCount(7);
    console.log(`Table Rows Count is: ${rowsCount}`);

    const tableData: any[] = [];

    for (let i = 1; i < rowsCount; i++) {
      // skip header row
      const rowsData = this.rows.nth(i);
      const cells = rowsData.locator("td");
      const cellTexts = await cells.allInnerTexts();

      tableData.push({
        BookName: cellTexts[0]?.trim(),
        Author: cellTexts[1]?.trim(),
        Subject: cellTexts[2]?.trim(),
        Price: cellTexts[3]?.trim(),
      });
    }

    // Write to Excel
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, filePath);

    console.log(`Excel file created at: ${filePath}`);
    console.table(tableData);

    // const readFile = XLSX.readFile(filePath);
    // const sheetName = readFile.SheetNames[0];
    // const sheet = readFile.Sheets[sheetName];
    // const excelData = XLSX.utils.sheet_to_json(sheet);
    // console.log("Data read from Excel file:");
    // console.table(excelData);
    
  }
}