import { type Page, type Locator, expect } from "@playwright/test";

export class File{
    readonly page: Page;
    readonly locators: Record<string, Locator>;

    constructor(page:Page){
        this.page = page;
        this.locators = {
            uploadSingleFile : this.page.locator("#singleFileInput"),
            singleFileBtn : this.page.getByRole("button", {name: "Upload Single File"}),
            singleFileStatus: this.page.locator("#singleFileStatus"),
            uploadMultipleFile : this.page.locator("#multipleFilesInput"),
            multipleFileBtn : this.page.getByRole("button", {name: "Upload Multiple Files"}),
            multipleFilesStatus : this.page.locator("p#multipleFilesStatus"), 
        }
    }   

    async FileInput(){
        await this.locators.uploadSingleFile.click();
        await this.locators.uploadSingleFile.setInputFiles("./tests/files/playwrightnotes.txt");
        await this.locators.singleFileBtn.click();
        const singleFileStatusTxt = await this.locators.singleFileStatus.innerText();
        console.log(singleFileStatusTxt)
        expect(singleFileStatusTxt).toContain("Single file selected");

        await this.locators.uploadMultipleFile.click();
        await this.locators.uploadMultipleFile.setInputFiles(["./tests/files/playwrightnotes.txt", "D:/playwright notes.txt", "C:/Users/leela/OneDrive/Desktop/PWCode/playwright/notes.txt"]);
        await this.locators.multipleFileBtn.click();
        const multipleFilesStatusTxt = await this.locators.multipleFilesStatus.innerText();
        console.log(multipleFilesStatusTxt)
        expect(multipleFilesStatusTxt).toContain('Multiple files selected');
     }
}


