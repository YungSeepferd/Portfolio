---
description: 
auto_execution_mode: 3
---

Goal: Refresh and validate our official references and ensure the portfolio code aligns with current documentation.

Context:

Resources file: docs/resources/links.md contains references to React Three Fiber, Drei, Material‑UI, React, and deployment resources
github.com
.

Design system: See docs/design-system/overview.md and src/theme/ for token guidelines and component patterns
github.com
.

Architecture: docs/README.md, docs/architecture/system-overview.md, and docs/development/next-steps.md give an overview of the project structure and pending work
github.com
.

Policy: Follow the documentation guidelines in docs/README.md (update “Last updated” dates, cross‑reference related docs)
github.com
.

Constraints:

Prefer official, stable documentation sources for React 18, MUI 5, React Three Fiber and Drei. Avoid blogs or SEO sites.

Keep docs/resources/links.md concise: use headings and bullet lists; provide only canonical links and brief notes
github.com
.

Do not remove sections that correspond to technologies still used in the portfolio (e.g. Drei performance monitor notes)
github.com
.

Update the “Last Updated” date at the bottom of edited files.

File additional findings in docs/development/next-steps.md instead of making sweeping code changes.

Tasks:

Review docs/resources/links.md:

Verify each section (Three.js/R3F, Drei, MUI, React, development tools, deployment) against the latest official documentation. Replace outdated or broken URLs with stable links.

Add missing categories if the portfolio now depends on other libraries (e.g., Framer Motion, Selenium, Cypress). Provide a couple of bullet points summarising each library’s role in the project
github.com
.

Remove duplicated links and collapse redundant notes (e.g., merge stats.js references with Drei performance monitor notes).

Add a “How to Use the Docs” snippet: Insert a short section near the top of links.md describing how contributors should navigate the docs. Mention docs/README.md as the hub, search functions in editors, and cross‑linking practices (e.g., using relative links and section anchors).

File a TODO list: In docs/development/next-steps.md (or create docs/development/docs-follow-ups.md), document gaps or inconsistencies found during the sweep. Suggest 3–5 concrete tasks, such as:

Write a guideline for adding new 3D scenes and linking them via SceneContext.

Update design system docs to cover new tokens or component patterns.

Create a page about the E2E testing setup and how to run npm run test:e2e.

Add missing API usage examples (e.g., hooking Framer Motion into project modals).

Remove or archive any legacy docs discovered in docs/legacy/ that are no longer referenced
github.com
.

Deliverables:

A cleaned‑up docs/resources/links.md with updated links, a new “How to Use the Docs” section, and an updated “Last updated” date.

An updated next-steps.md (or new docs-follow-ups.md) containing a list of documentation tasks for future sprints.

A brief summary of changes made and any unresolved questions noted in your final message.