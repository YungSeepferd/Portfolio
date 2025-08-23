# Portfolio Architecture

## Overview

This document provides a high-level overview of the portfolio application architecture, including core technologies, system design, and key architectural decisions.

## Core Technologies

- **Frontend Framework**: React 18+ with TypeScript
- **Build System**: Vite
- **3D Visualization**: Three.js with React Three Fiber
- **Styling**: Material UI (MUI) with custom theming
- **State Management**: Zustand
- **Testing**: 
  - Unit/Integration: Vitest
  - E2E: Playwright
  - Accessibility: axe-core

## System Architecture

### Application Structure

The application follows a component-based architecture with clear separation of concerns:

```
src/
├── components/   # UI Components
│   ├── common/   # Reusable components
│   ├── features/ # Feature-specific components
│   └── layout/   # Layout components (header, etc.)
├── context/      # React context providers
├── hooks/        # Custom React hooks
├── pages/        # Top-level page components
├── store/        # State management (Zustand)
├── styles/       # Global styles and theme
├── types/        # TypeScript type definitions
└── utils/        # Utility functions
```

### Data Flow

1. **State Management**: Zustand stores provide global state management
2. **Component Hierarchy**:
   - Layout components establish the page structure
   - Feature components implement specific sections
   - Common components provide reusable UI elements
3. **Context Providers**: Theme and Modal contexts provide shared state
4. **Custom Hooks**: Abstract complex logic and provide reusable functionality

### Key Design Decisions

1. **Component Modularity**: Components are designed to be modular and composable, enhancing reusability and maintainability.

2. **Custom Theme System**: Extended MUI theming with custom design tokens for consistent visual language.

3. **Performance Optimization**:
   - Code splitting for optimal bundle size
   - Lazy loading of components and assets
   - Optimized 3D rendering with React Three Fiber

4. **Accessibility First**: Built with accessibility in mind, including keyboard navigation, screen reader support, and ARIA attributes.

5. **Responsive Design**: Mobile-first approach with responsive components adapting to different screen sizes.

6. **Type Safety**: TypeScript used throughout the codebase for type safety and better developer experience.

7. **Testing Strategy**: Comprehensive testing approach with unit, integration, and end-to-end tests.
