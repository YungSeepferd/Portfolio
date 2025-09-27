# Documentation Links and Resources

This document contains all the documentation sources and resources used during the development of this React portfolio project.

## How to Use the Docs

- Start at `docs/README.md` as the hub. It links to architecture, design system, and development guides.
- Prefer official docs for React, MUI, React Three Fiber, and Drei. Avoid blogs and SEO content.
- Cross-link related docs using relative paths (e.g., `../design-system/overview.md`) and section anchors (e.g., `#theme-system`).
- Use search in your editor to locate symbols or files and reference whole files or folders in PR descriptions.

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

## Animation Library

### Framer Motion

- **Official Site**: [Framer Motion](https://www.framer.com/motion/)
  - Animation primitives and transitions used across interactive elements
  - Variants, gestures, and `AnimatePresence` support modal and card animations

## Project-Specific Resources

### React Bits Component Library

- **Main Documentation**: [React Bits – Get Started](https://reactbits.dev/get-started/introduction)
- **Internal Integration Guide**: [docs/design-system/react-bits.md](../design-system/react-bits.md)
- Curated React component blueprints for marketing and content-heavy experiences
- Focus on accessibility, responsive layout primitives, and composable sections
- Useful as inspiration/pattern library when extending beyond stock MUI widgets

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

---
*Last Updated: September 27, 2025*
*Project: React Portfolio with 3D Background*
