import { test, expect } from "allure-playwright";

test('Amazon scroll to next item', async ({ page }) => {
  await page.goto('https://www.amazon.com/', { waitUntil: 'domcontentloaded' });

  // Search for "pen"
  const searchBox = await page.locator('//input[@id="twotabsearchtextbox"]');
  await searchBox.fill('pen');
  await page.keyboard.press('Enter');

  await page.waitForSelector('div.s-main-slot div[data-component-type="s-search-result"]', { timeout: 15000 });

  let pageCount = 1;

  while (true) {
    // Scroll to bottom to load lazy elements
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);

    // Try locating the "Next" button
    const nextButton = page.locator('a.s-pagination-next, li.a-last a');

    if (await nextButton.count() > 0 && await nextButton.isVisible()) {
      console.log('Next button not found. Stopping pagination.');
      break;
    }

    const isDisabled = await nextButton.getAttribute('aria-disabled');
    if (isDisabled === 'true') {
      console.log('Reached the last page. Stopping.');
      break;
    }

    console.log(`Navigating to page ${pageCount + 1}...`);
    await nextButton.scrollIntoViewIfNeeded();
    await nextButton.click({ force: true });

    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('div.s-main-slot div[data-component-type="s-search-result"]', { timeout: 10000 });

    pageCount++;
  }

  console.log(`✅ Pagination completed. Total pages navigated: ${pageCount}`);
});
