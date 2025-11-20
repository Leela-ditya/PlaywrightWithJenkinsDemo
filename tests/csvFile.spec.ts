import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

interface UserRecord {
  test_case: string;
  username: string;
  password: string;
}

// const records = parse(fs.readFileSync("utilis/users.csv"), {
//   columns: true,
//   skip_empty_lines: true,
// }) as UserRecord[];

const records = parse(fs.readFileSync(path.join(__dirname,"../tests/test-data/csv-data/users.csv")), {
    columns: true,
    skip_empty_lines: true,
    // delimiter: ',',
}) as UserRecord[];

// Using forEach Loop

records.forEach((record) => {
  test(`Login test for ${record.test_case}`, async ({ page }) => {
    console.log(`Running test for user: ${record.username} and password: ${record.password}`);
  });
});

// Using for...of Loop

//   for (const record of records) {
//     test(`Login test for ${record.username}`, async ({}) => {
//         console.log(`Running test for user: ${record.username} and password: ${record.password}`);
//     });
//   }
