# UX Portfolio Project

_Last updated: 27 August 2025_

## Overview
A modular, maintainable UX portfolio built with React and Material UI, featuring a dynamic project showcase, interactive 3D background, design system, and robust theme management. The portfolio includes advanced Three.js integration for immersive visual experiences and is deployed via GitHub Pages with automated CI/CD.

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

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm start
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Deploy (if configured):
   ```bash
   npm run deploy
   ```

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
