---
description: 
auto_execution_mode: 1
---

Goal: Refactor a small component or utility (React or JS) to improve clarity without changing behaviour and add or expand tests.

Context:

Code: src/components (React functional components), src/utils (helper functions), src/hooks (custom hooks).

Tests: tests/e2e/smoke.test.js provides a Selenium smoke suite; unit tests are minimal and may need to be created
github.com
.

Docs: docs/development/next-steps.md identifies areas of complexity (e.g., mediaUtils.js, project modal logic)
github.com
.

Guidelines: Follow the core working agreements in AGENTS.md (preserve public APIs, respect design tokens, plan first)
github.com
.

Constraints:

Maintain existing APIs: Do not alter function signatures or component props; behaviour must remain identical. Add tests first when possible.

React only: Use Selenium and @testing-library/react
 for component tests. For pure functions, use a clickthrough flow for Selenium.

No new dependencies: Do not add testing libraries beyond what is in devDependencies.

Small scope: Choose a file roughly ≤200 LOC and limit refactoring to readability, naming, and small extractions.

Documentation: Summarise changes and their rationale in a dedicated notes file.

Tasks:

Identify target file: Using docs/development/next-steps.md as a guide, choose one component or util that would benefit from clearer structure (e.g., consolidate conditions, extract helpers). Explain why you selected it and ensure it is self‑contained (avoid cross‑cutting refactors).

Write/extend tests:

If the target is a React component, create a test file under src/__tests__/ or tests/components/ using Jest and React Testing Library. Cover rendering under different props and verify accessibility attributes (e.g., alt text, ARIA labels).

If the target is a utility, create a *.test.js in the same folder or tests/utils/ with table‑driven cases.

For each new test, assert both positive and negative scenarios. Use subtests (Jest describe blocks) for clarity.

Refactor: Make incremental changes: rename variables for clarity, extract repeated logic into helper functions, split long functions into smaller units, or simplify conditionals. Keep behaviour identical and verify with tests after each change.

Run:

Execute unit tests: npm test -- --watch=false --passWithNoTests (this runs Jest).

Build the app: npm run build to ensure no bundler errors.

Optionally run the smoke suite: npm run test:e2e (requires dev server) to ensure integration isn’t broken.

Document: Append a “Refactor Notes” section to docs/development/refactor-notes.md (create if missing) summarising:

Which file was refactored and why.

Key code changes (before/after snapshots).

New or updated tests and their coverage.

Any follow‑up work discovered (e.g., deeper refactor needed, additional tests).

Deliverables:

The new or updated test files and code diffs for the chosen module.

Output from npm test, npm run build, and optionally npm run test:e2e confirming green runs.

An updated refactor-notes.md summarising the effort and any open questions for maintainers.