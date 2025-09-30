import {test, expect} from '@playwright/test';
import path from 'path';
import { readExcelFile } from '../utilis/readExcelFile';

const filePath = path.join(__dirname, 'utilis/TestData.xlsx');
const records = readExcelFile(filePath);

for(const record of records){
    test(`Testing with Excel data: ${record.Skill1} and ${record.Skill2}`, async ({page})=>{
        // Go to the url
        await page.goto('https://www.google.com/');

        // Type in the search box
        await page.getByLabel('Search', {exact: true}).fill(record.Skill1);
        await page.getByLabel('Search', {exact: true}).press('Enter');

        // click on playlist
        await page.getByRole('link', {name: record.Skill1}).first().click();

        // validate web page title
        await expect(page).toHaveTitle(record.Skill2 + ' - Youtube');
    });
}


