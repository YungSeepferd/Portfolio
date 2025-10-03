import { test, expect } from '@playwright/test';

// Note: Keep dynamic regions out of snapshots (animations/time-dependent areas)
// Consider adding data attributes to stabilize specific regions when needed.

test.describe('Visual snapshots', () => {
  test('home fold', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const main = page.getByRole('main');
    await expect(main).toBeVisible();
    await expect(main).toHaveScreenshot('home-fold.png', {
      // Keep diffs strict, but allow tiny anti-aliasing differences
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
    });
  });
});
