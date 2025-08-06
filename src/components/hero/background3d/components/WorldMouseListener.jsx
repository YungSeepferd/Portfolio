import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneState } from '../SceneContext';

/**
 * WorldMouseListener Component
 *
 * Converts screen/normalized mouse coordinates to world space coordinates
 * and updates the SceneContext with this information.
 *
 * This component must be placed inside the <Canvas> because it uses useThree().
 */
const WorldMouseListener = ({ mouseData }) => {
  const { camera, raycaster } = useThree();
  const { updateMousePosition } = useSceneState();

  // Virtual plane for raycasting
  const virtualPlane = React.useMemo(() => {
    return new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  }, []);

  // Convert normalized mouse coordinates to world coordinates
  useEffect(() => {
    if (!mouseData || !mouseData.normalized) return;

    // Update the raycaster with current mouse position
    raycaster.setFromCamera({ x: mouseData.normalized.x, y: mouseData.normalized.y }, camera);

    // Calculate world position using raycasting against a virtual plane
    const worldPosition = new THREE.Vector3();
    raycaster.ray.intersectPlane(virtualPlane, worldPosition);

    // Create enhanced mouseData with world coordinates
    const enhancedMouseData = {
      ...mouseData,
      world: worldPosition,
    };

    // Update scene context with the enhanced data
    updateMousePosition(enhancedMouseData);
  }, [mouseData, camera, raycaster, virtualPlane, updateMousePosition]);

  return null; // This component doesn't render anything
};

export default WorldMouseListener;
