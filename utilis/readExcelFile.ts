// import xlsx
import * as Excel from 'xlsx';
import * as fs from 'fs';

// Define test data structure
interface TestRecord {
    Skill1 : string;
    Skill2 : string;
}

// Create method to read data from Excel file
export function readExcelFile(filePath: string){

    // Read the Excel file as binary string
    const file = fs.readFileSync(filePath);

    // parse into workbook
    const workbook = Excel.read(file, { type: 'buffer' });

    // Get the first sheet name
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert sheet to JSON
    const rawData: any[] = Excel.utils.sheet_to_json(sheet, {header: 1});

    // convert rawData into TestRecord
    const records = rawData.slice(1).map((column : any[])=> ({
        Skill1 : column[0],
        Skill2 : column[1],
    }));
    return records;

    // Log the data to console
    console.log(rawData);


}