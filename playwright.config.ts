import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30 * 1000,
  reporter: [
    // ["list"],
    // ["dot"],
    // ['json', { outputFile: 'json-test-report.json' }],
    // ['junit', { outputFile: 'junit-test-report.xml' }],
    ['html', { outputFolder: 'playwright-html-report', open:'always'}],
    ['github'],
    // ['allure-playwright'],
  ],
  use: {
    trace: "on-first-retry",
    screenshot: 'only-on-failure',
    // video: 'retain-on-failure',
    testIdAttribute: "data-testid",
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
