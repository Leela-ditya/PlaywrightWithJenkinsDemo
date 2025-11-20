import * as XLSX from "xlsx";

export interface ExcelRow {
  [key: string]: any;
}

export class ExcelUtil {

  static readExcel(filePath: string, sheetName: string): ExcelRow[] {
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet, { raw: true });
  }

}
