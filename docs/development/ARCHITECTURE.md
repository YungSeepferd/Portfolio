# Architecture Overview

This document provides a high-level overview of the portfolio project's architecture, key design decisions, and component structure.

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Material-UI (MUI) with custom theme
- **3D Visualization**: React Three Fiber (Three.js wrapper)
- **State Management**: Context API for global state, local state with hooks
- **Testing**: Vitest, React Testing Library, Playwright
- **Deployment**: CI/CD pipeline with GitHub Actions

## Architecture Principles

The application follows these core architectural principles:

1. **Component-Based Architecture**: UI is built with reusable, composable components
2. **Separation of Concerns**: Logic, presentation, and state are separated
3. **Theme-First Design**: All visual elements adhere to a centralized theme
4. **Responsive by Default**: All components are responsive across devices
5. **Progressive Enhancement**: Core functionality works without JavaScript/3D
6. **Accessibility First**: WCAG compliance is a core requirement, not an afterthought

## Directory Structure

```text
src/
├── assets/         # Static assets (images, fonts, etc.)
├── components/     # React components grouped by feature
├── config/         # Configuration files and constants
├── context/        # React Context providers
├── hooks/          # Custom React hooks
├── pages/          # Page-level components
├── schemas/        # Data validation schemas
├── theme/          # Theme configuration and design tokens
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Core Subsystems

### Theme System

The theme system provides consistent styling across the application. It extends MUI's theming capabilities with custom design tokens.

Key files:

- `src/theme/index.ts`: Main theme configuration
- `src/theme/colors.ts`: Color palette definitions
- `src/theme/typography.ts`: Typography scale and fonts
- `src/theme/components.ts`: Component-specific theme overrides

The theme is made available through the `ThemeContext` and can be toggled between light and dark modes.

### 3D Visualization System

The 3D visualization system manages interactive background scenes using React Three Fiber.

Key components:

- **Scene Controller**: Manages which 3D scene is active
- **Scene Components**: Individual 3D scenes/visualizations
- **Performance Monitor**: Adjusts quality based on device capabilities

The system is designed to gracefully degrade on lower-end devices and provides accessibility options for users who prefer reduced motion.

### Project Display System

The project display system showcases portfolio projects with rich media and interactive elements.

Key components:

- **Project Grid**: Displays project cards in a responsive grid
- **Project Card**: Condensed project preview with hover effects
- **Project Modal**: Full project details with navigation
- **Media Components**: Specialized components for different media types (images, videos, prototypes)

Projects are defined using a structured data format that allows for flexible content while maintaining consistent presentation.

### Navigation System

The navigation system handles user movement through the application.

Key components:

- **Header**: Main navigation bar with responsive menu
- **Section Navigation**: Within-page navigation to different sections
- **Project Navigation**: Navigation between projects in the modal view

The system supports both mouse/touch and keyboard navigation patterns.

## State Management

The application uses React Context for global state management:

- **ThemeContext**: Manages theme preferences
- **ModalContext**: Controls modal visibility and content
- **SceneContext**: Manages active 3D scene and performance settings
- **AccessibilityContext**: Manages accessibility preferences

Local component state is managed using React hooks, with custom hooks for reusable logic.

## Data Flow

1. **Configuration**: Static configuration is imported from config files
2. **Context Providers**: Wrap the application to provide global state
3. **Page Components**: Render the main layout for each page
4. **Feature Components**: Implement specific functionality
5. **UI Components**: Present data and handle user interactions
6. **Hooks**: Manage component-specific state and side effects
7. **Utilities**: Provide shared functionality across components

## Performance Considerations

The application employs several strategies to optimize performance:

- Code splitting for lazy loading of components
- Optimized asset loading with proper caching
- Dynamic quality adjustment for 3D scenes
- Memoization of expensive computations
- Efficient re-rendering with proper React patterns

## Security Measures

Security is implemented through:

- Content Security Policy (CSP)
- Secure form handling for contact forms
- Self-hosted fonts and resources
- Proper data sanitization
- Privacy-focused analytics

## Accessibility Features

Accessibility features include:

- Semantic HTML structure
- ARIA attributes for interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Reduced motion options
- Color contrast compliance
- Focus management

## Future Architecture Improvements

Planned architectural improvements include:

1. Unified 3D scene context and provider system
2. Consolidated media utility functions
3. Improved work section with enhanced filtering
4. Dedicated accessibility context and controls
5. Performance monitoring and automatic quality adjustments
