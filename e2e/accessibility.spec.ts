import { test } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

// NOTE: If About is an in-page section (not a route), scanning '/' is sufficient.
// TODO: Enhance to target the in-page About region via page.locator('#about').
const PAGES = ['/'];

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
