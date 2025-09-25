# AGENTS Guide

_Last updated: 18 March 2026_

This file defines the expectations for AI coding agents collaborating on the **Vincent Göke Portfolio**. Review it before making changes so your work aligns with the maintainers’ workflow, architectural constraints, and quality bar.

## 1. Mission Context

- **Tech stack**: React 18 (CRA), Material UI 5, Framer Motion, React Three Fiber + Three.js, Selenium for smoke tests.
- **Structure**: Single-page portfolio with distinct feature sections (Hero, Work, About, Contact) rendered inside `src/App.js`.
- **Design system first**: Styling is token-driven. All colours, spacing, and typography originate from `src/theme/`.
- **Data-driven content**: Project and about sections are defined via structured JS objects. Updating content almost always means editing data files rather than JSX.

## 2. Repository Orientation

| Area | Purpose | Key Notes |
| --- | --- | --- |
| `src/components/hero/` | Hero copy + interactive 3D background | Three.js scenes under `background3d/`; respect `SceneContext` transitions. |
| `src/components/work/` | Portfolio grid + modal | Use `ProjectCardImproved` and `ProjectModal`; legacy `ProjectCard` exists but is no longer wired in. |
| `src/components/about/` | Tabbed about section | Data lives in `AboutData.js`; slideshow expects `createAboutImage` payloads. |
| `src/theme/` | Design tokens and theme overrides | Update tokens first, then component overrides; keep variants consistent with docs. |
| `src/hooks/` | Shared behavioural primitives | `useDataLoader`, `useProjectModal`, etc. guard against regressions when changing signatures. |
| `tests/e2e/` | Selenium smoke suite | Requires Chrome + running dev server. Expand here instead of ad-hoc scripts. |

Consult `docs/README.md` and `docs/architecture/system-overview.md` for deeper references before coding.

## 3. Core Working Agreements

1. **Plan first**: Produce a brief plan for non-trivial tasks (>=2 steps) before editing. Re-plan if scope changes.
2. **Preserve data contracts**: When adding portfolio items or tabs, follow existing schema (`title`, `subtitle`, `pictures`, `content`, etc.). Update renderers only when necessary and document the change.
3. **Keep console clean**: Production logs were intentionally removed. Wrap any temporary debugging inside `if (process.env.NODE_ENV !== 'production')` and remove before handing off.
4. **Respect theme tokens**: Do not hard-code colours or spacing unless the design system explicitly lacks a token. Prefer `theme.palette`, `theme.spacing`, and typography scales.
5. **Touch the right component**: Only edit `ProjectCardImproved`. Leave `ProjectCard.js` unless the maintainers explicitly request its removal/refactor.
6. **3D scenes**: Optimise for performance—no heavy allocations inside `useFrame`. Cache geometry/materials in refs. Validate interaction state flows through `SceneContext`.
7. **Asset hygiene**: Optimise images/videos before adding. Flag anything >500KB. Place binaries under `src/assets/` unless they are downloadable documents (`public/assets/...`).
8. **Accessibility**: Maintain semantic headings (`h1` inside hero, `h2` per section), ARIA labels for buttons/modals, and keyboard navigation (modal arrows, close actions, nav buttons).
9. **Documentation**: Update or cross-link relevant docs (`docs/architecture/system-overview.md`, feature-specific notes) when behaviour changes.

## 4. Workflow Checklist

Before coding:
- ☐ Read the relevant docs section(s) under `docs/`.
- ☐ Inspect existing data structures and utilities for reuse (`projectUtils`, `mediaUtils`, `scrollUtils`).
- ☐ Confirm whether similar functionality already exists (search with `rg`).

While coding:
- ☐ Keep edits focused; avoid opportunistic refactors without approval.
- ☐ Use existing hooks/components rather than reimplementing patterns.
- ☐ Add concise comments only when logic is non-obvious.

After coding:
- ☐ Format and lint via CRA conventions (the project relies on Prettier defaults; respect existing style).
- ☐ Run `npm run build` to catch bundler/TypeScript regressions.
- ☐ When UI or flow changes, run `npm run test:e2e` (requires `npm start` in another terminal) or explain why it was skipped.
- ☐ Update documentation if behaviour, schemas, or workflows changed.
- ☐ Summarise the change, impacted files (with line references), tests run, and follow-up actions in your final message.

## 5. Testing Matrix

| Scenario | Command | Notes |
| --- | --- | --- |
| Build verification | `npm run build` | Required for any code change; surfaces asset path issues and TypeScript/babel errors. |
| Unit/Jest tests | `npm test -- --watch=false --passWithNoTests` | Optional until suites are added; mention if skipped. |
| End-to-end smoke | `npm run test:e2e` | Requires running `npm start` (in another terminal) and Google Chrome. Use headless mode by default. |

If a command fails due to sandbox/network limits, report the failure, why it happened, and how to rerun locally.

## 6. Common Pitfalls & Safeguards

- **Modal state**: `useProjectModal` manages sequencing and scroll reset. When modifying modal navigation, ensure scroll resets and keyboard shortcuts survive.
- **Slideshow images**: Keep `createAboutImage` payloads accurate; improper `objectPosition` values lead to cropped portraits.
- **Theme preview**: `src/pages/ThemePreviewPage.js` is a playground. Do not ship heavy dev-only tooling outside `process.env.NODE_ENV === 'development'` guards.
- **Analytics guards**: Some files call `window.gtag`. Wrap new analytics with existence checks to avoid runtime errors in development.
- **Legacy docs**: Duplicate markdown still lives under `docs/legacy/`. Validate new guidance against current files to prevent drift.

## 7. Communication Protocol

- Surface uncertainties early: if requirements conflict with existing design tokens or data schemas, summarise options and recommend next steps.
- Document skipped work (tests not run, assets not optimised) with reasons so maintainers can follow up.
- When introducing new dependencies, justify necessity and add them to documentation (`docs/project/setup.md`).

## 8. Quick Reference

- **Start dev server**: `npm start`
- **Build**: `npm run build`
- **Smoke test**: `npm run test:e2e` (with dev server running)
- **Docs hub**: `docs/README.md`
- **System map**: `docs/architecture/system-overview.md`
- **Design tokens**: `src/theme/design/tokens.js`
- **Project data**: `src/components/work/data/projects/`

Sticking to this guide keeps the portfolio maintainable and ensures AI contributions remain predictable, reviewable, and aligned with the project’s goals.
