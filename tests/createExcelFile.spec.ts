import {test, expect} from '@playwright/test';
import { TableExcelPractice } from '../pages/DemoWebsitePages/TableExcelPractice';

test('Create Excel File', async({page})=>{
    const excelPractice = new TableExcelPractice(page);
    await excelPractice.gotoURL();

    // static table data export to excel
    await excelPractice.collectTableDataAndExportToExcel();

})