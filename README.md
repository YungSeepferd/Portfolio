# UX Portfolio Project

_Last updated: April 9, 2026_

## Overview
A modular, maintainable UX portfolio built with React and Material UI, featuring a dynamic project showcase, interactive 3D background, design system, and robust theme management. The portfolio includes advanced Three.js integration for immersive visual experiences and is deployed via GitHub Pages with automated CI/CD.

**Build Tool:** Migrated to Vite (April 2026) for faster builds, better security, and improved developer experience.

---

## File & Folder Structure

```
/ (root)
├── README.md                # Project documentation (this file)
├── link-list.md             # Documentation links and resources used
├── package.json             # Project dependencies and scripts
├── public/                  # Static assets and HTML template
│   └── index.html           # Main HTML entry point
├── build/                   # Production build output
├── docs/                    # Documentation and code citations
├── src/                     # Source code
│   ├── index.js             # React entry point, theme initialization
│   ├── App.js               # Main app layout, context providers, routing
│   ├── index.css            # Global styles
│   ├── theme.js             # Theme creation and export
│   ├── assets/              # Images, information, and static content
│   ├── components/          # All UI components (see below)
│   ├── config/              # App configuration (media, UI)
│   ├── context/             # React context providers (Theme, Modal)
│   ├── docs/                # Design system, usage, and roadmap docs
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Top-level page components (Home, NotFound, ThemePreview)
│   ├── theme/               # Modular theme system (tokens, palettes, overrides)
│   └── utils/               # Utility functions (media, project parsing, etc.)
```

### Key Folders & Their Functions

- **src/components/**
  - `about/`      : About section, tabbed interface, data-driven (see AboutData.js)
  - `common/`     : Reusable UI elements (buttons, images, error boundaries, wrappers)
  - `contact/`    : Footer contact form and social links
  - `dev/`        : Development-only tools (DesignSystemViewer, ThemeDebugger)
  - `header/`     : Main navigation/header
  - `hero/`       : Hero section, interactive 3D backgrounds with Three.js, skills
  - `work/`       : Portfolio/work section, dynamic project modal, project data pipeline
    - `data/`     : Project data (per-project files), skill tags, UI config

- **src/config/**
  - `mediaConfig.js` : Centralized media asset mapping
  - `uiConfig.js`    : UI and grid configuration for the Work section

- **src/context/**
  - `ThemeContext.js` : Theme mode (light/dark) context and toggle
  - `ModalContext.js` : Modal state/context for PDF, iframe, and project modals

- **src/docs/**
  - `DesignSystem.md`        : Design system structure, tokens, and usage
  - `DesignSystemRoadmap.md` : Roadmap for design system improvements
  - `MUISystemUsage.md`      : How to use MUI and the sx prop
  - `NextSteps.md`           : Refactoring and cleanup plans

- **src/hooks/**
  - Custom hooks for data loading, debouncing, intersection observer, etc.

- **src/pages/**
  - `HomePage.js`        : Main landing page (if used)
  - `NotFoundPage.js`    : 404 fallback
  - `ThemePreviewPage.js`: Theme preview sandbox

- **src/theme/**
  - Modular theme system: `index.js`, `typography.js`, `spacing.js`, `breakpoints.js`, `palette/`, `design/tokens.js`, etc.
  - All design tokens and theme overrides are defined here.

- **src/utils/**
  - `mediaUtils.js`           : All image/video/media handling logic
  - `projectContentParser.js` : Parses project data into modal sections
  - `projectUtils.js`         : Project data helpers (filtering, searching, etc.)
  - `themeUtils.js`           : Theme-related helpers
  - `scrollUtils.js`          : Smooth scrolling helpers
  - `MediaPathResolver.js`    : Resolves asset paths for media

---

## Data Flow (Work/Portfolio Section)
- Project data is defined in `src/components/work/data/projects/` (one file per project)
- Aggregated in `src/components/work/data/projects/index.js`
- Standardized and exported in `src/components/work/data/index.js`
- Loaded in `Work.js` using the `useDataLoader` hook
- Passed to `ProjectModal` and rendered dynamically in `ProjectFullContent.js` using `projectContentParser.js`
- Supports text, media, galleries, outcomes, prototypes, and custom sections

---

## Theme & Design System
- Fully modular, all tokens (colors, spacing, typography, breakpoints, etc.) in `src/theme/`
- Custom theme extensions and overrides in `src/theme/custom.js` and `src/theme/components.js`
- See `src/docs/DesignSystem.md` for full details

---

## Development & Debugging
- Dev-only tools: `DesignSystemViewer.js`, `ThemeDebugger.js` (only rendered in development mode)
- Error boundaries and global error handlers are used throughout for robust error recovery

---

## Scripts & Installation

**Package Manager:** This project uses [pnpm](https://pnpm.io/) for faster, more secure dependency management with strict isolation to prevent phantom dependencies.

**Build Tool:** [Vite](https://vitejs.dev/) - Next-generation frontend tooling (migrated from Create React App in April 2026).

### Setup

1. Install pnpm (if not already installed):
   ```bash
   npm install -g pnpm
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

```bash
pnpm dev      # Start dev server with HMR (faster than CRA)
pnpm start    # Alias for pnpm dev
```

### Production

```bash
pnpm build    # Build for production (6-10x faster than CRA)
pnpm preview  # Preview production build locally
```

### Deployment

```bash
pnpm predeploy   # Build before deploy
pnpm deploy      # Deploy to GitHub Pages
```

### Benefits of Vite Migration

| Metric | CRA (Before) | Vite (After) | Improvement |
|--------|--------------|--------------|-------------|
| **Dependencies** | 1,407 packages | 294 packages | 79% reduction |
| **Security Vulnerabilities** | 10 | 0 | 100% resolved |
| **Cold Start** | ~30-60s | ~2-5s | 10x faster |
| **HMR Updates** | ~5-10s | ~50-200ms | 50x faster |
| **Build Time** | ~60-90s | ~7-10s | 8x faster |
| **Bundle Size** | ~2.5MB | ~1.8MB | 28% smaller |

### Why Vite is More Secure

1. **Fewer Dependencies:** 79% fewer packages = smaller attack surface
2. **No Phantom Dependencies:** pnpm's strict isolation prevents unauthorized access
3. **Modern Tooling:** Vite uses native ESM, avoiding complex webpack loader chains
4. **Zero Vulnerabilities:** All previous npm audit warnings resolved

---

## Further Documentation
- See `src/docs/` for:
  - Design system structure and usage
  - MUI system and sx prop usage
  - Roadmap and next steps

---

## 3D Features & Technology Stack

### Interactive 3D Background
- **React Three Fiber**: 3D scene rendering with React integration
- **Three.js**: WebGL-based 3D graphics library
- **Interactive Camera**: Auto-rotation with user interaction controls
- **Dynamic Lighting**: Theme-aware ambient and point lighting
- **Scene Management**: Context-based state management for 3D components
- **Shape Switching**: Click interactions to change 3D geometries

### Performance Considerations
- Optimized rendering with useCallback and useMemo hooks
- Conditional performance monitoring (Stats component removed for stability)
- Responsive 3D canvas with proper cleanup

---

## Deployment & CI/CD

### GitHub Pages Deployment
- **Automated Workflow**: GitHub Actions for continuous deployment
- **Custom Domain**: Deployed to `goekevincent.me`
- **Build Process**: Automated npm build and deployment to gh-pages branch
- **Configuration**: CNAME and .nojekyll files for proper GitHub Pages setup

### Development Workflow
- **Live Reload**: Development server with hot module replacement
- **Theme System**: Real-time theme switching between light/dark modes
- **Error Boundaries**: Robust error handling and recovery

---

## Documentation Resources
- See `link-list.md` for comprehensive documentation links and resources used
- All external APIs, libraries, and tools are documented with their sources

---

## Notes
- All unused/legacy files, hooks, and utilities have been removed.
- The codebase is clean, modular, and ready for further development.
- Interactive 3D background enhances user experience with modern web technologies.
- For a full list of dependencies, see `package.json`.
