# Hero Component Structure

The Hero section includes two different background implementations:

1. **CanvasBackground.js** - A simpler 2D canvas-based implementation that renders animated
   particles. Use this for better performance on lower-end devices.

2. **background3d/Background3D.js** - A more complex Three.js-based 3D background system with
   interactive scenes, lighting, and more advanced effects. Currently the default implementation
   in the Hero component.

## Active Components

The Hero component currently uses:

- `Hero.js` - Main container component
- `HeroContent.js` - Text content and skills display
- `ScrollIndicator.js` - Bottom scroll indicator
- `background3d/Background3D.js` - Three.js 3D background
- `background3d/ActiveSceneSimple.js` - Simplified scene renderer

## Usage

To switch between background implementations, modify the Hero.js file to import the
desired background component:

```javascript
// For the 3D background (current implementation)
import Background3D from './background3d/Background3D';

// For the simple canvas background
// import Background3D from './CanvasBackground';
```

## Performance Considerations

The Three.js background requires WebGL support and more processing power. The application
includes error boundaries to fall back to simpler implementations when needed.
