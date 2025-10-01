# E2E & CI Testing Guide (Playwright)

Last updated: 2025-10-01

## Overview
This repo uses Playwright for end-to-end testing with a responsive layout matrix and automated accessibility scans. CI runs on PRs and pushes to `main`.

## File Map
- `playwright.config.ts` – global config, auto-starts CRA dev server
- `e2e/helpers/devices.ts` – matrices for viewports, devices, themes, motion
- `e2e/responsiveness.spec.ts` – responsive matrix + real-device smoke
- `e2e/accessibility.spec.ts` – axe-playwright scans for `/` and `/about`
- `e2e/visual.spec.ts` – visual snapshots (home fold)
- `.github/workflows/e2e.yml` – CI: Playwright (artifacts uploaded)
- `.github/workflows/lighthouse.yml` – CI: Lighthouse CI

## Commands

Install (already done in repo):
```bash
npm ci
npx playwright install --with-deps
```

Run tests headless:
```bash
npm run test:pw
```

Run with UI:
```bash
npm run test:pw:ui
```

Override base URL (if your app runs on a different port):
```bash
BASE_URL=http://localhost:4000 npm run test:pw
```

## Artifacts
- HTML report: `playwright-report/`
- Screenshots, traces, videos: `artifacts/`

## Visual Snapshots
`e2e/visual.spec.ts` captures the home fold. To add snapshots for modals:
```ts
const dialog = page.getByRole('dialog');
await expect(dialog).toHaveScreenshot('project-modal.png', {
  maxDiffPixelRatio: 0.01,
  animations: 'disabled',
});
```

Tips:
- Avoid dynamic/animated regions in snapshots.
- Use data attributes to stabilize selectors if needed.

## Accessibility (axe)
`e2e/accessibility.spec.ts` injects axe and scans key pages. To add more:
```ts
const PAGES = ['/', '/about', '/projects'];
```

## Responsive Matrix
Configured in `e2e/helpers/devices.ts`:
- 6 viewports × 2 themes × 2 motion preferences
- Ensure no horizontal scrolling and fold CTA visibility

Update matrices by editing `VIEWPORTS`, `THEMES`, `MOTION_PREFS`.

## CI Workflows
- E2E: `.github/workflows/e2e.yml`
  - Node 20, installs browsers, starts dev server, runs tests
  - Uploads artifacts on failure/success
- Lighthouse: `.github/workflows/lighthouse.yml`
  - Builds, serves locally, runs Lighthouse CI (temporary storage)

## Troubleshooting
- If dev server port is busy, set `BASE_URL` and ensure the server is running there.
- On flakes related to animations, use `page.emulateMedia({ reducedMotion: 'reduce' })`.
- For CRA overlay interference, Playwright auto-waits; prefer role-based selectors.

## Conventions
- Use role-based queries (`getByRole`, `getByTestId`) consistently.
- Keep tests fast and atomic; prefer multiple small specs over one giant spec.
- Document any new matrices or flows added here.
