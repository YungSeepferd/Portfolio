# Documentation Links and Resources

This document contains all the documentation sources and resources used during the development of this React portfolio project.

## How to Use the Docs

- **Start at the hub**: `docs/README.md` provides the index to all documentation categories.
- **Navigate by category**: Architecture docs for system understanding, design-system for theming/components, development for current work.
- **Official sources first**: Always prefer official documentation for React 18, MUI 5, React Three Fiber, Drei, and Framer Motion over blog posts.
- **Cross-linking**: Use relative paths (`../design-system/overview.md`) and section anchors (`#theme-system`) to connect related docs.
- **Search efficiently**: Use editor search (Cmd/Ctrl+P) to locate files; grep for symbols and imports across the codebase.
- **Update policy**: When modifying docs, update the "Last Updated" date and cross-reference related files that may need updates.

## Three.js and React Three Fiber Documentation

### React Three Fiber (R3F)

- **Main Documentation**: [R3F Introduction](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- **Canvas Component**: Used for 3D scene rendering
- **Hooks and Components**: useFrame, useThree for scene management

### Drei Library

- **Stats Component Documentation**: [Drei Stats](https://drei.docs.pmnd.rs/misc/stats)
  - Used for performance monitoring (later removed due to positioning limitations)
- **Performance Monitor**: [Performance Monitor](https://docs.pmnd.rs/react-three-drei/performance/performance-monitor)
  - Advanced performance monitoring component for dynamic quality adjustment

## Material-UI (MUI) Documentation

### Core Components

- **Theme System**: [Theming](https://mui.com/material-ui/customization/theming/)
- **Material Icons**: [Material Icons](https://mui.com/material-ui/material-icons/)
- **Box Component**: [Box](https://mui.com/material-ui/react-box/)

### Styling

- **useTheme Hook**: Access to theme variables and palette
- **Theme Palette**: [Palette](https://mui.com/material-ui/customization/palette/)
- **Shadows**: Material Design elevation system

## React Documentation

### Core Concepts

- **useEffect**: [react.dev – useEffect](https://react.dev/reference/react/useEffect)
- **useRef**: [react.dev – useRef](https://react.dev/reference/react/useRef)
- **useState**: [react.dev – useState](https://react.dev/reference/react/useState)
- **useCallback**: [react.dev – useCallback](https://react.dev/reference/react/useCallback)

## Development Tools

### Performance Monitoring

- **stats.js**: [GitHub repository](https://github.com/mrdoob/stats.js/)
  - JavaScript performance monitor for FPS tracking
  - Integrated via Drei Stats component

### Build Tools

- **Create React App**: [create-react-app.dev](https://create-react-app.dev/)
- **npm**: Package management and build scripts

### E2E Testing

- **Selenium WebDriver**: [selenium.dev – WebDriver](https://www.selenium.dev/documentation/webdriver/)
  - Used by `tests/e2e/smoke.test.js` to drive Chrome via Chromedriver
  - Requires `npm start` in one terminal and `npm run test:e2e` in another
  - Headless mode supported for CI/CD environments
  - See `docs/development/daily-notes/2025-09-29-scroll-fixes.md` for test examples

### Routing

- **React Router DOM**: [React Router v6 Docs](https://reactrouter.com/en/main)
  - **Package**: `react-router-dom@^6.30.0`
  - **Current Usage**: Minimal single-page application structure
  - **Implementation**: `BrowserRouter` in `src/App.js`, `ScrollToTop` utility in `src/components/common/`
  - **Future**: Prepared for multi-page expansion (NotFoundPage component exists)

### Scroll Management

- **React Scroll**: [React Scroll GitHub](https://github.com/fisshy/react-scroll)
  - **Package**: `react-scroll@^1.9.0`
  - **Usage**: Smooth scroll navigation in `src/components/header/Header.js` and `NavLinks.js`
  - **Components**: `Link`, `scroller` for programmatic scrolling to named sections
  - **Integration**: Works alongside custom `scrollUtils.js` for viewport detection

### Styling System

- **Styled Components**: [Styled Components Docs](https://styled-components.com/)
  - **Package**: `styled-components@^6.1.17`
  - **Status**: ⚠️ **Minimal usage - removal candidate**
  - **Current Usage**: Only imported in `src/theme/animations.js` for keyframe definitions (lines 8, 122-149)
  - **Issue**: Redundant with Emotion (MUI's styling engine) - creates bundle bloat
  - **Recommendation**: Refactor animations.js to use pure CSS keyframes or Framer Motion, then remove dependency
  - **Memory Note**: Previously flagged as redundant; styled-components exports in animations.js are unused elsewhere

## Animation Libraries

### Framer Motion

- **Official Documentation**: [Framer Motion](https://www.framer.com/motion/)
- **Main Docs**: [Motion API Reference](https://www.framer.com/motion/introduction/)
  - Animation primitives and transitions used across interactive elements
  - Variants, gestures, and `AnimatePresence` support modal and card animations
  - Used extensively in: ProjectModal, ProjectCardImproved, Hero section, About tabs
  - See `src/theme/animations.js` for predefined motion variants

### GSAP (Green Sock Animation Platform)

- **Status**: ⚠️ **Dependency present but UNUSED in codebase**
- **Package**: `gsap@^3.13.0` in package.json
- **Usage**: Zero imports found across entire `src/` directory
- **Recommendation**: Remove in next dependency cleanup (`npm uninstall gsap`)
- **Note**: All animations currently handled by Framer Motion and CSS transitions

## Project-Specific Resources

### React Bits Component Library

- **Main Documentation**: [React Bits – Get Started](https://reactbits.dev/get-started/introduction)
- **Internal Integration Guide**: [docs/design-system/react-bits.md](../design-system/react-bits.md)
- **Package**: `react-bits@^1.0.5`
- **Status**: ⚠️ **Installed but NOT actively integrated**
- **Current Usage**: Zero imports in production code
- **Purpose**: Reference library for marketing section patterns and accessibility blueprints
- **Integration Plan**: See `docs/design-system/react-bits.md` for proposed adapter pattern using MUI theme wrappers
- **Recommendation**: Keep as design reference or remove if not planned for near-term integration

### 3D Scene Management

- **Interactive Camera**: Custom camera controls with auto-rotation
- **Scene Context**: React Context for state management across 3D components
- **Shape Switching**: Dynamic geometry changes on user interaction

### Stats Component Positioning

- **Issue**: Drei Stats component has fixed positioning that cannot be overridden with CSS
- **Attempted Solutions**:
  - Custom parent containers with useRef
  - CSS styling overrides
  - Portal-based rendering
- **Final Solution**: Removed Stats component due to positioning limitations

### Theme Integration

- **Solution**: Integrated MUI theme system with Three.js lighting and colors
- **Implementation**: Dynamic theme-aware ambient and point lighting

## Navigation Structure

- **User Preference**: Work section before About section in navigation
- **Configuration**: Maintained in `/src/config/uiConfig.js`
- **Component Order**: Hero → Work → About → Contact

## Recent Component Additions

### TechBar Component (Added 2025-09-27)

- **File**: `src/components/work/TechBar.js`
- **Purpose**: Minimal wrapper around `TechnologyTags` for stable technology chip rendering
- **Implementation**: Pass-through component with prop validation
- **Usage**: Provides consistent entry point for technology badges across Work section
- **Daily Notes**: [2025-09-27.md](../development/daily-notes/2025-09-27.md)

### Scroll & Tab Navigation Improvements (2025-09-29)

- **Major Enhancement**: About section tab navigation with scroll-spy detection
- **New Hook**: `useScrollSpy` - IntersectionObserver-based scroll position tracking
  - Detects active section based on viewport visibility
  - Configurable threshold, rootMargin, and scroll offset
  - Used by `AboutTabNavigatorScrollSpy.js`
- **Fixes**: 9 iterative improvements for scroll alignment, sticky header offsets, and tab activation
- **Documentation**: [2025-09-29-scroll-fixes.md](../development/daily-notes/2025-09-29-scroll-fixes.md)
- **Related Files**: `AboutTabNavigatorScrollSpy.js`, `AboutSection.js`, `useScrollSpy.js`

## Advanced Content Pipeline (Undocumented)

### Content Analysis Utilities

These utilities enable adaptive, intelligent rendering of project content:

- **contentAnalysis.js**: Analyzes image dimensions and text content for optimal layout decisions
- **sectionAnalyzer.js**: Determines rendering strategies based on content type (text-heavy, media-heavy, balanced)
- **sectionNormalizer.js**: Standardizes project section data structures for consistent processing
- **projectGalleryValidator.js**: Dev-only validation for gallery media aspect hints

**Usage**: Work section project modals use these to dynamically adapt layouts based on content characteristics.

---
*Last Updated: September 30, 2025*
*Project: React Portfolio with 3D Background*
