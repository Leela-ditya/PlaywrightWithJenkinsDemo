import {test} from '@playwright/test';
import {LoginPage} from '../LenderPages/LoginPage';
import { DashboardPage } from '../LenderPages/DashboardPage';

test('Navigate to Lender Price Website', async({page})=>{

    const loginPage = new LoginPage(page);
    await loginPage.navigateToURL();
    await loginPage.loginData();

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.CommitmentsPriceOffered();
})

