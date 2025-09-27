# React Bits Integration Guide

## Overview

[React Bits](https://reactbits.dev/get-started/introduction) is a collection of open-source React components and content patterns designed for marketing, editorial, and portfolio sites. The library focuses on:

- **Content-rich sections** such as hero blocks, feature highlights, testimonials, pricing, FAQ, and call-to-action layouts.
- **Accessible building blocks** that ship with sensible HTML structure, keyboard handling, and responsive breakpoints.
- **Composable primitives** that can be mixed and matched to assemble bespoke landing pages without starting from scratch.

Adding React Bits to the design system documentation gives us a ready-made set of references when we need to extend beyond the portfolio's current component inventory.

## Fit With the Portfolio Design System

| Consideration | React Bits | Portfolio Baseline |
| --- | --- | --- |
| **Component paradigm** | Pre-styled marketing sections, often Tailwind-style utility classes | Material UI (+ custom tokens) with `sx` driven styling |
| **Theming** | Ships with its own design tokens and CSS variables | Centralized tokens in `src/theme/**` + global ThemeProvider |
| **Interactivity** | Mostly stateless composition, occasional simple interactive widgets | Controlled by portfolio logic (modals, galleries, data loaders) |
| **Accessibility** | Focus on semantic HTML, ARIA patterns, and keyboard support | Same priority; we must ensure adaptations keep semantics intact |

The main compatibility gap is *styling*. React Bits expects utility classes (Tailwind) or CSS variables, while we rely on the MUI theme. We can still leverage the markup and structural patterns by wrapping the components and injecting our own `sx` rules.

## Integration Strategy

1. **Audit component targets**
   - Prioritize sections we currently hand-code (hero, testimonials, CTA, FAQ) that overlap with React Bits offerings.
   - Document the props each React Bits component expects (content arrays, media, actions).

2. **Create adapter wrappers**
   - Build a thin wrapper that imports the React Bits component, then overrides classes via the `className` prop or wraps the output in MUI primitives (`Box`, `Stack`).
   - Map typography/color tokens to the theme so spacing, borders, and font sizes stay consistent.

3. **Expose theme-aware slots**
   - When React Bits relies on CSS variables (e.g., `--rb-primary`), set them from `useTheme`.
   - For class-based styles, supply our own `sx` overrides that mirror the same layout but express them with design tokens (spacing scale, typography presets, color roles).

4. **Package as portfolio components**
   - Create namespaced exports inside `src/components/marketing/` (e.g., `MarketingHero`, `MarketingTestimonials`).
   - Document prop contracts so downstream pages can stay library-agnostic—the wrapper hides React Bits specifics.

5. **Validate accessibility & responsiveness**
   - Ensure adaptations preserve ARIA roles and keyboard behaviour.
   - Test across breakpoints; adjust with `theme.breakpoints` utilities instead of hard-coded media queries.

## Example Adapter Pattern

```jsx
// src/components/marketing/TestimonialsSection.js
import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Testimonials } from 'react-bits'; // wrapper around the library export

const TestimonialsSection = ({ items, eyebrow, title, cta }) => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 6, md: 10 },
        borderRadius: theme.shape.borderRadius * 2,
        boxShadow: theme.shadows[4],
        '--rb-accent': theme.palette.primary.main,
        '--rb-text-muted': theme.palette.text.secondary,
      }}
    >
      <Testimonials
        eyebrow={eyebrow}
        title={title}
        cta={cta}
        items={items}
        className="portfolio-react-bits"
      />
    </Box>
  );
};

export default TestimonialsSection;
```

- **Theme mapping**: CSS variables like `--rb-accent` are set from the MUI palette.
- **Spacing**: Expressed with `sx` responsive values instead of Tailwind classes.
- **Encapsulation**: The wrapper keeps React Bits contained so replacing the implementation later is low-risk.

> ⚠️ *Import path (`react-bits`) is illustrative—confirm actual package name/exact exports when the dependency is added.*

## Proposed Component Targets

| Section Type | Current Status | React Bits Candidate | Action |
| --- | --- | --- | --- |
| Hero with accent bars | Custom implementation in `HeroContent`, `TitleOverlay` | Hero Banner, Accent Header | Use as inspiration for new marketing landing page variant |
| Testimonials / Social proof | Not yet standardized | Testimonials, Logos Marquee | Build wrapper and add to design system backlog |
| Pricing / Feature comparison | Missing entirely | Pricing Table, Feature Grid | Prototype wrappers for future case study pages |
| FAQ accordion | No dedicated component | FAQ Accordion | Compare against existing `Accordion` usage and adopt theming |
| Statistic highlights | Hard-coded in sections | Stats Grid, Metric Callout | Convert to reusable tokens-first implementation |

## Implementation Plan & Backlog

1. **Dependency evaluation**
   - Install the package in a feature branch and inspect bundle size + peer dependencies.
   - Confirm tree-shaking support so unused components do not inflate the bundle.

2. **Wrapper toolkit**
   - Define a helper that converts our typography presets (`getTypographyPreset`) into the token structure React Bits expects.
   - Create a shared `ReactBitsProvider` (optional) that sets CSS variables from the theme once per subtree.

3. **Documentation updates**
   - Add Storybook entries for each adopted component (shows React Bits original vs. themed wrapper).
   - Extend `docs/design-system/components.md` with usage notes and do/don't examples.

4. **Testing**
   - Snapshot tests verifying wrapper output against design tokens.
   - Visual regression (Chromatic or Percy) after integration to catch styling drift.

5. **Roll-out**
   - Start with marketing-focused pages (landing page, case study intros) before adapting core portfolio grids.
   - Monitor Lighthouse scores for layout shifts or accessibility warnings introduced by new markup.

## Risks & Mitigations

- **Styling clashes**: Utility classes may conflict with global CSS. Mitigate by scoping wrappers and relying on `sx` overrides.
- **Bundle size**: Import components lazily or cherry-pick modules to avoid large payloads.
- **Design drift**: Create design tokens parity (spacing, radius) before adopting new sections.
- **Maintenance**: Track library releases; add version pinning and changelog review into dependency updates.

## Next Steps

- [ ] Spin up a spike branch to install React Bits and verify compatibility with current tooling (Vite/CRA, CSS loaders).
- [ ] Prototype a single section (Testimonials) and capture screenshots for design review.
- [ ] Update Storybook or the Theme Preview page with toggles that demonstrate React Bits-based sections alongside native ones.
- [ ] Decide whether to include React Bits in the default bundle or load on-demand for marketing subpages.

Document maintained by the design system team; revisit after the first adapter lands to capture lessons learned.
