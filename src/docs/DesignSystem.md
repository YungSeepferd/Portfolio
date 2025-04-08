# Portfolio Design System

## Overview

This design system provides a comprehensive set of guidelines and components for maintaining a consistent visual language throughout the UX portfolio. It extends Material UI's theming capabilities with portfolio-specific components and patterns.

## Table of Contents

1. [Core System Structure](#core-system-structure)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Component Patterns](#component-patterns)
6. [Animation Guidelines](#animation-guidelines)
7. [Custom Theme Extensions](#custom-theme-extensions)
8. [Usage Guidelines](#usage-guidelines)

## Core System Structure

The design system is modularized into specialized files:

- **colors.js** - Color palette, semantic color usage, and project-specific color variants
- **typography.js** - Text styles, font families, and typographic scale
- **spacing.js** - Spacing units and layout measurements
- **breakpoints.js** - Responsive design breakpoints
- **animations.js** - Motion design principles, durations, and easings
- **components.js** - Shared component styling
- **index.js** - Theme composition from individual modules

## Color System

### Base Palette

```jsx
const palette = {
  mode: 'dark',
  primary: {
    main: '#5363EE', // Core brand blue
    light: '#8A94F2',
    dark: '#3545D6',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#E56B9E', // Accent pink
    light: '#F1A0C2',
    dark: '#C2477C',
    contrastText: '#FFFFFF',
  },
  // ...additional colors
}
```

### Semantic Color Usage

- **Primary** - Main actions, key highlights, primary brand elements
- **Secondary** - Supporting actions, accents, secondary emphasis
- **Error/Warning/Info/Success** - System feedback and states
- **Project Colors** - Each project has a dedicated color theme:
  - Master Thesis: Primary Blue
  - Resonant Relaxation: Secondary Pink
  - AMIAI: Error Red
  - Green Wallet: Success Green
  - ADHDeer: Warning Orange
  - Bachelor Thesis: Info Teal

## Typography

### Font Families

- **Headings**: 'Montserrat', sans-serif
- **Body**: 'Roboto', 'Helvetica', 'Arial', sans-serif

### Type Scale

```jsx
const typography = {
  h1: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700,
    fontSize: '3rem',
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h2: { /* ... */ },
  h3: { /* ... */ },
  // ...additional type styles
};
```

## Spacing

Based on an 8px grid system, with multipliers for consistency:

```jsx
const spacing = (factor) => `${8 * factor}px`;
```

## Component Patterns

### Cards

Three primary card variants:
- **Standard** - Default card with border and shadow
- **Project** - Enhanced card for project displays with image section
- **Feature** - Highlighted card with accent border

### Sections

Standardized section layouts:
- **Hero** - Full-width introduction with media
- **Content** - Standard text and media layouts
- **Gallery** - Image/video collection with lightbox
- **Outcomes** - Results presentation with metrics

### Interactive Elements

- **Buttons** - Primary, secondary, and text variants with consistent sizing
- **Links** - Standard, emphasize, and subtle variations
- **Navigation** - Header and section navigation components

## Animation Guidelines

Animation principles based on Material Motion:

```jsx
const animations = {
  durations: {
    short: 200,
    medium: 300, 
    long: 500
  },
  easings: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)'
  }
};
```

## Custom Theme Extensions

Beyond standard Material UI theme properties:

```jsx
const customExtensions = {
  customSections: {
    about: { /* ... */ },
    work: { /* ... */ },
    contact: { /* ... */ }
  },
  customComponents: {
    projectCard: { /* ... */ },
    heroVideo: { /* ... */ },
    parallax: { /* ... */ }
  },
  customEffects: {
    cardHover: { /* ... */ },
    buttonFocus: { /* ... */ }
  }
};
```

## Usage Guidelines

### Theme Hook

```jsx
import { useTheme } from '@mui/material';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      padding: theme.spacing(3),
      color: theme.palette.text.primary
    }}>
      Content
    </Box>
  );
}
```

### Styled Components

```jsx
import { styled } from '@mui/material/styles';

const StyledElement = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));
```

### Responsive Design

```jsx
<Box
  sx={{
    padding: { xs: 2, sm: 3, md: 4 },
    fontSize: { xs: '1rem', md: '1.2rem' }
  }}
>
  Responsive content
</Box>
```
