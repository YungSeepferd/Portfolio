import { test, expect } from '@playwright/test';

test.describe('Visual regression tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage visual regression', async ({ page }) => {
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      animations: 'disabled',
      mask: [page.locator('time'), page.locator('[data-testid="dynamic-content"]')],
    });
  });

  test('project page visual regression', async ({ page }) => {
    await page.getByRole('link', { name: /work/i }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('projects.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('dark theme visual regression', async ({ page }) => {
    // Switch to dark theme
    await page.getByRole('button', { name: /toggle theme/i }).click();
    await page.waitForTimeout(500); // Wait for animations
    
    await expect(page).toHaveScreenshot('homepage-dark.png', {
      fullPage: true,
      animations: 'disabled',
      mask: [page.locator('time'), page.locator('[data-testid="dynamic-content"]')],
    });
  });
});
