# Glassmorphism Design Pattern

## Overview

Glassmorphism is a visual design pattern used throughout the portfolio to create translucent, frosted-glass effects. This pattern provides visual hierarchy while maintaining content visibility and creating a modern, layered aesthetic.

## Design Tokens

### Centralized Token System

Glassmorphic design tokens are now centralized in `src/theme/components/modalFooter.js` for the modal footer navigation. This provides:
- Responsive blur values optimized for mobile performance
- Consistent sizing across all controls
- Theme-aware color values
- Reusable patterns for other components

### Base Glassmorphic Style

The glassmorphic effect follows these specifications:

```javascript
// Dark mode
background: 'rgba(255, 255, 255, 0.15)'
backdropFilter: 'blur(12px)'
WebkitBackdropFilter: 'blur(12px)'
border: '1px solid ${theme.palette.divider}'

// Light mode
background: 'rgba(5, 38, 45, 0.20)'
backdropFilter: 'blur(12px)'
WebkitBackdropFilter: 'blur(12px)'
border: '1px solid ${theme.palette.divider}'
```

### Layered Glassmorphism (Darker Variant)

For controls that sit on top of glassmorphic surfaces, use a darker variant for better contrast and accessibility:

```javascript
// Dark mode
background: 'rgba(255, 255, 255, 0.08)'
backdropFilter: 'blur(8px)'
WebkitBackdropFilter: 'blur(8px)'
border: '1px solid ${theme.palette.divider}'

// Light mode
background: 'rgba(5, 38, 45, 0.12)'
backdropFilter: 'blur(8px)'
WebkitBackdropFilter: 'blur(8px)'
border: '1px solid ${theme.palette.divider}'
```

### Interaction States

**Hover State (Base Glassmorphic):**
```javascript
// Dark mode
background: 'rgba(255, 255, 255, 0.25)'
backdropFilter: 'blur(12px)'
WebkitBackdropFilter: 'blur(12px)'

// Light mode
background: 'rgba(5, 38, 45, 0.30)'
backdropFilter: 'blur(12px)'
WebkitBackdropFilter: 'blur(12px)'
```

**Hover State (Layered Glassmorphic):**
```javascript
// Dark mode
background: 'rgba(255, 255, 255, 0.15)'
backdropFilter: 'blur(10px)'
WebkitBackdropFilter: 'blur(10px)'
transform: 'scale(1.05)'

// Light mode
background: 'rgba(5, 38, 45, 0.20)'
backdropFilter: 'blur(10px)'
WebkitBackdropFilter: 'blur(10px)'
transform: 'scale(1.05)'
```

**Active/Pressed State:**
```javascript
// Dark mode
background: 'rgba(255, 255, 255, 0.20)'
backdropFilter: 'blur(8px)'
WebkitBackdropFilter: 'blur(8px)'
transform: 'scale(0.98)'

// Light mode
background: 'rgba(5, 38, 45, 0.25)'
backdropFilter: 'blur(8px)'
WebkitBackdropFilter: 'blur(8px)'
transform: 'scale(0.98)'
```

## Using Design Tokens

### Modal Footer Tokens

Import and use the centralized tokens for consistent styling:

```javascript
import modalFooterTokens from '../../theme/components/modalFooter';
import { useTheme } from '@mui/material';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <IconButton
      sx={{
        width: modalFooterTokens.controls.size,
        height: modalFooterTokens.controls.size,
        background: theme.palette.mode === 'dark'
          ? modalFooterTokens.controls.glassmorphic.dark.background
          : modalFooterTokens.controls.glassmorphic.light.background,
        backdropFilter: theme.palette.mode === 'dark'
          ? modalFooterTokens.controls.glassmorphic.dark.backdropFilter
          : modalFooterTokens.controls.glassmorphic.light.backdropFilter,
        // ... other styles
      }}
    >
      <Icon />
    </IconButton>
  );
}
```

### Responsive Blur Values

The design tokens include responsive blur values for better mobile performance:

```javascript
// Footer base
backdropFilter: { xs: 'blur(10px)', md: 'blur(12px)' }

// Controls
backdropFilter: { xs: 'blur(6px)', md: 'blur(8px)' }

// Hover state
backdropFilter: { xs: 'blur(8px)', md: 'blur(10px)' }
```

## Usage Examples

### 1. Glassmorphic Button (MUI Component Override)

The theme system includes a `glassmorphic` button variant:

```javascript
import { Button } from '@mui/material';

<Button variant="glassmorphic">
  Click Me
</Button>
```

### 2. Custom Glassmorphic Surface

For custom components, apply the glassmorphic style directly:

```javascript
import { Box, useTheme } from '@mui/material';

function GlassmorphicCard() {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        background: theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.15)'
          : 'rgba(5, 38, 45, 0.20)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        p: 3,
      }}
    >
      Content
    </Box>
  );
}
```

### 3. Sticky Navigation Footer with Layered Controls (Project Modal)

The project modal footer uses glassmorphism for the base surface, with darker glassmorphic buttons layered on top for better contrast:

```javascript
// Footer base (lighter glassmorphic surface)
<Paper
  elevation={3}
  square
  sx={{
    position: 'absolute',
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.15)'
      : 'rgba(5, 38, 45, 0.20)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderTop: '1px solid',
    borderColor: 'divider',
  }}
>
  {/* Arrow buttons with darker glassmorphic background */}
  <IconButton
    sx={{
      background: theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(5, 38, 45, 0.12)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      border: `1px solid ${theme.palette.divider}`,
      '&:hover': {
        background: theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.15)'
          : 'rgba(5, 38, 45, 0.20)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        transform: 'scale(1.05)',
      },
    }}
  >
    <ArrowBackIcon />
  </IconButton>
</Paper>
```

### 4. Header/AppBar

The main application header uses a lighter glassmorphic effect:

```javascript
<AppBar
  sx={{
    backgroundColor: isScrolled 
      ? theme.palette.background.paper
      : transparentBgColor,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  }}
>
  {/* Header content */}
</AppBar>
```

## Current Implementations

### Components Using Glassmorphism

1. **Header** (`src/components/header/Header.js`)
   - Blur: 10px
   - Semi-transparent background with theme-aware colors

2. **Project Modal Footer** (`src/components/work/ProjectModal.js`)
   - Base footer: Blur 12px (lighter glassmorphic surface)
   - Navigation controls: Blur 8px (darker layered glassmorphic buttons)
   - Sticky navigation bar with arrow controls, theme toggle, and project title
   - Demonstrates layered glassmorphism pattern for improved contrast and accessibility

3. **Hero Scene Labels** (`src/components/hero/background3d/`)
   - Blur: 8px
   - Interactive scene control buttons

4. **Skill Tags** (`src/components/common/SkillTagList.js`)
   - Blur: 8px
   - Technology tag chips

5. **Project Action Buttons** (`src/components/work/ProjectActionButtons.js`)
   - Blur: 8px
   - CTA buttons on project cards

6. **Enhanced Footer Card** (`src/components/contact/EnhancedFooterCard.js`)
   - Blur: varies
   - Contact section cards

## Design Principles

### When to Use Glassmorphism

✅ **Good Use Cases:**
- Overlays that need to maintain context visibility
- Floating navigation elements
- Modal footers and headers
- Interactive controls over complex backgrounds
- Cards that need visual separation without blocking content

❌ **Avoid Using For:**
- Primary content areas (reduces readability)
- Text-heavy sections
- Elements requiring high contrast
- Accessibility-critical UI (ensure sufficient contrast)

### Accessibility Considerations

1. **Contrast Ratios**: Always verify text contrast meets WCAG AA standards (4.5:1 for normal text)
2. **Fallbacks**: Include solid background fallback for browsers without backdrop-filter support
3. **Focus States**: Ensure focus indicators are visible against glassmorphic backgrounds
4. **Reduced Motion**: Respect `prefers-reduced-motion` for blur transitions

### Performance Notes

- `backdrop-filter` can be GPU-intensive; use sparingly
- Always include `-webkit-backdrop-filter` for Safari support
- Consider reducing blur radius on mobile devices if performance issues arise
- Test on lower-end devices to ensure smooth scrolling

## Browser Support

- **Chrome/Edge**: Full support (backdrop-filter)
- **Firefox**: Full support (backdrop-filter)
- **Safari**: Requires `-webkit-backdrop-filter` prefix
- **Fallback**: Solid semi-transparent background for unsupported browsers

## Related Documentation

- [Theme System](./theme-system.md) - Core theme architecture
- [Button Patterns](./button-patterns.md) - Button variants including glassmorphic
- [Components](./components.md) - Component-specific styling patterns
- [MUI Usage](./mui-usage.md) - Material-UI integration guidelines

## Future Enhancements

- [ ] Add glassmorphic variant to Chip component
- [ ] Create reusable `GlassmorphicBox` wrapper component
- [ ] Add CSS custom properties for easier theme customization
- [ ] Document reduced-motion alternatives
- [ ] Add Storybook examples for all glassmorphic variants
