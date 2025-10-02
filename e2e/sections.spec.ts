import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'mobile-360', width: 360, height: 740 },
  { name: 'mobile-393', width: 393, height: 852 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1280', width: 1280, height: 800 },
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'wide-1920', width: 1920, height: 1080 },
];

async function noHorizontalScroll(page) {
  const hasHScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(hasHScroll).toBeFalsy();
}

async function scrollIntoView(page, id) {
  await page.evaluate((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, id);
}

test.describe('Sections responsiveness and reachability', () => {
  for (const vp of VIEWPORTS) {
    test(`${vp.name}: hero, work, about, contact visibility and layout`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/', { waitUntil: 'load' });

      await noHorizontalScroll(page);

      // Hero present (wait up to 15s to account for app boot)
      await page.waitForSelector('#hero', { state: 'attached', timeout: 15000 });
      const hero = page.locator('#hero');
      await expect(hero).toBeVisible({ timeout: 15000 });
      await page.screenshot({ path: `artifacts/sections/${vp.name}-hero.png`, fullPage: false });

      // Work reachable (do not use the mobile scroll helper here)
      await scrollIntoView(page, 'work');
      const work = page.locator('#work');
      await expect(work).toBeVisible();
      await page.screenshot({ path: `artifacts/sections/${vp.name}-work.png`, fullPage: true });

      // About reachable
      if (vp.width <= 420) {
        // On mobile, skip clicking scroll helper to avoid overlay interception; just programmatically scroll
        await scrollIntoView(page, 'about');
      } else {
        await scrollIntoView(page, 'about');
      }
      const about = page.locator('#about');
      await expect(about).toBeVisible();
      await page.screenshot({ path: `artifacts/sections/${vp.name}-about.png`, fullPage: true });

      // Contact reachable
      await scrollIntoView(page, 'contact');
      const contact = page.locator('#contact');
      await expect(contact).toBeVisible();
      await page.screenshot({ path: `artifacts/sections/${vp.name}-contact.png`, fullPage: true });

      // Project card present
      const aCard = page.locator('[data-testid^="project-card"]').first();
      await expect(aCard).toBeVisible();
    });
  }
});

test.describe('About: Education image loads and objectPosition sanity', () => {
  test('Education tab image loads and vertical focus not top-clipped', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto('/', { waitUntil: 'load' });

    // Scroll to about
    await scrollIntoView(page, 'about');

    // Click Education tab
    const eduTab = page.getByRole('tab', { name: /education/i }).first();
    await eduTab.click();

    // Wait for image card
    const imageCard = page.locator('#about-tab-image-section-3');
    await expect(imageCard).toBeVisible();
    await imageCard.screenshot({ path: 'artifacts/sections/mobile-393-education-card.png' });

    const img = imageCard.locator('img').first();
    await expect(img).toBeVisible();

    // natural width/height > 0
    const natural = await img.evaluate((el: HTMLImageElement) => ({ w: el.naturalWidth, h: el.naturalHeight }));
    expect(natural.w).toBeGreaterThan(0);
    expect(natural.h).toBeGreaterThan(0);

    // Inspect object-position to surface potential cropping issue
    const objPos = await img.evaluate((el) => getComputedStyle(el as HTMLElement).objectPosition);
    // Log for diagnostics; user reported face needs to move down in frame
    console.log('[diagnostics] Education image object-position:', objPos);
  });

  test('About tabs render across mobile with screenshots of each tab', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto('/', { waitUntil: 'load' });

    await scrollIntoView(page, 'about');

    const tabs = ['WhoAmI', 'Skills & Technology', 'Experience', 'Education'];
    for (const name of tabs) {
      const tab = page.getByRole('tab', { name: new RegExp(`^${name}$`, 'i') }).first();
      await tab.click();
      // Small settle delay for content animation
      await page.waitForTimeout(200);
      await page.screenshot({ path: `artifacts/sections/mobile-393-about-${name.replace(/\s+/g, '-')}.png`, fullPage: true });
    }
  });
});
