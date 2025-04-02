# Design System Documentation

This document outlines the design system architecture and implementation guidelines for the Portfolio project.

## Table of Contents

1. [Theme Structure](#theme-structure)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Animation](#animation)
6. [Component Patterns](#component-patterns)
7. [Utilities](#utilities)
8. [Best Practices](#best-practices)

## Theme Structure

The design system is implemented using Material-UI's theming capabilities, with custom extensions for project-specific needs. The main theme file (`theme.js`) defines global design tokens and is organized into:

- **Color palette**: Base colors and functional color assignments
- **Typography**: Font families, sizes, weights, and variants
- **Spacing**: Standard spacing units and presets
- **Animations**: Duration, easing functions, and presets
- **Shape**: Border radii and other shape properties
- **Breakpoints**: Responsive breakpoint definitions
- **Elevations**: Shadow levels for depth
- **Custom components**: Project-specific component styles

## Color System

Colors are organized into:

- **Base colors**: Reusable color variables defined at the top of theme.js
- **Functional colors**: Semantic color assignments in the palette (primary, secondary, etc.)
- **UI colors**: Specific use case colors (card.background, divider, etc.)

Example usage:
```jsx
// ✅ DO use theme color references
<Box sx={{ backgroundColor: theme.palette.background.paper }}>

// ❌ DON'T use hardcoded colors
<Box sx={{ backgroundColor: '#131F2D' }}>
```

## Typography

Typography follows a consistent hierarchy:

- **Font family**: IBM Plex Mono (primary)
- **Variants**: h1-h6, body1-2, subtitle1-2, caption, overline, button
- **Custom variants**: projectTitle, chipText

Example usage:
```jsx
// ✅ DO use typography variants
<Typography variant="h4">Heading</Typography>

// ❌ DON'T hardcode font styles
<div style={{ fontSize: '24px', fontWeight: 500 }}>Heading</div>
```

## Spacing

Spacing uses an 8px base unit with semantic multipliers:

- **xs**: 4px (0.5x)
- **sm**: 8px (1x)
- **md**: 16px (2x)
- **lg**: 24px (3x)
- **xl**: 32px (4x)
- **xxl**: 48px (6x)
- **section**: 64px (8x)

Example usage:
```jsx
// ✅ DO use theme spacing
<Box sx={{ padding: theme.spacing(2) }}>  // 16px

// ✅ DO use responsive spacing
<Box sx={{ mt: { xs: 2, md: 4 } }}>

// ❌ DON'T use hardcoded spacing values
<Box sx={{ padding: '16px' }}>
```

## Animation

Animations are standardized with:

- **Durations**: short (300ms), medium (500ms), long (800ms)
- **Easings**: standard, accelerate, decelerate, sharp
- **Presets**: fadeIn, slideUp, slideIn

Example usage with framer-motion:
```jsx
import { getAnimation } from '../utils/themeUtils';

// ✅ DO use animation presets
<motion.div
  initial={getAnimation(theme, 'fadeIn').initial}
  animate={getAnimation(theme, 'fadeIn').animate}
  transition={getAnimation(theme, 'fadeIn').transition}
>
  Content
</motion.div>

// ❌ DON'T hardcode animations
<motion.div 
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

## Component Patterns

### Cards
Cards should use ThemedCard component which provides:
- Consistent elevation
- Theme-based animations
- Standard padding
- Proper typography hierarchy

### Buttons
Buttons should use theme.customButtons styles:
- contact
- close
- etc.

### Layout Containers
Layout containers should use theme.customSections styles.

## Utilities

The `themeUtils.js` file provides helper functions:

- **responsivePadding**: Create responsive padding objects
- **getElevation**: Get consistent elevation shadow styles
- **getAnimation**: Get animation presets for framer-motion
- **createTransition**: Create transition strings for CSS
- **getColorWithAlpha**: Create transparent color variations
- **responsiveStyles**: Apply styles at different breakpoints
- **getShadow**: Get shadow styles with different intensities

## Best Practices

### Do:
- ✅ Use theme references for all visual properties
- ✅ Use responsive theme values for different screen sizes
- ✅ Use animation presets for consistent motion
- ✅ Use utility functions for complex theme operations
- ✅ Use (theme) => {...} syntax for accessing theme in sx props

### Don't:
- ❌ Use hardcoded colors, sizes, or spacing values
- ❌ Create one-off animation configurations
- ❌ Mix and match different elevation systems
- ❌ Duplicate styles that could be shared through theme
