# System Overview

_Last updated: September 30, 2025_

This document provides a high-level map of the portfolio application so new maintainers and automation agents can understand how the pieces fit together before diving into individual modules. Use it alongside the detailed references in the `docs/architecture`, `docs/design-system`, and `docs/project` folders.

## Application Shell

| Area | Purpose | Key Files |
| --- | --- | --- |
| Entry point | Boots React, wraps the app with providers, registers analytics | `src/index.js`, `src/reportWebVitals.js` |
| Root component | Declares global layout, lazily loads feature sections | `src/App.js` |
| Routing | Currently a single-page experience using `BrowserRouter` for future expansion | `src/App.js` |
| Providers | Theme mode + design system, modal orchestration | `src/context/ThemeContext.js`, `src/context/ModalContext.js` |

## Feature Sections

### Header & Navigation
- Responsive `AppBar` with desktop and mobile layouts (`src/components/header/Header.js`).
- Scroll-based state (adds shadow, background blur) and React Scroll for in-page navigation.
- `navItems` and `socialLinks` configured centrally in `src/config/uiConfig.js`.

### Hero Section
- Split between textual content and a Three.js background managed through React Three Fiber.
- State coordination via `SceneContext` (`src/components/hero/background3d/SceneContext.js`).
- Individual 3D scenes live in `src/components/hero/background3d/scenes/` (e.g., `BoxScene`, `FlowFieldScene`, `TorusScene`).
- Interaction hooks & utilities: `useThreeInteraction.js`, `sceneThemeUtils.js`.
- Auxiliary UI elements such as `ScrollIndicator`, `InteractionGuide` in `src/components/hero` subtree.

### Work / Projects Section
- Data layer: one file per project under `src/components/work/data/projects/`, aggregated via `src/components/work/data/index.js`.
- Loader: `Work.js` calls `useDataLoader(getProjects)` and feeds data into `ProjectGrid` and `ProjectModal`.
- UI:
  - Grid cells rendered with `ProjectCardImproved.js` (hover tech overlay, responsive aspect-ratio control).
  - Technology badges displayed via `TechBar.js` wrapper (added 2025-09-27) composing `TechnologyTags`.
  - Detailed view handled by `ProjectModal.js`, composing `ProjectFullContent`, `ProjectSections`, `PrototypeShowcase`, etc.
- Content pipeline: `sectionNormalizer.js` standardizes data, `sectionAnalyzer.js` determines rendering strategy, `contentAnalysis.js` optimizes layouts.
- Utility helpers: `projectUtils.js`, `MediaPathResolver.js`, `ProjectContentRenderer.js`, `projectGalleryValidator.js`.

### About Section
- Tabbed content defined declaratively in `AboutData.js` (rich typography, imagery positioning).
- UI orchestrated by `AboutSection.js`, `AboutTabNavigatorScrollSpy.js` (enhanced 2025-09-29), `AboutSlideshow`, with fallback states handled via Material UI primitives.
- Scroll-spy navigation: `useScrollSpy` hook tracks visible section using IntersectionObserver for automatic tab activation.
- Nine iterative scroll improvements (Sept 29): sticky header offset, scroll alignment, tab detection sensitivity (see `docs/development/daily-notes/2025-09-29-scroll-fixes.md`).

### Contact / Footer
- `FooterContact.js` provides a stylised call-to-action card, email link, and social icons.
- Supports contextual messaging when invoked from project modals (see `ProjectModal` handing down `projectContext`).

## Shared Components

| Area | Description | Examples |
| --- | --- | --- |
| Common UI | Reusable infrastructure (`ErrorBoundary`, `LazyImage`, `SkillTagList`, `VideoPlayer`) | `src/components/common/` |
| Dev utilities | Non-production helpers disabled in builds | `src/components/dev/ThemeDebugger.js`, `DesignSystemViewer.js` |
| Modal helpers | `IframeModal`, `PDFViewer`, orchestrated through `ModalContext` | `src/components/common/`, `src/context/ModalContext.js` |

## Hooks & Utilities

### Custom Hooks
- `useDataLoader.js`: Promise-aware loader with retry & validation hooks.
- `useProjectModal.js`: Encapsulates modal navigation, cycling between projects.
- `useScrollSpy.js`: IntersectionObserver-based scroll detection for tab navigation (added 2025-09-29).
- `useIntersectionObserver.js`, `useDebounce.js`: Performance helpers.
- `useThemeUtils.js`: Theme-related utility hooks.

### Utilities
- `scrollUtils.js`: Smooth scrolling and viewport checks for navigation + scroll indicators.
- `mediaUtils.js`, `MediaPathResolver.js`: Normalise asset lookups between bundled images and public folder resources.
- `contentAnalysis.js`: Analyzes image dimensions and text for optimal layout decisions.
- `sectionAnalyzer.js`: Determines rendering strategies (adaptive, gallery, text-heavy, etc.).
- `sectionNormalizer.js`: Standardizes project section data structures for consistent processing.
- `projectGalleryValidator.js`: Dev-only validation for gallery media aspect hints.

## Theme System

- `src/theme/index.js` composes the Material UI theme from modular pieces.
- Design tokens live under `src/theme/design/tokens.js` and palette/breakpoint helpers inside `src/theme/palette/`, `spacing.js`, `typography.js`, etc.
- Component-level overrides defined in `src/theme/components.js`.
- Custom additions exposed on `theme.customComponents` (used by hero scenes and animation helpers).

## Styling & Animations

- Styling via MUI `sx` prop, augmented with `src/theme/animations.js` and `framer-motion` for motion primitives.
- Global CSS is intentionally minimal (`src/index.css`); most look & feel is theme-driven.

## Assets & Media

- Bundled assets under `src/assets/`, organised by feature (e.g., `images/About Me/`, `images/GreenWallet/`).
- Public-facing assets (documents, external prototypes) referenced via resolver helpers to keep paths consistent.
- Large SVGs (>500KB) trigger Babel warnings during build—optimise assets where possible.

## Testing & Tooling

- Unit test harness available via CRA (`npm test`), though no Jest suites ship by default.
- End-to-end smoke test (`npm run test:e2e`) uses Selenium + Chromedriver; requires `npm start` in another terminal.
- Build verification: `npm run build` (also invoked in deployment workflow).

## Deployment

- Build artefacts output to `/build`; ensure `package.json` `homepage` remains in sync with deploy target.

## Key Conventions

1. **Data-driven sections**: About & Work rely on structured data objects. Preserve schema integrity when adding records.
2. **Console hygiene**: Production logging is trimmed; wrap debug statements in dev guards if reintroduced. Use `projectGalleryValidator` for dev-only warnings.
3. **Accessibility**: Maintain semantic headings (`h1` inside hero, `h2` per section), ARIA labels for buttons/modals, and keyboard navigation (modal arrows, close actions, nav buttons).
4. **Responsive design**: Layout tuned for theme breakpoints—test changes on mobile and desktop widths.
5. **Three.js performance**: Avoid heavy computations inside render loops; leverage refs and memoisation.
6. **Scroll behavior**: Account for sticky header offsets when implementing scroll navigation (see `useScrollSpy` offset parameter).
7. **Content pipeline**: Use normalizer → analyzer pattern for dynamic content rendering (see Work section utilities).

## Recommended Reading Order

1. `docs/project/overview.md`
2. `docs/project/setup.md`
3. `docs/architecture/system-overview.md` (this document)
4. `docs/architecture/file-structure.md`
5. `docs/design-system/overview.md`
6. Feature-specific briefs under `docs/development/`

Keeping this overview current ensures contributors and automation agents can identify the correct module quickly and understand downstream effects before making changes.
