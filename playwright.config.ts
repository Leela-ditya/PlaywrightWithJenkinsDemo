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
    ['html', { 
      outputFolder: 'playwright-report',
      open: "always"
    }],
    // ['json', { 
    //   outputFile: 'playwright-report/json-results.json' 
    // }],
    // ['junit', { 
    //   outputFile: 'playwright-report/junit-results.xml' 
    // }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false
    }]
  ],
  
  use: {
    testIdAttribute: "data-testid",
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    headless: true,
  },

  projects: [
    {
      name: "chromium",
      use: { 
        ...devices["Desktop Chrome"],
          viewport: { width: 1920, height: 1080 }
        // browserName: 'chromium',
        // viewport: null,
        // launchOptions: {
        //   args : ['--start-maximized'],
        //  }
      },
     
    },

    {
      name: "firefox",
      use: {  ...devices["Desktop Firefox"],
        viewport: { width: 1920, height: 1080 }
      }
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"],
        viewport: { width: 1920, height: 1080 }
       },
    },
  ]

   });


