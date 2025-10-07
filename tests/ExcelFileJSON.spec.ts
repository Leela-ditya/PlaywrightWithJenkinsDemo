import {test, expect} from "@playwright/test";
import * as xlsx from "xlsx";
import path, { parse } from "path";

const jsonData = [{
    "name": "Harish",
    "email": "harish@gmail.com",
    "phone": "1234567809"}
]

test('JSON to Excel', async () => {
    
async function writeExcelFile(filePath: string = 'utilis/excelData.xlsx') {

    const worksheet = xlsx.utils.json_to_sheet(jsonData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    xlsx.writeFile(workbook, filePath)
}

writeExcelFile();

const readFile = xlsx.readFile('utilis/excelData.xlsx');
const sheetName = readFile.SheetNames[0];
const sheet = readFile.Sheets[sheetName];
const excelData = xlsx.utils.sheet_to_json(sheet);
console.log(excelData);
});