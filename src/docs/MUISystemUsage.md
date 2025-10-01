# Using MUI System in the Portfolio Project

## Project Status Update (16 April 2025)

- All layout and spacing is handled with the MUI `Box` component and `sx` prop.
- No redundant layout or utility files remain; the codebase is clean and up-to-date.

## The `sx` Prop

The `sx` prop is a shortcut for defining custom styles that has access to the theme. It accepts CSS properties using the camelCase naming convention:

```jsx
<Box sx={{ marginTop: 2, color: 'primary.main' }}>Content</Box>
```

## Accessing Theme Values

You can access any theme value directly in the `sx` prop:

```jsx
// Using spacing
<Box sx={{ mt: 2, p: 3 }}>
  {/* mt: 2 = margin-top: theme.spacing(2) */}
  {/* p: 3 = padding: theme.spacing(3) */}
</Box>

// Using colors
<Box sx={{ 
  bgcolor: 'primary.light',
  color: 'text.secondary',
  borderColor: 'divider'
}}>
  Themed Box
</Box>

// Using breakpoints
<Box sx={{ 
  width: { 
    xs: '100%', 
    sm: '80%', 
    md: '60%' 
  } 
}}>
  Responsive Box
</Box>
```

## Custom Theme Properties

You can access the custom properties we added to the theme:

```jsx
// Using design constants
<Box sx={{ 
  transition: theme => theme.designConstants.transitions.standard,
  height: theme => theme.designConstants.sizes.avatar.md
}}>
  Custom Box
</Box>

// Using custom transitions
<Box sx={{ 
  transition: theme => theme.transitions.custom.fade
}}>
  Animated Box
</Box>

// Using custom component styles
<Box sx={theme => theme.customComponents.section}>
  Section Box
</Box>
```

## Common Layout Components

### Box

`Box` is the most basic layout component:

```jsx
import { Box } from '@mui/material';

<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  <ChildComponent />
  <ChildComponent />
</Box>
```

### Container

`Container` centers content horizontally with max-width:

```jsx
import { Container } from '@mui/material';

<Container maxWidth="lg" sx={{ py: 4 }}>
  <Content />
</Container>
```

### Grid (v7, Grid v2)

`Grid` creates flexible layouts. Use Grid v2 with the `size` prop and no `item`/`xs`/`md` props:

```jsx
import Grid from '@mui/material/Grid';

<Grid container spacing={3}>
  <Grid size={{ xs: 12, md: 6 }}>
    <Content />
  </Grid>
  <Grid size={{ xs: 12, md: 6 }}>
    <Content />
  </Grid>
</Grid>
```

Notes:
- Prefer package-root imports, e.g. `import { createTheme } from '@mui/material/styles'`.
- For default props, use `DefaultPropsProvider` instead of `theme.components[..].defaultProps`.

## Benefits Over Styled Components

1. **Direct theme access**: No need to wrap components in ThemeContext
2. **Less boilerplate**: Define styles right where you use them
3. **Responsive values**: Easily define breakpoint-specific styles
4. **Theme consistency**: All styles have access to the same theme object

By using the `sx` prop consistently, you can reduce code duplication and ensure design consistency throughout the application.
