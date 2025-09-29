# Portfolio Documentation Index

_Last updated: September 30, 2025_

## Documentation Overview

This directory contains all project documentation organized by category. This is the central hub for understanding the portfolio project architecture, development guidelines, and maintenance procedures.

## Quick Start

- **New to the project?** Start with [Project Overview](project/overview.md)
- **Setting up development?** See [Setup Guide](project/setup.md)
- **Understanding the codebase?** Start with the new [System Overview](architecture/system-overview.md) and then dive into [File Structure](architecture/file-structure.md)
- **Working with design system?** Visit [Design System Overview](design-system/overview.md)

## Documentation Structure

```
docs/
├── README.md                    # This index file
├── ANALYSIS.md                  # Documentation consolidation analysis
├── project/                     # Project overview and setup
│   ├── overview.md             # Project description and goals
│   ├── setup.md                # Installation and development setup
│   └── deployment.md           # Deployment and CI/CD information
├── architecture/                # Technical architecture
│   ├── system-overview.md     # High-level map of application modules
│   ├── file-structure.md       # Complete file and folder structure
│   ├── data-flow.md            # Data flow and state management
│   └── technology-stack.md     # Technology choices and versions
├── design-system/               # Design system documentation
│   ├── overview.md             # Design system principles
│   ├── theme-system.md         # Theme configuration and usage
│   ├── components.md           # Component patterns and guidelines
│   ├── mui-usage.md            # MUI system usage guidelines
│   └── roadmap.md              # Design system roadmap
├── development/                 # Development guidelines
│   ├── next-steps.md           # Current development priorities
│   ├── analysis-roadmap.md     # Comprehensive project analysis
│   └── hero-component.md       # Hero section documentation
├── resources/                   # External resources and references
│   ├── links.md                # Documentation links and resources
│   └── code-citations.md       # Code citations and licenses
└── legacy/                      # Archived documentation
    └── resources.md            # Duplicate resource documentation
```

## Documentation Categories

### 📋 Project Information
Essential information about the portfolio project, setup instructions, and deployment procedures.

### 🏗️ Architecture
Technical documentation covering file structure, data flow patterns, and technology stack details.

### 🎨 Design System
Comprehensive design system documentation including theme configuration, component patterns, and usage guidelines.

### 💻 Development
Development guidelines, current priorities, project analysis, and component-specific documentation.

### 📚 Resources
External links, documentation sources, and code citations used throughout the project.

### 📦 Legacy
Archived documentation files that have been superseded or consolidated.

## Recent Changes

**Documentation Consolidation (August 27, 2025):**
- Organized scattered `.md` files into logical categories
- Eliminated duplicate content between `link-list.md` and `resources.md`
- Created comprehensive file structure documentation
- Added cross-references and navigation aids
- Moved redundant files to legacy folder

## Contributing to Documentation

When updating documentation:
1. Keep the same organizational structure
2. Update the "Last updated" date in modified files
3. Add cross-references to related documentation
4. Follow the established markdown formatting conventions
5. Update this index if adding new documentation files

## Need Help?

- **Can't find what you're looking for?** Check the [Analysis Report](ANALYSIS.md) for recent changes
- **Found outdated information?** Please update the relevant file and note the change
- **Missing documentation?** Consider adding it to the appropriate category

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
  - `useDataLoader.js`       : Promise-aware data loading with retry and validation
  - `useProjectModal.js`     : Project modal navigation and state management
  - `useScrollSpy.js`        : Scroll-based section detection using IntersectionObserver (added 2025-09-29)
  - `useIntersectionObserver.js` : Generic intersection observer hook
  - `useDebounce.js`         : Debounce hook for performance optimization
  - `useThemeUtils.js`       : Theme-related utility hooks

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
  - `contentAnalysis.js`      : Analyzes content for optimal layout decisions (added 2025)
  - `sectionAnalyzer.js`      : Determines rendering strategies for sections (added 2025)
  - `sectionNormalizer.js`    : Standardizes section data structures (added 2025)
  - `projectGalleryValidator.js` : Dev-only gallery validation (added 2025)

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
- See `docs/DesignSystem.md` for full details

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
- See `docs/` for:
  - Design system structure and usage
  - MUI system and sx prop usage
  - Roadmap and next steps
  - Component documentation
  - Development resources

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
- See `docs/resources.md` for comprehensive documentation links and resources used
- All external APIs, libraries, and tools are documented with their sources

---

## Notes
- All unused/legacy files, hooks, and utilities have been removed.
- The codebase is clean, modular, and ready for further development.
- Interactive 3D background enhances user experience with modern web technologies.
- For a full list of dependencies, see `package.json`.
