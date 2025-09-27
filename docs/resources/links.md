# Documentation Links and Resources

This document contains all the documentation sources and resources used during the development of this React portfolio project.

## Three.js and React Three Fiber Documentation

### React Three Fiber (R3F)
- **Main Documentation**: https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
- **Canvas Component**: Used for 3D scene rendering
- **Hooks and Components**: useFrame, useThree for scene management

### Drei Library
- **Stats Component Documentation**: https://drei.docs.pmnd.rs/misc/stats
  - Used for performance monitoring (later removed due to positioning limitations)
- **Performance Monitor**: https://drei.docs.pmnd.rs/performances/performance-monitor#performancemonitor
  - Advanced performance monitoring component for dynamic quality adjustment

## Material-UI (MUI) Documentation

### Core Components
- **Theme System**: Used for consistent styling and dark/light mode support
- **Material Icons**: Icon components for UI elements
- **Box Component**: Layout and spacing utilities

### Styling
- **useTheme Hook**: Access to theme variables and palette
- **Theme Palette**: Color system for consistent design
- **Shadows**: Material Design elevation system

## React Documentation

### Core Concepts
- **useEffect Hook**: Component lifecycle management
- **useRef Hook**: DOM element references
- **useState Hook**: Component state management
- **useCallback Hook**: Performance optimization for event handlers

## Development Tools

### Performance Monitoring
- **stats.js**: https://github.com/mrdoob/stats.js/
  - JavaScript performance monitor for FPS tracking
  - Integrated via Drei Stats component

### Build Tools
- **Create React App**: React application scaffolding
- **npm**: Package management and build scripts

## Project-Specific Resources

### React Bits Component Library
- **Main Documentation**: https://reactbits.dev/get-started/introduction
  - Curated React component blueprints for marketing and content-heavy experiences
  - Focus on accessibility, responsive layout primitives, and composable sections
  - Useful as inspiration/pattern library when extending beyond stock MUI widgets

### GitHub Pages Deployment
- **GitHub Actions**: Automated deployment workflow
- **Custom Domain**: goekevincent.me configuration
- **CNAME and .nojekyll**: GitHub Pages configuration files

### 3D Scene Management
- **Interactive Camera**: Custom camera controls with auto-rotation
- **Scene Context**: React Context for state management across 3D components
- **Shape Switching**: Dynamic geometry changes on user interaction

## Issues Encountered and Solutions

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

*Last Updated: August 27, 2025*
*Project: React Portfolio with 3D Background*
