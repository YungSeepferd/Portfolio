import { test } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

const PAGES = ['/', '/about'];

test.describe('Accessibility (axe) on key pages', () => {
  for (const path of PAGES) {
    test(`axe on ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'networkidle' });
      await injectAxe(page);
      await checkA11y(page, undefined, {
        detailedReport: true,
        detailedReportOptions: { html: true },
      });
    });
  }
});
