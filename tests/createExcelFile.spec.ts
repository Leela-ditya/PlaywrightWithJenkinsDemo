import {test, expect} from '@playwright/test';
import { TableExcelPractice } from '../pages/TableExcelPractice';

test('Create Excel File', async({page})=>{
    const excelPractice = new TableExcelPractice(page);
    await excelPractice.gotoURL();
    await excelPractice.verifyTableName();
    await excelPractice.verifyTableHeaders();
    await excelPractice.verify3RowData();

    // static table data export to excel
    await excelPractice.collectTableDataAndExportToExcel();

})