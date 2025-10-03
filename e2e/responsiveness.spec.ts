import { test, expect, devices } from '@playwright/test';
import { VIEWPORTS, EMULATED_DEVICES, THEMES, MOTION_PREFS } from './helpers/devices';

test.describe('Responsive layout matrix', () => {
  for (const vp of VIEWPORTS) {
    for (const theme of THEMES) {
      for (const motion of MOTION_PREFS) {
        test(`${vp.name} | ${theme} | motion:${motion.includes('reduce') ? 'reduce' : 'normal'}`, async ({ page }) => {
          await page.emulateMedia({ colorScheme: theme as 'light' | 'dark', reducedMotion: motion.includes('reduce') ? 'reduce' : 'no-preference' });
          await page.setViewportSize({ width: vp.width, height: vp.height });
          await page.goto('/', { waitUntil: 'networkidle' });

          const hasHScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
          expect(hasHScroll).toBeFalsy();

          await expect(page.getByRole('banner')).toBeVisible();
          await expect(page.getByRole('main')).toBeVisible();
          await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
          await expect(page.getByRole('button', { name: /contact|get in touch|book/i })).toBeVisible();

          const cards = page.locator('[data-testid^="project-card"]');
          await expect(cards.first()).toBeVisible();

          await page.screenshot({ path: `./artifacts/responsive/${vp.name}-${theme}-${motion.includes('reduce') ? 'rm' : 'nm'}.png`, fullPage: true });
        });
      }
    }
  }
});

test.describe('Real devices smoke', () => {
  for (const d of EMULATED_DEVICES) {
    test.use({ ...devices[d] });
    test(`smoke on ${d}`, async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });
      await expect(page.getByRole('main')).toBeVisible();
      // Navigate to Projects and open a modal if present
      const projectsNav = page.getByRole('link', { name: /projects|work/i }).first();
      if (await projectsNav.isVisible()) await projectsNav.click();
      const dialog = page.getByRole('dialog');
      if (await dialog.count()) {
        await expect(dialog).toBeVisible();
      }
      await page.screenshot({ path: `./artifacts/devices/${d.replace(/\s+/g, '-')}.png`, fullPage: true });
    });
  }
});
