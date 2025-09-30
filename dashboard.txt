import { Locator, type Page, expect } from '@playwright/test';
import ExcelJS from 'exceljs';

export class DashboardPage {
    readonly page: Page;
    readonly loanDetails_Popup: Locator;
    readonly locators: Record<string, any>;

    constructor(page: Page) {
        this.page = page;
        this.loanDetails_Popup = page.locator('//app-common-modal[@class="component-host-scrollable"]');
        this.locators = {
            bidRequest: page.getByRole('link', { name: 'Bid Requests' }),
            commitments: page.getByRole('button', { name: 'Commitments' }),
            priceOffered: page.getByLabel('Price Offered', { exact: true }),
            priceOffered_Heading: page.getByRole('heading', { name: 'Price Offered' }),
            priceOffered_Pages: page.locator('//span[@aria-live="polite" and contains(text(),"Page 1 of ")]'),
            nextPageArrow: page.getByLabel('Go to Next Page', { exact: true }),
            committedStatus: page.getByLabel('Status: Committed', { exact: true }),
            committedStatus_BidRequestId: page.locator('//div[@aria-label="Status: Committed"]//span[normalize-space(text()="Committed")]/../../../td[@data-title="Bid Req. ID"]/a'),
            priceOffered_BidRequestId_Heading: page.locator('//div[text()="Bid Req. ID"]/following-sibling::h5'),
            bidLoanNumber: page.locator('//div[text()="Bid Loan Number"]/following-sibling::h5'),
            allLoans: page.getByText('All Loans', { exact: true }).first(),
            lockedLoans: page.locator('//span[contains(@class,"fa fas fa-lock lock-icon")]/../following-sibling::td[@data-title="Corr. Loan#"]/div').first(),
            loanDetails_ValueColumn: page.locator('//app-common-modal[@class="component-host-scrollable"]//div[@class="apply-grid"]/div/following-sibling::div[@class="border-bottom p-2 tr-value"]'),
            closeButton: page.locator('//app-common-modal[@class="component-host-scrollable"]//button[@aria-label="Close"]'),
            lockedCommitted_Loans: page.getByText('Locked/Committed Loans', { exact: true }).first(),
            lockedCommitted_corrLoan_Number: page.locator('//td[@data-title="Corr. Loan#"]//div//button[contains(@aria-label,"View loan details for ")]'),
        };
    }

    async CommitmentsPriceOffered() {
        await this.locators.commitments.click();
        await expect(this.locators.priceOffered).toBeVisible();
        await this.locators.priceOffered.click();
        await this.page.waitForLoadState('domcontentloaded');
        const pages = await this.locators.priceOffered_Pages.innerText();
        const pageCount = pages.split(' ')[3];

        for (let i = 0; i < Number(pageCount); i++) {
            const committedView = await this.locators.committedStatus.first();
            if (await committedView.isVisible()) {
                const bidRequestId = await this.locators.committedStatus_BidRequestId.first().innerText();
                console.log("The Bid Request Id with Committed Status is : " + bidRequestId);
                await this.locators.committedStatus_BidRequestId.first().click();
                await this.page.waitForLoadState('domcontentloaded');
                const priceOffered_BidRequestId = await this.locators.priceOffered_BidRequestId_Heading.innerText();
                console.log("The Bid Request Id in Price Offered Page is : " + priceOffered_BidRequestId);

                expect(bidRequestId).toBe(priceOffered_BidRequestId);
                await this.locators.allLoans.click();
                await this.locators.lockedLoans.click();
                const corrLoan_Number = await this.locators.lockedLoans.locator('button').first().innerText();
                console.log("The Corresponding Loan Id is : " + corrLoan_Number);

                await expect(this.loanDetails_Popup).toBeVisible();
                await expect(this.locators.bidLoanNumber).toHaveText(corrLoan_Number);

                // -------- First Loop --------
                const totalLoanDetails = await this.locators.loanDetails_ValueColumn.count();
                let loanDetails_ValueList: string[] = [];

                for (let j = 0; j < totalLoanDetails; j++) {
                    await this.locators.loanDetails_ValueColumn.nth(j).scrollIntoViewIfNeeded();
                    let loanDetails = await this.locators.loanDetails_ValueColumn.nth(j).innerText();
                    if (loanDetails === '') loanDetails = 'Null Value';
                    // console.log(`Loan Details List ${j + 1} : ` + loanDetails);
                    loanDetails_ValueList.push(loanDetails);
                }

                // Save to Excel (Price Offered All Loans)
                const workbook1 = new ExcelJS.Workbook();
                const sheet1 = workbook1.addWorksheet('PriceOfferedLoans');
                sheet1.addRow(['Index', 'LoanDetails']);
                loanDetails_ValueList.forEach((val, idx) => {
                    sheet1.addRow([idx + 1, val]);
                });
                await workbook1.xlsx.writeFile('utilis/LoanDetails_Offered.xlsx');
                console.log("✅ Loan details (Price Offered) saved to LoanDetails_Offered.xlsx");

                await this.locators.closeButton.click();
                await this.page.waitForLoadState('domcontentloaded');

                // -------- Second Loop --------
                await this.locators.lockedCommitted_Loans.click();
                await this.page.waitForLoadState('domcontentloaded');
                const corrLoan_Number_List = await this.locators.lockedCommitted_corrLoan_Number.allInnerTexts();
                console.log("Corr Loan Number List : " + corrLoan_Number_List);

                for (let m = 0; m < corrLoan_Number_List.length; m++) {
                    if (corrLoan_Number_List[m] === corrLoan_Number) {
                        await this.locators.lockedCommitted_corrLoan_Number.nth(m).click();
                        await expect(this.locators.bidLoanNumber).toHaveText(corrLoan_Number);

                        let loanDetails_ValueList_K: string[] = [];

                        for (let k = 0; k < totalLoanDetails; k++) {
                            await this.locators.loanDetails_ValueColumn.nth(k).scrollIntoViewIfNeeded();
                            let loanDetails_LockedCommitted = await this.locators.loanDetails_ValueColumn.nth(k).innerText();
                            if (loanDetails_LockedCommitted === '') loanDetails_LockedCommitted = 'Null Value';
                            // console.log(`Loan Details List K ${k + 1} : ` + loanDetails_LockedCommitted);
                            loanDetails_ValueList_K.push(loanDetails_LockedCommitted);
                        }

                        // Save to Excel (Locked Loans)
                        const workbook2 = new ExcelJS.Workbook();
                        const sheet2 = workbook2.addWorksheet('LockedLoans');
                        sheet2.addRow(['Index', 'LoanDetails']);
                        loanDetails_ValueList_K.forEach((val, idx) => {
                            sheet2.addRow([idx + 1, val]);
                        });
                        await workbook2.xlsx.writeFile('utilis/LoanDetails_Locked.xlsx');
                        console.log("✅ Loan details (Locked Loans) saved to LoanDetails_Locked.xlsx");

                        // -------- Comparison --------
                        const readWorkBook1 = new ExcelJS.Workbook();
                        await readWorkBook1.xlsx.readFile('utilis/LoanDetails_Offered.xlsx');
                        const offeredSheet = readWorkBook1.getWorksheet('PriceOfferedLoans');
                        let offeredValues: string[] = [];
                        if (offeredSheet) {
                            offeredSheet.eachRow((row, rowNum) => {
                                if (rowNum > 1) offeredValues.push(row.getCell(2).value?.toString() || 'Null Value');
                            });
                        } else {
                            throw new Error("Worksheet 'PriceOfferedLoans' not found in LoanDetails_Offered.xlsx");
                        }

                        const readWorkBook2 = new ExcelJS.Workbook();
                        await readWorkBook2.xlsx.readFile('utilis/LoanDetails_Locked.xlsx');
                        const lockedSheet = readWorkBook2.getWorksheet('LockedLoans');
                        let lockedValues: string[] = [];
                        if (lockedSheet) {
                            lockedSheet.eachRow((row, rowNum) => {
                                if (rowNum > 1) lockedValues.push(row.getCell(2).value?.toString() || 'Null Value');
                            });
                        } else {
                            throw new Error("Worksheet 'LockedLoans' not found in LoanDetails_Locked.xlsx");
                        }

                        expect(offeredValues).toEqual(lockedValues);

                        // console.log comparison result
                        console.log("✅ Loan details matched between Offered and Locked Loans!");

                        await this.locators.closeButton.click();
                    }   
                }
                 break;
            } else {
                await this.locators.nextPageArrow.click();
                await this.page.waitForLoadState('domcontentloaded');
            }
        }
    }
}