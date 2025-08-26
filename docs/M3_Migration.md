# Material Design 3 Migration Guide

This document provides an overview of the changes made to migrate the project from Material-UI (MUI v4/v5) to Google's Material Design 3 (M3).

## What is Material Design 3?

Material Design 3 is Google's latest design system that introduces a more expressive, adaptable, and personal approach to UI. It features dynamic color schemes, updated typography, and new component designs that focus on accessibility and user experience.

## Key Changes

### 1. Theme Configuration

The central `theme.js` file has been updated to use Material Design 3 tokens and structure:

- Replaced `createTheme` with `experimental_extendTheme` from MUI
- Implemented the M3 color system with primary, secondary, and tertiary colors
- Added surface variants (bright, dim, container, etc.)
- Updated typography to match M3 naming conventions (displayLarge, headlineMedium, etc.)
- Implemented the M3 elevation system with 6 distinct levels

### 2. Theme Context

Updated `ThemeContext.js` to:

- Use the `THEME_ID` constant from MUI styles
- Better support light/dark mode switching with the M3 token system

### 3. Components

Various components have been updated to use M3 styling:

#### Buttons (`ActionButton.js`)

- Updated variant names (`contained` → `filled`, added `tonal`)
- Adjusted styling to match M3 specifications (rounded corners, no text transform)
- Added variant mapping to support both legacy and new variant names

#### Cards (`ProjectCard.js`)

- Updated to use M3 surface tokens and elevation
- Adjusted border radius using the M3 corner size system

#### Chips (`SkillTagList.js`)

- Updated to use M3 chip variants (`filled`, `outlined`)
- Adjusted styling for label padding and font weight

## M3 Token Reference

A reference map of M3 color tokens has been added to help with future development:

```javascript
export const m3ColorTokens = {
  // Surface colors
  surfaceBright: 'surface.bright',
  surfaceContainer: 'surface.container',
  surfaceContainerHigh: 'surface.containerHigh',
  // ... and more
};
```

## Usage Guidelines

### Components

When using components with the updated theme:

1. **Buttons**: Use M3 variants like `filled`, `outlined`, `text`, and `tonal`

   ```jsx
   <Button variant="filled" color="primary">Click Me</Button>
   ```

2. **Surface Containers**: Use M3 surface tokens for backgrounds

   ```jsx
   <Box sx={{ backgroundColor: theme.palette.surface.containerLow }}>
     {/* Content */}
   </Box>
   ```

3. **Typography**: Use M3 typography variants

   ```jsx
   <Typography variant="headlineMedium">Headline</Typography>
   <Typography variant="bodyLarge">Body text</Typography>
   ```

### Colors

The M3 color system uses:

- **Primary**: Main brand color
- **Secondary**: Complementary color to primary
- **Tertiary**: (Previously accent) Additional accent color
- **Surface**: Various container backgrounds with different emphasis levels
- **On-** prefix colors: Text and icon colors designed to go on top of specific backgrounds

## Next Steps

1. Continue migrating more components to use M3 styling
2. Update any custom components to leverage M3 tokens
3. Ensure proper accessibility with the new color system
4. Test the theme in both light and dark modes

For more information on Material Design 3, see [Google's Material Design documentation](https://m3.material.io/).
