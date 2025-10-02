import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'artifacts', 'perf');

async function ensureDir(dir: string) {
  await fs.promises.mkdir(dir, { recursive: true });
}

test.describe('Performance metrics', () => {
  test('navigation timing and paint metrics (mobile-393)', async ({ page, browserName }) => {
    await ensureDir(OUT_DIR);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto('/', { waitUntil: 'load' });

    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      const paints = performance.getEntriesByType('paint') as PerformanceEntry[];
      const fcp = paints.find(p => p.name === 'first-contentful-paint')?.startTime ?? null;
      const fp = paints.find(p => p.name === 'first-paint')?.startTime ?? null;
      return {
        url: location.href,
        timeOrigin: performance.timeOrigin,
        navigation: nav ? {
          domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
          loadEvent: nav.loadEventEnd - nav.startTime,
          response: nav.responseEnd - nav.requestStart,
          domInteractive: nav.domInteractive - nav.startTime,
          transferSize: (nav as any).transferSize ?? null,
          encodedBodySize: (nav as any).encodedBodySize ?? null,
          decodedBodySize: (nav as any).decodedBodySize ?? null,
        } : null,
        paints: { firstPaint: fp, firstContentfulPaint: fcp },
        resources: performance.getEntriesByType('resource').length,
      };
    });

    const file = path.join(OUT_DIR, `perf-${browserName}-mobile-393.json`);
    await fs.promises.writeFile(file, JSON.stringify(metrics, null, 2), 'utf8');

    // Basic sanity checks
    if (metrics.navigation) {
      expect(metrics.navigation.loadEvent).toBeGreaterThan(0);
    }
  });
});
