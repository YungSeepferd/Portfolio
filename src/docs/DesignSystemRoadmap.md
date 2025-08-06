# Design System Roadmap

## Status Update (16 April 2025)

- All unused/legacy utilities, hooks, and context files have been deleted.
- Media/image utilities are consolidated and used consistently.
- Layout and spacing are handled with MUI's Box and sx prop.
- The codebase is clean and ready for further design system enhancements.

## Short-term Goals (1-2 Months)

### Theme Standardization

- [ ] **Audit theme usage across components**
  - Identify and refactor hardcoded values in components like ProjectFrame.js, Overlay.js
  - Create consistent pattern for animation durations (currently mixed in SmoothTabNavigator)
- [ ] **Complete custom theme extensions**
  - Document all custom theme properties currently in use
  - Create a consistent schema for custom properties
  - Implement typings for custom theme extensions
- [ ] **Media handling improvements**
  - Standardize ContentAwareImage.js implementation
  - Create consistent theme-based styling for video components
  - Implement standardized image sizing based on theme breakpoints

### Component Refinement

- [ ] **Create missing pattern components**
  - Build ProjectSectionNav.js to handle project navigation
  - Implement standardized ProjectImageGallery.js with lightbox
  - Design system-compliant PrototypeShowcase.js component
- [ ] **Refactor inconsistent components**
  - Update all timeout durations to use theme animation settings
  - Standardize card layouts to maintain consistent heights
  - Normalize typography usage across all components

## Medium-term Goals (3-6 Months)

### Interactive Documentation

- [ ] **Component storybook**
  - Set up Storybook for visual documentation
  - Create stories for all key components
  - Add interaction examples for complex components
- [ ] **Theme playground**
  - Implement a theme explorer for visualizing theme properties
  - Create visual representation of spacing and layout systems
  - Document color system with accessibility considerations

### Advanced Features

- [ ] **Animation system expansion**
  - Create reusable animation hooks
  - Standardize page transitions
  - Implement scrolling-based animations
- [ ] **Dark/light mode refinement**
  - Test and perfect color conversions between modes
  - Ensure consistent contrast ratios in both modes
  - Create smooth mode transition animations

## Long-term Goals (6+ Months)

### Design System Evolution

- [ ] **Component API standardization**
  - Create consistent props patterns across all components
  - Implement comprehensive prop validation
  - Add proper TypeScript typing
- [ ] **System integration**
  - Create CLI tools for component generation
  - Implement automated theme compliance testing
  - Add performance metrics and optimization

### Accessibility Enhancements

- [ ] **WCAG 2.1 AA compliance**
  - Audit and fix all contrast issues
  - Ensure keyboard navigability throughout
  - Implement proper focus management
- [ ] **Assistive technology support**
  - Add comprehensive ARIA attributes
  - Test with screen readers
  - Implement reduced motion preferences

## Performance Goals

- [ ] **Optimize component rendering**
  - Audit component re-renders
  - Implement proper memoization strategies
  - Reduce bundle size through code splitting

- [ ] **Asset optimization**
  - Implement comprehensive image optimization pipeline
  - Create responsive image loading strategies
  - Add progressive loading for large media files
