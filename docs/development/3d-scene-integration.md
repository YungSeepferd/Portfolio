# 3D Scene Integration Guide

Last updated: September 30, 2025

## Purpose

Explain how the hero 3D background is structured and how to add or modify scenes while maintaining performance and theme integration.

## Architecture overview

- Directory: `src/components/hero/background3d/`
- Key files:
  - `SceneContext.js` — central interaction/state context (shape switching, dragging, interaction flags)
  - `Background3D.js` — primary Canvas-based background with `InteractiveCamera` and `ActiveScene`
  - `CanvasBackground.js` — alternate implementation with `OrbitControls` and optional performance monitor
  - `utils/sceneThemeUtils.js` — theme → Three.js color extraction and dynamic color utilities
  - `components/` — reusable scene components (loading, perf monitor)
  - `scenes/` — individual scene implementations

## SceneContext API

Provided by `SceneProvider` and consumed with `useSceneState()`.

- `currentShapeType: number` — which shape/scene is active (see `constants.js` → `SHAPE_TYPES`)
- `switchShapeType(): void` — cycles through scenes with transition guard
- `isTransitioning: boolean` — prevents mid-transition switches
- `showParticles: boolean`, `toggleParticles()` — optional FX flag
- Interaction state:
  - `isDragging: boolean`, `updateDragging(dragging: boolean)`
  - `mousePosition: {x, y}`, `updateMousePosition(pos)`
  - `isInteractionEnabled: boolean`, `setInteractionEnabled(bool)`
  - `hasInteraction: boolean` — auto-rotations and idle behavior depend on this

See: `src/components/hero/background3d/SceneContext.js`.

## Camera and interaction

- `InteractiveCamera.js` wraps `PerspectiveCamera` and `OrbitControls` with:
  - Idle auto-rotation (starts after ~3s of no interaction)
  - Smooth target transitions when `currentShapeType` changes
  - Damping adjustments during transitions
  - Zoom disabled (prevents page scroll conflicts)

See: `src/components/hero/background3d/InteractiveCamera.js`.

## Theming and color mapping

- `utils/sceneThemeUtils.js` bridges MUI theme → Three.js colors.
  - `extractThemeColors(theme)` builds HSL sets per shape type + scene color sets
  - `getDynamicColor(theme, time, energy, sceneType, isHovered)` returns time/energy-aware colors for materials
  - `themeColorToThreeColor` utility for quick conversions

Respect MUI tokens (`theme.palette.*`) when adjusting colors/lighting in scenes. Example light usage in `Background3D.js` maps intensities and colors from the theme.

## Adding a new scene

1. Create the scene component under `scenes/` with a default export (e.g., `MyScene.js`).
2. Wire scene selection in `ActiveScene` (or scene registry if present):
   - Map a new `SHAPE_TYPES` enum value to your scene.
   - Ensure click/drag props are forwarded (`onClick`, `onDragStart`, `onDragEnd`, `isDragging`).
3. Use `useThree`, `useFrame`, and `useMemo`/`useRef` for performance:
   - Cache geometries and materials in refs.
   - Avoid heavy allocations in `useFrame`.
4. Integrate theming with `extractThemeColors()` or direct `theme.palette` values.
5. Validate transitions: when `switchShapeType()` fires, your scene must render predictably and not leak resources.

## Performance guidelines

- Avoid creating new `THREE.Material`/`THREE.Geometry` inside `useFrame`.
- Reuse `Vector3`, `Color` instances when possible.
- Keep `dpr` controlled; see `Background3D.js` (`dpr={performanceMode === 'high' ? window.devicePixelRatio : 1}`).
- Prefer memoized style objects and props to limit React re-renders.
- Disable zoom in `OrbitControls` to prevent scroll interference (already set).

## Asset placement

- Place binary assets under `public/models/` or `public/models/textures/` as appropriate.
- Reference with relative paths or loaders recommended by R3F/Drei.

## QA checklist

- Click interaction switches scenes (`switchShapeType`) without stutter.
- Idle auto-rotation resumes after interaction.
- Theme changes (light/dark) adjust scene lighting/colors.
- Mobile: touch drag updates `isDragging`, no page scroll conflicts (`touchAction: 'none'`).
- No console warnings in development.

## References

- `src/components/hero/background3d/Background3D.js`
- `src/components/hero/background3d/InteractiveCamera.js`
- `src/components/hero/background3d/SceneContext.js`
- `src/components/hero/background3d/utils/sceneThemeUtils.js`
- `src/components/hero/background3d/scenes/`
