import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Portfolio Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Portfolio/);
  });

  test('should have no accessibility violations', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('navigation menu works correctly', async ({ page }) => {
    // Check if navigation links are visible
    await expect(page.getByRole('link', { name: /work/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /contact/i })).toBeVisible();

    // Click work link and verify URL
    await page.getByRole('link', { name: /work/i }).click();
    await expect(page).toHaveURL(/.*work/);
  });

  test('projects load with images', async ({ page }) => {
    await page.getByRole('link', { name: /work/i }).click();
    
    // Wait for project images to load
    await expect(page.locator('img[alt*="project"]')).toBeVisible();
    
    // Check if images are actually loaded (no broken images)
    const brokenImages = await page.evaluate(() => {
      const images = document.getElementsByTagName('img');
      const broken = [];
      for (const img of images) {
        if (!img.complete || img.naturalWidth === 0) {
          broken.push(img.alt || img.src);
        }
      }
      return broken;
    });
    
    expect(brokenImages).toHaveLength(0);
  });

  test('theme toggle works', async ({ page }) => {
    // Get initial theme
    const initialTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    });

    // Click theme toggle
    await page.getByRole('button', { name: /toggle theme/i }).click();

    // Verify theme changed
    const newTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    });

    expect(newTheme).not.toBe(initialTheme);
  });

  test('contact form validation works', async ({ page }) => {
    await page.getByRole('link', { name: /contact/i }).click();
    
    // Try to submit empty form
    await page.getByRole('button', { name: /send/i }).click();
    
    // Check for validation messages
    await expect(page.getByText(/name is required/i)).toBeVisible();
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/message is required/i)).toBeVisible();
  });
});
