import { test, expect } from "@playwright/test";
import * as fs from "fs";

const json = fs.readFileSync("utilis/testData.json", "utf-8");
const jsonData = JSON.parse(json);

for (const data of jsonData) {
  test(`JSON File Test Data ${data.project} `, async () => {
    console.log(
      `Fecthing data from json file ${data.username} and ${data.password}`
    );
  });
}
