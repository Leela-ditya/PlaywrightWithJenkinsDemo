import {test} from "@playwright/test";
import { GetByRoleLocators } from "../pages/DemoWebsitePages/GetByRoleLocators";
import { GetByTextLocators } from "../pages/DemoWebsitePages/GetByTextLocators";
import { GetByLabelLocators } from "../pages/DemoWebsitePages/GetByLabelLocators";
import { GetByPlaceholderLocaters } from "../pages/DemoWebsitePages/GetByPlaceholderLocaters";
import { GetByAltTextLocators } from "../pages/DemoWebsitePages/GetByAltTextLocators";
import { GetByTitleLocators } from "../pages/DemoWebsitePages/GetByTitleLocators";
import { GetByTestIdLocators } from "../pages/DemoWebsitePages/GetByTestIdLocators";
import { File } from "../pages/DemoWebsitePages/File";
import { StaticTable } from "../pages/DemoWebsitePages/StaticTable";
import { DynamicTable } from "../pages/DemoWebsitePages/DynamicTable";
import { PaginationWebTable } from "../pages/DemoWebsitePages/PaginationWebTable";
import { FormandShadowDOM } from "../pages/DemoWebsitePages/FormandShadowDOM";
import { Tabs } from "../pages/DemoWebsitePages/Tabs";

test.beforeEach('GotoURL "Automation Testing Practice" for each test', async ({page})=>{
    const openGivenURL = new GetByRoleLocators(page);
    await openGivenURL.gotoURL();
});

test('Playwright built-in locators getByRole',{tag : ['@getByRoleMethod']}, async({page})=> {
    
    const getByRoleSection = new GetByRoleLocators(page);
    await getByRoleSection.getByRoleLocator("Paarivel Kannan");
    
});

test('Playwright built-in locators getByText',{tag : ['@builtInLocatorsMethod']}, async({page})=> {
    
    const getByTextSection = new GetByTextLocators(page);
    await getByTextSection.getByTextLocator();
    
});

test('Playwright built-in locators getByLabel',{tag : ['@builtInLocatorsMethod']}, async({page})=> {
    
    const getByLabelSection = new GetByLabelLocators(page);
    await getByLabelSection.formControls('Kannan@gmail.com', 'Kanna@1234', 25);
    
});

test('Playwright built-in locators getByPlaceholder',{tag : ['@builtInLocatorsMethod']}, async({page})=> {
    
    const getByPlaceholderSection = new GetByPlaceholderLocaters(page);
    await getByPlaceholderSection.getByPlaceholder("Paarival Kannan", 635124789, "Welcome to the Playwright Learning", "Playwright Documentation"); 
});

test('Playwright built-in locators getByAltText',{tag : ['@builtInLocatorsMethod']}, async({page})=> {
    
    const getByAltTextSection = new GetByAltTextLocators(page);
    await getByAltTextSection.getByAltText();
});

test('Playwright built-in locators getByTitle',{tag : ['@builtInLocatorsMethod']}, async({page})=> {
    
    const getByTitleSection = new GetByTitleLocators(page);
    await getByTitleSection.getByTitle();

});

test('Playwright built-in locators GetByTestIdLocators',{tag : ['@builtInLocatorsMethod']}, async({page})=> {
    
   const data_testid = new GetByTestIdLocators(page);
    await data_testid.dataTestId();
    
});

test('Files uploading test',{tag:['@FilesUploading']}, async({page})=> {
    const FileActions = new File(page);
    await FileActions.FileInput();
})

test('Static Table',{tag: ['@StaticTable']}, async({page})=> {

    const table = new StaticTable(page);
    await table.verifyTableName();
    await table.verifyTableHeaders();
    await table.verify3RowData();
    await table.collectTableData();
})

test('Dynamic Table', async({page})=> {

    const table = new DynamicTable(page);
    await table.verifyTableName();
    await table.verifyTableHeaders();
    await table.verifyTableRows();

    console.log("table data 4 : ",await page.locator('//table[@id="taskTable"]/tbody[@id="rows"]/tr[1]/td[4]').innerText());
})

test('Pagination Web Table', async({page})=> {
    const table = new PaginationWebTable(page);
    await table.verifyTableName();
    await table.verifyTableHeading();
    await table.collectTableData();
})

test('Form and ShadowDOM', async({page})=> {
    const formandShadowDOM = await new FormandShadowDOM(page);
    await formandShadowDOM.verifyFormSection();
    await formandShadowDOM.verifyFooterLinksSection();
    await formandShadowDOM.verifyshadowDomSection();
})

test('Tabs section test', async({page})=> {
    const tabs = new Tabs(page);
    await tabs.searchField('Playwright');
    await tabs.dynamicButton();
    await tabs.alertsAndPopups();
    await tabs.newTab();
    await tabs.mouseHover();
    await tabs.doubleClick()
    await tabs.dragAndDrop();
    await tabs.slider();
    await tabs.svgElements();
    await tabs.scrollingDropdown();
    await tabs.labelsAndLinks();
    await tabs.brokenLinks();
    await tabs.visitors();
    await tabs.popupWindow();
})

