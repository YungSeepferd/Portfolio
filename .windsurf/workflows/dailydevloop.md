---
description: 
auto_execution_mode: 3
---

Goal: Implement a small feature or fix in the Vincent Göke Portfolio end‑to‑end today.

Context:

Repo: this workspace (React 18 + MUI + React Three Fiber).

Code: src/components for UI sections (hero, work, about, contact), src/theme for design tokens, src/hooks for shared behaviour, src/utils for helpers, and tests/e2e for smoke tests
github.com
.

Docs: Read docs/README.md for structure, docs/development/next-steps.md for current priorities, and the design system docs (docs/design-system/overview.md, src/docs/DesignSystem.md)
github.com
.

Guide: Follow the working agreements in AGENTS.md (plan first, preserve data contracts, respect theme tokens, etc.)
github.com
.

Constraints:

No new dependencies: stick to React, MUI, Framer Motion and React Three Fiber; do not add packages without justification
github.com
.

Design‑system first: never hard‑code colours, spacing or typography. Use tokens from src/theme/ and MUI’s sx prop
github.com
.

Keep changes minimal: focus only on the chosen feature; do not refactor unrelated code
github.com
.

Preserve data contracts: when editing project or about data, follow existing schema (title, subtitle, content, etc.)
github.com
.

Clean console: do not leave console logs in production code
github.com
.

Tasks:

Plan: Review relevant docs (see above) and identify a small change (e.g., fix navigation bug, tweak design token, add a missing project link). Write a five‑bullet task plan in a dated notes file (e.g. docs/development/daily-notes/{{today}}.md; create if missing). The plan should list the files to touch and expected outputs.

Implement: Make the targeted change with explicit file diffs. Respect the design tokens and context agreements. Avoid touching unrelated components (see AGENTS.md for which components are safe to modify).

Test:

Start the dev server: npm start and ensure no runtime or console errors.

If your change affects behaviour or utilities, run unit tests via npm test -- --watch=false --passWithNoTests (there may be few tests; note if skipped).

Run the production build with npm run build to catch bundler errors.

Run the smoke suite with npm run test:e2e if functionality changed (requires a running dev server); explain why it was skipped if unable to execute
github.com
.

Verify UX: In the browser, inspect the change at 360 px (mobile) and desktop widths; toggle dark/light themes; test keyboard navigation and 3D interactions in the hero or work sections to ensure performance and accessibility
github.com
.

Update docs: In your dated notes file, append a “What changed / Next steps” section summarising your edits, tests run, remaining issues, and links to any updated docs.

Deliverables:

A diff summarising changed files and lines.

The dated notes file with your plan and notes.

A short acceptance checklist confirming: dev server runs cleanly, build succeeds, tests pass (or are absent), UX remains responsive, and docs updated.