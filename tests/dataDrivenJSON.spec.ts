import {test} from "@playwright/test";
import * as fs from "fs";

const jsonData = fs.readFileSync("./tests/test-data/json-data/sauceDemo.json", "utf-8");
const json = JSON.parse(jsonData)

test.describe("Data Driven Framewrk - JSON", ()=>{
    for(const users of json){
        test(`Login test for user: ${users.user}`, async ({page})=>{
            console.log(`\n=== Test Data From JSON ===`);
            await page.goto("https://www.saucedemo.com/");
            await page.fill("input#user-name", users.username);
            await page.fill("input#password", users.password);
            await page.click("input#login-button");
            await page.waitForSelector("#header_container .title");
            const title = await page.textContent("#header_container .title");
            console.log(`Username: ${users.user}`);
            console.log(`Password: ${users.password}`);
            console.log(`Expected Title: ${users.expectedTitle}`);
            console.log(`===========================\n`);
        })
    }
})