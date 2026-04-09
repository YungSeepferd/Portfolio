import React from 'react';
import { Box } from '@mui/material';
import AnimatedMeshBackground from './AnimatedMeshBackground';
import DotGridBackground from './DotGridBackground';

/**
 * HybridFooterBackground
 * 
 * Sophisticated layered canvas background combining two complementary effects:
 * 1. Animated gradient mesh - Dynamic, flowing orbs for bold visual interest
 * 2. Interactive dot grid - Structured overlay that responds to cursor proximity
 * 
 * Layering Strategy:
 * - Base: Gradient mesh (z-index: 1) provides color and movement
 * - Overlay: Dot grid (z-index: 1.5) adds texture and detail
 * - Content: Glassmorphic card (z-index: 2) sits on top
 * 
 * Design Philosophy:
 * - Mesh provides broad strokes and drama
 * - Dots provide fine detail and interaction feedback
 * - Together they create depth and sophistication
 * - Enhanced glassmorphism visibility through dynamic contrast
 * 
 * @param {Object} meshProps - Props for AnimatedMeshBackground
 * @param {Object} dotProps - Props for DotGridBackground
 */
const HybridFooterBackground = ({
  // Mesh background configuration
  meshProps = {
    orbCount: 6,
    baseSpeed: 0.4,
    mouseInfluence: 0.12
  },
  // Dot grid configuration (optimized for layering)
  dotProps = {
    dotSize: 12,        // Slightly smaller for subtle overlay
    gap: 36,            // Wider spacing to not overwhelm
    proximity: 180      // Wider interaction zone to match mesh
  }
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Layer 1: Animated Gradient Mesh - Bold, dynamic foundation */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
      >
        <AnimatedMeshBackground {...meshProps} />
      </Box>

      {/* Layer 2: Interactive Dot Grid - Structured detail overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1.5,
          opacity: 0.85, // Increased from 0.6 for better visibility
          mixBlendMode: 'screen', // Changed from 'overlay' for brighter, more visible dots
        }}
      >
        <DotGridBackground {...dotProps} />
      </Box>
    </Box>
  );
};

export default HybridFooterBackground;
