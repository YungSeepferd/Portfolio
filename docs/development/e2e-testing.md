# End-to-End Testing Guide

Last updated: September 30, 2025

## Purpose

- Ensure the portfolio’s critical flows (open modal, navigate sections, close modal) work across environments.
- Provide reproducible steps for local and CI runs.

## Prerequisites

- Node 18+
- Google Chrome installed (Chromedriver is managed via devDependencies)
- Dev server available on http://localhost:3000

## Running locally

1. Start the dev server (terminal 1):
   ```bash
   npm start
   ```
2. Run the E2E suite (terminal 2):
   ```bash
   npm run test:e2e
   ```

- Suites live under `tests/e2e/`:
  - `smoke.test.js` (Selenium/WebDriver)
  - `modal-design-review.test.js`
  - `modal-design-qa.test.js`
  - `puppeteer-modal-screenshots.js` (auxiliary screenshots helper)

## Headless/CI configuration

- Selenium runs headless by default when `CI=true` is set in the environment.
- For GitHub Actions, ensure Chrome is available (ubuntu images include it).
- If needed, pass Chrome options in the WebDriver builder within the test files.

## Troubleshooting

- Chrome/Chromedriver mismatch:
  - Update devDependencies: `selenium-webdriver`, `chromedriver`.
  - Clear node modules and reinstall if persistent (`rm -rf node_modules && npm ci`).
- Dev overlay or scroll interference:
  - See `docs/development/daily-notes/2025-09-29-scroll-fixes.md`.
  - The About scroll-spy was stabilized (sticky header offsets, no hash navigation).
- Port conflicts:
  - If port 3000 is taken, set `PORT=3001 npm start` and update tests’ base URL accordingly.

## Adding a new smoke test

- Place under `tests/e2e/`.
- Recommended structure:
  ```js
  const { Builder, By, until } = require('selenium-webdriver');

  describe('New flow', () => {
    let driver;

    beforeAll(async () => {
      driver = await new Builder().forBrowser('chrome').build();
    }, 30000);

    afterAll(async () => {
      if (driver) await driver.quit();
    });

    test('opens first project modal', async () => {
      await driver.get('http://localhost:3000');
      // navigate and assert...
    }, 60000);
  });
  ```

## References

- `tests/e2e/smoke.test.js` for the base setup
- `tests/e2e/modal-design-review.test.js` for interaction patterns
- `docs/development/daily-notes/2025-09-29-scroll-fixes.md` for scroll/navigation behavior
