# Documentation Follow-ups

_Created: September 30, 2025_  
_Status: Active tracking document_

This file captures documentation tasks and improvements identified during the comprehensive docs sweep on September 30, 2025.

## High Priority

### 1. Dependency Cleanup Documentation
**Priority**: High  
**Effort**: Medium

- Create migration guide for removing styled-components from `animations.js`
- Document GSAP removal process (currently unused but in package.json)
- Clarify react-bits status: remove or integrate per design system plan
- Update `package.json` and create changelog entry for dependency changes

**Related Files**:
- `src/theme/animations.js`
- `package.json`
- `docs/design-system/react-bits.md`

### 2. E2E Testing Guide
**Priority**: High  
**Effort**: Low

Create `docs/development/e2e-testing.md` covering:
- How to run `npm start` and `npm run test:e2e` in parallel
- Headless mode configuration for CI/CD
- Troubleshooting Chrome/Chromedriver version mismatches
- How to handle dev overlay interference (resolved in Sept 29 fixes)
- Writing new smoke tests

**Related Files**:
- `tests/e2e/smoke.test.js`
- `docs/development/daily-notes/2025-09-29-scroll-fixes.md`

### 3. 3D Scene Integration Guide
**Priority**: Medium  
**Effort**: Medium

Document the process for adding new 3D scenes:
- SceneContext API and state management patterns
- Expected props for scene components
- Performance optimization guidelines (refs, memoization, useFrame best practices)
- Asset placement and loading (`public/models/`)
- Theme integration (lighting, colors from MUI palette)

**Related Files**:
- `src/components/hero/background3d/SceneContext.js`
- `src/components/hero/background3d/scenes/`
- `docs/resources/links.md` (Three.js/R3F section)

## Medium Priority

### 4. Content Pipeline Documentation
**Priority**: Medium  
**Effort**: High

Create comprehensive guide for the content analysis pipeline:
- Flow: Raw data → Normalizer → Analyzer → Renderer
- How `sectionNormalizer.js` standardizes section schemas
- How `sectionAnalyzer.js` determines rendering strategies
- How `contentAnalysis.js` optimizes layouts based on content
- When to use `projectGalleryValidator.js` for debugging
- Adding new section types to the pipeline

**Related Files**:
- `src/utils/sectionNormalizer.js`
- `src/utils/sectionAnalyzer.js`
- `src/utils/contentAnalysis.js`
- `src/utils/projectGalleryValidator.js`
- `docs/design-system/overview.md` (Project Section Schema)

### 5. Scroll & Navigation Patterns
**Priority**: Medium  
**Effort**: Medium

Document scroll management patterns:
- `useScrollSpy` hook API and configuration options
- Handling sticky header offsets in scroll calculations
- When to use react-scroll vs custom scrollUtils
- Best practices from Sept 29 scroll fixes (9 iterations documented)
- Balancing responsiveness vs stability in scroll detection

**Reference**:
- Excellent detailed notes already exist in `docs/development/daily-notes/2025-09-29-scroll-fixes.md`
- Extract patterns into reusable guidelines

**Related Files**:
- `src/hooks/useScrollSpy.js`
- `src/utils/scrollUtils.js`
- `src/components/header/Header.js`
- `src/components/about/AboutTabNavigatorScrollSpy.js`

### 6. Framer Motion Usage Patterns
**Priority**: Medium  
**Effort**: Low

Document Framer Motion integration:
- Common variants defined in `src/theme/animations.js`
- `AnimatePresence` usage in modals and transitions
- Gesture handling in interactive components
- Coordinating with MUI theme transitions
- Performance considerations (when to use CSS vs Motion)

**Related Files**:
- `src/theme/animations.js`
- `src/components/work/ProjectModal.js`
- `src/components/work/ProjectCardImproved.js`

## Low Priority

### 7. Design Token Extension Guide
**Priority**: Low  
**Effort**: Low

Expand `docs/design-system/theme-system.md` with:
- How to add new tokens to modular theme files
- Token naming conventions
- Testing tokens with ThemeDebugger
- Propagating changes through component overrides

### 8. Daily Notes Template
**Priority**: Low  
**Effort**: Low

Create template for daily dev notes based on successful examples:
- Five-bullet plan format (from 2025-09-27.md)
- Iterative update structure (from 2025-09-29-scroll-fixes.md)
- Acceptance checklist
- Files touched and tests run

### 9. Markdown Lint Cleanup
**Priority**: Low  
**Effort**: Low

Address 50+ markdownlint warnings in docs files:
- Add blank lines around headings
- Specify language for code blocks
- Fix list spacing
- Use proper heading syntax instead of emphasis

**Files Affected**: Most docs/ markdown files

## Completed / Resolved

### ✓ Links.md Refresh (Sept 30, 2025)
- Added GSAP (unused, removal candidate)
- Documented react-router-dom minimal usage
- Expanded react-scroll documentation
- Clarified styled-components limited usage
- Documented react-bits status (installed but not integrated)
- Added useScrollSpy documentation
- Referenced scroll improvements
- Added content pipeline utilities section

### ✓ System Overview Updates (Sept 30, 2025)
- Added TechBar component documentation
- Documented About section scroll improvements
- Added new utility functions (content pipeline)
- Updated hooks section with useScrollSpy
- Added scroll behavior convention

### ✓ File Structure Updates (Sept 30, 2025)
- Added four new utility files to tree
- Updated dates to current (Sept 30, 2025)

### ✓ README.md Updates (Sept 30, 2025)
- Corrected "March 2026" future date
- Expanded hooks documentation
- Added new utils to list

## Notes

- **Scope Creep Warning**: Some follow-ups require code changes (dependency removal). Keep docs-only vs code-with-docs tasks separate.
- **Priority Rationale**: High priority = impacts daily development or onboarding. Medium = improves understanding. Low = polish/maintenance.
- **Markdown Lints**: Pre-existing style issues, not functional problems. Can batch-fix when convenient.

## Tracking

Update this file when completing tasks by:
1. Moving items to "Completed / Resolved" section with checkmark
2. Adding completion date
3. Linking to relevant PRs or commit SHAs if applicable

---
_Last Updated: September 30, 2025_
