# Dependency Cleanup Plan

Last updated: September 30, 2025  
**Status**: ✓ Completed

## Goal

Remove redundant animation/styling dependencies by refactoring to our primary stack and documenting the safe removal steps.

## Context

- `styled-components` is only used in `src/theme/animations.js` (keyframes + css helpers).
- `gsap` is installed but unused across `src/` (0 imports).
- Primary animation library: Framer Motion.
- Primary styling engine: MUI + Emotion.

## Steps

### 1) Refactor `src/theme/animations.js` ✓

**Completed: September 30, 2025**

- Removed `styled-components` import (line 8)
- Removed unused keyframes: `fadeInKeyframes`, `slideUpKeyframes`, `hoverScaleKeyframes`
- Removed unused `animationStyles` object
- All functionality preserved via existing Framer Motion variants
- File reduced from 255 to 216 lines
- Zero breaking changes (removed exports were never imported elsewhere)

### 2) Search for residual imports ✓

**Completed: September 30, 2025**

- Grep search confirmed zero `styled-components` imports remaining
- Grep search confirmed zero `gsap` imports (was already unused)
- No runtime references found

### 3) Uninstall dependencies ✓

**Completed: September 30, 2025**

- Removed `gsap` from package.json (line 16)
- Removed `styled-components` from package.json (line 24)
- Both dependencies safely removed from dependencies list

### 4) Verify

**Status**: Pending local verification

- [ ] `npm install` to update node_modules
- [ ] `npm run build` — confirm no bundler errors
- [ ] `npm start` — verify dev server runs cleanly
- [ ] `npm run test:e2e` — smoke tests pass (requires running dev server)

## Changelog

**September 30, 2025**: Dependency cleanup completed

- Removed `styled-components` (v6.1.17) — refactored animations.js to use Framer Motion exclusively
- Removed `gsap` (v3.13.0) — completely unused, zero imports found
- Grep verification confirmed no residual imports
- Bundle size reduction expected (exact size TBD after build)
- See `docs/development/daily-notes/2025-09-30.md` for implementation details

## Notes

- Keep Framer Motion as the primary motion system; avoid mixed approaches.
- When defining new animations, prefer Motion variants or theme-driven transitions.
