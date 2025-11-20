import { test, expect } from "@playwright/test";
import { ExcelUtil } from "../utilis/excelUtil";

const excelPath = "tests/test-data/excel-data/all_data_types.xlsx";
const sheet = "AllDataTypes";

// Read once → reusable across test
const testData = ExcelUtil.readExcel(excelPath, sheet);

test.describe("Data Driven Framework - Excel", () => {

  for (const row of testData) {

    test(`Run test with data: ${row["String"]}`, async ({ page }) => {

      console.log("\n=== Test Data From Excel ===");
      console.log("STRING:", row["String"]);
      console.log("NUMBER:", row["Number"]);
      console.log("BOOLEAN:", row["Boolean"]);
      console.log("DATE:", row["Date"]);
      console.log("FORMULA:", row["Formula"]);
      console.log("EMPTY:", row["Empty Cell"]);
      console.log("============================");

      // Example UI Action
      // await page.goto("https://www.google.com");

      // // Use excel value in UI action
      // await page.fill("input[name='q']", row["String"]);
      // await page.keyboard.press("Enter");

      // // Validate Search completed
      // await expect(page).toHaveURL(/search/);

      console.log("Test execution completed for:", row["String"]);
    });

  }

});
