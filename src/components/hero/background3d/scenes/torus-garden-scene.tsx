import React from 'react';
import ParticleWaveScene from './ParticleWaveScene';
import * as THREE from 'three';

type TorusGardenSceneProps = {
  color?: THREE.Color;
  mousePosition?: { x: number; y: number } | null;
  isTransitioning?: boolean;
  easterEggActive?: boolean;
  interactionCount?: number;
};

/**
 * TorusGardenScene - Now a wrapper around ParticleWaveScene
 * Replaces the problematic Tone.js-based torus scene with a stable particle wave scene
 */
const TorusGardenScene: React.FC<TorusGardenSceneProps> = (props) => {
  return <ParticleWaveScene {...props} />;
};

export default TorusGardenScene;
