---
description: Practical guide to MUI v7 (Grid v2) in this repo
---

# MUI v7 Migration & Usage Guide

Last updated: 2025-10-01

This project runs Material UI v7.x with Emotion in CRA. Follow these rules for compatibility and consistency.

## Current versions (package.json)

- @mui/material 7.x
- @mui/icons-material 7.x
- @mui/system 7.x
- @mui/lab 7.x (beta acceptable)
- @mui/x-tree-view 8.x (MUI X uses independent versioning)

## Key rules

- Grid v2 only
  - Import Grid from '@mui/material/Grid'
  - Use `size` instead of legacy `xs|sm|md|lg|xl` props
  - Do not use `item`; all Grid children are items by default in v7
  - Avoid Unstable_Grid2 / GridLegacy

- No deep imports
  - Do: `import { createTheme } from '@mui/material/styles'`
  - Don’t: `@mui/material/styles/createTheme` (fails in v7 package exports)

- Default props
  - Prefer `DefaultPropsProvider` rather than `theme.components[..].defaultProps`

- API conventions
  - Prefer `slot`/`slotProps` instead of legacy class-based overrides

- Styling engine
  - Emotion stays the default for CRA
  - Pigment CSS is optional; adopt only with the official adapter and codemods

## Grid v2 quick examples

Before (legacy Grid):

```jsx
import { Grid } from '@mui/material';

<Grid container spacing={3}>
  <Grid item xs={12} md={6}>
    <Content />
  </Grid>
</Grid>
```

After (v7 Grid v2):

```jsx
import Grid from '@mui/material/Grid';

<Grid container spacing={3}>
  <Grid size={{ xs: 12, md: 6 }}>
    <Content />
  </Grid>
</Grid>
```

Grow item example:

```jsx
<Grid container>
  <Grid size="grow">One</Grid>
  <Grid size="grow">Two</Grid>
</Grid>
```

## Codemods (reference)

- Grid props update (v7):

```bash
npx @mui/codemod@next v7.0.0/grid-props src
```

## DefaultPropsProvider example

Before (theme defaultProps):

```jsx
const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
    },
  },
});
```

After (provider):

```jsx
import DefaultPropsProvider from '@mui/material/DefaultPropsProvider';

<DefaultPropsProvider value={{
  MuiButtonBase: { disableRipple: true },
}}>
  <App />
</DefaultPropsProvider>
```

## Optional: Pigment CSS

- Keep Emotion for CRA unless you explicitly migrate
- If adopting Pigment CSS later:
  - Replace imports (e.g., `@mui/material-pigment-css/Grid`)
  - Update `useTheme` import to adapter
  - Move dynamic styles into CSS variables where required

## React 18 note

- If needed, align `react-is` to the React version via `overrides`/`resolutions`

## Checklist for PRs

- [ ] All Grid usage is Grid v2 with `size`
- [ ] No deep imports under `@mui/*`
- [ ] Default props via `DefaultPropsProvider`
- [ ] slot/slotProps preferred over legacy classes
- [ ] No introduction of Pigment CSS unless intentionally migrated

## Official docs

- Upgrade to v7: https://mui.com/material-ui/migration/upgrade-to-v7/
- Upgrade to Grid v2: https://mui.com/material-ui/migration/upgrade-to-grid-v2/
- Deprecated APIs → slot/slotProps: https://mui.com/material-ui/migration/migrating-from-deprecated-apis/
- Pigment CSS (optional): https://mui.com/material-ui/migration/upgrade-to-v6/migrating-to-pigment-css/
