# Portfolio Design System

## Project Status Update (16 April 2025)

- The design system is now fully modular and decentralized. All design tokens (colors, spacing, typography, breakpoints, etc.) are defined in their own files in `src/theme/`.
- Light and dark color palettes are defined in `src/theme/palette/light.js` and `src/theme/palette/dark.js`.
- The `tokens.js` file simply aggregates and exports all tokens from the modular files.
- The `ThemeDebugger` component is available in development for live inspection of the current theme.

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
9. [Project Section Schema & Modal Structure](#project-section-schema--modal-structure)

## Core System Structure

The design system is modularized into specialized files:

- **palette/light.js** and **palette/dark.js** – Light and dark color palettes (single source of truth for theme colors)
- **colors.js** – Color utilities and semantic color helpers
- **typography.js** – Text styles, font families, and typographic scale
- **spacing.js** – Spacing units and layout measurements
- **breakpoints.js** – Responsive design breakpoints
- **animations.js** – Motion design principles, durations, and easings
- **shadows.js** – Shadow and elevation tokens
- **shape.js** – Border radius and shape tokens
- **components.js** – Shared component styling
- **design/tokens.js** – Aggregates all tokens from the above files for export and design tool integration
- **index.js** – Central export hub for all theme modules and theme creation logic

## Color System

### Light & Dark Palettes

Color palettes are defined in their own files:

```js
// src/theme/palette/light.js
export const lightColors = { ... };

// src/theme/palette/dark.js
export const darkColors = { ... };
```

To use them in your theme:
```js
import { createLightPalette, createDarkPalette } from './design/tokens';
const lightPalette = createLightPalette();
const darkPalette = createDarkPalette();
```

### Semantic Color Usage
- Use `theme.palette.<role>.<shade>` in your components and sx props.
- Add new semantic roles to the palette files as needed.

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
- **ProjectNavigation** - Modal controls for previous and next projects
- **DynamicSection** - Flexible renderer for modal sections
- **ProjectActionButtons** - Consistent actions for external links and prototypes

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

## Theme Debugger

A development-only component (`src/components/dev/ThemeDebugger.js`) is available. It provides a floating button to open a drawer with live views of the current palette, typography, spacing, breakpoints, and animation tokens. Add it to your app root for development:

```js
import ThemeDebugger from './components/dev/ThemeDebugger';
// ...
{process.env.NODE_ENV === 'development' && <ThemeDebugger />}
```

## Usage Guidelines

- Always use the theme and tokens for all design values.
- Never hardcode colors, spacing, or typography in components.
- For new design tokens, add them to the appropriate modular file.
- Use the Theme Debugger to inspect and verify theme values during development.

## Example: Using the Modular Design System

```js
import { useTheme } from '@mui/material';

function MyComponent() {
  const theme = useTheme();
  return (
    <Box sx={{
      bgcolor: 'background.paper',
      color: 'text.primary',
      p: theme.spacing(3),
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[2],
    }}>
      Themed content
    </Box>
  );
}
```

## Project Section Schema & Modal Structure

Project data is loaded through `getProjects()` and fed into `Work.js` via the
`useDataLoader` hook. Each project modal uses `DynamicSection` to render sections
based on the type and layout fields.

### Section Object Schema

Each project section should follow this schema:

```js
{
  id: string,                // Unique section ID (e.g. 'section-overview')
  type: string,              // Section type: 'default', 'gallery', 'outcomes', 'takeaways', 'prototype', 'custom', etc.
  title: string,             // Section title
  subtitle?: string,         // Optional subtitle
  content?: ReactNode,       // Main content (text, JSX, etc.)
  media?: object|array,      // Media object or array (image, video, gallery)
  layout?: string,           // 'textLeft', 'textRight', 'textOnly', 'mediaOnly', 'gallery', etc.
  takeaways?: array,         // Array of key takeaways (strings or objects)
  outcomes?: { title: string, points: array }, // Outcomes object
  actions?: array,           // Array of action/link objects
  anchor?: string,           // Optional anchor for deep-linking
  navigable?: boolean,       // If false, section is not shown in navigation
  customComponent?: ReactNode // For advanced custom rendering
}
```

### Section Types & Rendering

| type         | Rendered By           | Description                                  |
|--------------|----------------------|----------------------------------------------|
| default      | ProjectSection       | Standard text/media layout                   |
| gallery      | ProjectGallery       | Image/video gallery with lightbox            |
| outcomes     | OutcomesList         | List of project outcomes/metrics             |
| takeaways    | TakeawaysList        | List of key takeaways                        |
| prototype    | PrototypeShowcase    | Interactive prototype/iframe/modal           |
| custom       | customComponent      | Custom React component for advanced cases    |

### Example Section Array

```js
const sections = [
  {
    id: 'section-overview',
    type: 'default',
    title: 'Project Overview',
    content: <Typography>...</Typography>,
    media: { type: 'image', src: '...' },
    layout: 'textLeft',
    anchor: 'overview',
    navigable: true
  },
  {
    id: 'section-gallery',
    type: 'gallery',
    title: 'Screenshots',
    media: [ ... ],
    anchor: 'gallery',
    navigable: true
  },
  {
    id: 'section-outcomes',
    type: 'outcomes',
    title: 'Results',
    outcomes: { title: 'Key Results', points: [ ... ] },
    anchor: 'results',
    navigable: true
  },
  {
    id: 'section-custom',
    type: 'custom',
    title: 'Interactive Demo',
    customComponent: <MyCustomDemoComponent />, 
    anchor: 'demo',
    navigable: false // Not shown in navigation
  }
];
```

### Deep-Linking & Navigation
- Use the `anchor` property for section deep-linking (e.g. `#overview`).
- Use `navigable: false` for sections that should not appear in navigation.

### Accessibility
- All sections should use semantic HTML and ARIA roles where appropriate.
- Media must have descriptive alt text.
- Navigation should be keyboard accessible.

### Notes
- This schema enables flexible, future-proof project modals.
- Update all project data and rendering logic to follow this structure.
