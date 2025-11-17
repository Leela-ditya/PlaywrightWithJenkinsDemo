import {test} from '@playwright/test';
import {LoginPage} from '../pages/LenderPages/LoginPage';
import { DashboardPage } from '../pages/LenderPages/DashboardPage';

test('Navigate to Lender Price Website',{tag: ['@lenderPrice']}, async({page})=>{

    const loginPage = new LoginPage(page);
    await loginPage.navigateToURL();
    await loginPage.loginData();

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.CommitmentsPriceOffered();
})

 

