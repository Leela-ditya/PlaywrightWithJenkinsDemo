import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30 * 1000,
  reporter: [
    ['html', { outputFile: 'html-report', open:'on-failure'}],
    ['json', {  outputFile: 'playwright-report/json-report.json' }],
    ['junit', { outputFile: 'playwright-report/junit-report.xml' }],
    ['github'],
    // ['allure-playwright'],
    // ["list"],
    // ["dot"],
  ],
  
  use: {
    trace: "on-first-retry",
    screenshot: 'only-on-failure',
    // video: 'retain-on-failure',
    testIdAttribute: "data-testid",
  },

  projects: [
    {
      name: "chromium",
      use: { 
        // ...devices["Desktop Chrome"],
        browserName: 'chromium',
        viewport: null,
        launchOptions: {
          args : ['--start-maximized'],
         }
      },
     
    },

    {
      name: "firefox",
      use: {  ...devices["Desktop Firefox"]}
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ]

   });
