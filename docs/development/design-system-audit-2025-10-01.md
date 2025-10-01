# Design System Audit - October 1, 2025

## Executive Summary

Comprehensive audit of hardcoded values and design system violations across the codebase. This document identifies areas where components bypass the centralized design system.

## ✅ Section Number Size - FIXED

**Issue**: Section numbers in project modals were too small  
**Location**: `src/theme/presets.js` - `sectionEyebrow` preset  
**Fix Applied**:
```javascript
fontSize: {
  xs: '1.5rem',   // Increased from 1rem
  sm: '1.75rem',  // New breakpoint
  md: '2rem',     // Increased from 1.125rem
}
fontWeight: 700   // Increased from 600
```

---

## 🔴 Critical Issues - Hardcoded Values

### 1. ProjectNavigation.js
**Lines 20-21, 42-44, 65-68**

**Issue**: Hardcoded rgba() background colors
```javascript
backgroundColor: 'rgba(19, 31, 45, 0.7)'
'&:hover': { backgroundColor: 'rgba(19, 31, 45, 0.9)' }
```

**Recommendation**: Use theme tokens or create navigation-specific tokens
```javascript
// Should be:
background: theme.palette.mode === 'dark'
  ? modalFooterTokens.controls.glassmorphic.dark.background
  : modalFooterTokens.controls.glassmorphic.light.background
```

---

### 2. ProjectHeader.js
**Lines 39-40, 51-53**

**Issue**: Hardcoded fontSize values
```javascript
fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
```

**Recommendation**: Use typography presets
```javascript
// Should use:
const titlePreset = getTypographyPreset(theme, 'overlayTitle');
const subtitlePreset = getTypographyPreset(theme, 'overlaySubtitle');
```

---

### 3. ActionButton.js
**Line 94**

**Issue**: Hardcoded fontSize logic
```javascript
fontSize: size === 'large' ? '0.875rem' : '0.75rem'
```

**Recommendation**: Create button size tokens
```javascript
// In theme/components/buttons.js:
export const buttonTokens = {
  size: {
    small: { fontSize: '0.75rem' },
    medium: { fontSize: '0.8125rem' },
    large: { fontSize: '0.875rem' },
  }
};
```

---

### 4. ActionButtonGroup.js
**Lines 203-205, 215-216**

**Issue**: Hardcoded spacing and fontSize
```javascript
py: 1.5,
px: 2,
fontSize: '0.875rem'
```

**Recommendation**: Use spacing presets and typography tokens

---

### 5. Bachelor Thesis Project Data
**Lines 171-175, 181, 199-200, 215-219, 225, 243-244**

**Issue**: Extensive hardcoded values in custom cards
- Hardcoded rgba() colors: `rgba(102, 126, 234, 0.3)`, `rgba(255, 255, 255, 0.9)`
- Hardcoded box shadows
- Hardcoded fontSize values
- Hardcoded padding values

**Recommendation**: Create card variant tokens or use existing card components

---

### 6. Master Thesis Backup File
**masterThesis_backup.js**

**Issue**: Legacy file with 715+ hardcoded values (truncated in grep)  
**Recommendation**: **DELETE THIS FILE** - It's a backup and contains outdated patterns

---

## ⚠️ Moderate Issues

### 1. Inline rgba() Usage Pattern
Multiple files use hardcoded rgba() values for backgrounds and shadows. These should reference:
- `modalFooterTokens.controls.glassmorphic`
- Theme palette colors with alpha channels
- Design token color utilities

### 2. Direct Spacing Values
Many components use direct numeric spacing (`px: 3`, `py: 1.5`) instead of:
- `theme.spacing()` function
- Spacing presets from `src/theme/presets.js`

### 3. fontSize Inconsistency
Typography sizes are sometimes hardcoded instead of using:
- Typography presets (`sectionTitle`, `sectionEyebrow`, etc.)
- Theme typography scale
- Responsive typography tokens

---

## ✅ Good Patterns Found

### 1. Modal Footer (Recently Fixed)
- Uses `modalFooterTokens` consistently
- Proper glassmorphic background tokens
- Theme-aware color switching
- Responsive values via design tokens

### 2. Typography Presets System
- `src/theme/presets.js` provides centralized typography
- Responsive breakpoints built-in
- Theme-aware color application

### 3. Spacing Presets
- Centralized page padding
- Section vertical spacing
- Card content spacing

---

## 📋 Action Items

### High Priority
1. **Create navigation tokens** for ProjectNavigation.js backgrounds
2. **Refactor ProjectHeader.js** to use typography presets
3. **Delete masterThesis_backup.js** - legacy file
4. **Create button size tokens** for consistent button typography
5. ✅ **FIXED: Technology icon colors** - Now white in both themes
6. ✅ **FIXED: Section number sizes** - Increased 50-78%

### Medium Priority
7. **Audit bachelor thesis custom cards** - move to reusable card variants
8. **Standardize ActionButton** sizing system
9. **Create rgba() utility** for theme-aware alpha channels
10. **⭐ Card Variant Color System** - Pass cardVariant (primary/secondary/info/success/warning/error) from project data through to section eyebrow color for visual separation between projects

### Low Priority
11. **Document design token usage** in AGENTS.md
12. **Create ESLint rule** to prevent hardcoded rgba() values
13. **Add TypeScript** for better design token enforcement

---

## 📖 Design System Usage Guidelines

### DO ✅
```javascript
// Use typography presets
const titlePreset = getTypographyPreset(theme, 'sectionTitle');
<Typography {...titlePreset} />

// Use spacing presets
const padding = getSpacingPreset('pageHorizontal');

// Use design tokens
background: modalFooterTokens.controls.glassmorphic.dark.background

// Use theme spacing
px: theme.spacing(2)
```

### DON'T ❌
```javascript
// Hardcoded colors
backgroundColor: 'rgba(19, 31, 45, 0.7)'

// Hardcoded sizes
fontSize: '1.75rem'
px: 3

// Hardcoded shadows
boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'

// Conditional logic for sizing
fontSize: size === 'large' ? '0.875rem' : '0.75rem'
```

---

## 🎯 Success Metrics

**Current State**:
- ✅ Modal footer: 100% token-driven
- ✅ Section numbers: Increased and token-driven
- ⚠️ Project data files: ~40% hardcoded values
- ⚠️ Navigation components: ~60% hardcoded values
- ⚠️ Button components: ~30% hardcoded values

**Target State**:
- 🎯 90%+ of styling from design tokens
- 🎯 All colors from theme palette
- 🎯 All spacing from theme.spacing() or presets
- 🎯 All typography from presets

---

## 📝 Notes

- **masterThesis_backup.js** should be removed - it's a legacy backup file with 715+ hardcoded patterns
- Recent glassmorphic design system work is exemplary - use as template
- Consider creating a design tokens documentation page
- TypeScript would help enforce token usage at compile time

---

## 🎨 Future Enhancement: Card Variant Color System

Each project has a `cardVariant` property that determines its card color:
- Master Thesis: `primary` (blue)
- Resonant Relaxation: `secondary` (teal)
- Bachelor Thesis: `info` (light blue)
- Green Wallet: `success` (green)
- ADHDeer: `warning` (orange)
- AMIAI: `error` (red)

**Proposed Enhancement**: Pass `cardVariant` through component hierarchy (ProjectFullContent → ProjectSections → ProjectSection) to use project-specific colors for section eyebrows instead of always using `secondary`. This would create visual color separation between projects based on their content type (haptic, development, audio, research, etc.).

**Implementation Notes**:
1. Update `getTypographyPreset` to accept options: `getTypographyPreset(theme, 'sectionEyebrow', { cardVariant })`
2. Modify `sectionEyebrow` preset to use `theme.palette[cardVariant].main`
3. Pass project.cardVariant through ProjectFullContent → ProjectSection
4. Fallback to `secondary` if cardVariant not provided

---

_Audit Date: October 1, 2025_  
_Auditor: AI Assistant_  
_Status: Initial Audit Complete + Fixes Applied_  
_Fixed: Technology icon colors (white in both themes), Section number sizes (increased 50-78%)_
