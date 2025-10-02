import { test } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

// Basic accessibility audit for the home page
// Scans entire document; consider narrowing to specific regions if needed later

test.describe('Accessibility (axe) - home', () => {
  test('axe on /', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    await injectAxe(page);
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  });
});
