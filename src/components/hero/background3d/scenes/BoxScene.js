import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import { getSceneColors } from '../utils/sceneThemeUtils';

/**
 * BoxScene Component - Interactive box-based 3D scene
 * 
 * Features:
 * - Responsive to mouse movement
 * - Theme-aware colors
 * - Hover effects on boxes
 * - Animation transitions
 */
const BoxScene = ({ mousePosition, isDragging, theme, transitioning }) => {
  const groupRef = useRef();
  const boxRefs = useRef([]); // Store refs to all boxes
  const [hoveredBox, setHoveredBox] = useState(null);
  const [colors, setColors] = useState({
    primary: '#1976d2',
    secondary: '#9c27b0',
    background: '#f5f5f5'
  });
  
  // Get theme-based colors
  useEffect(() => {
    if (theme) {
      const sceneColors = getSceneColors(theme);
      setColors(sceneColors);
    }
  }, [theme]);
  
  // Animation spring for group when transitioning between scenes
  const groupSpring = useSpring({
    scale: transitioning ? 0 : 1,
    rotation: transitioning ? [0, Math.PI * 2, 0] : [0, 0, 0],
    config: { mass: 1, tension: 280, friction: 60 }
  });
  
  // Create box grid positions
  const boxPositions = React.useMemo(() => {
    const positions = [];
    const count = 5;
    const spacing = 1.8;
    
    for (let x = -Math.floor(count/2); x <= Math.floor(count/2); x++) {
      for (let y = -Math.floor(count/2); y <= Math.floor(count/2); y++) {
        for (let z = -Math.floor(count/2); z <= Math.floor(count/2); z++) {
          // Only create boxes at the outer shell (cube surface)
          if (
            Math.abs(x) === Math.floor(count/2) || 
            Math.abs(y) === Math.floor(count/2) || 
            Math.abs(z) === Math.floor(count/2)
          ) {
            positions.push([x * spacing, y * spacing, z * spacing]);
          }
        }
      }
    }
    
    return positions;
  }, []);
  
  // Initialize refs array
  useEffect(() => {
    boxRefs.current = boxPositions.map(() => React.createRef());
  }, [boxPositions.length]); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Animate group and individual boxes
  useFrame((state, delta) => {
    // Skip animations if dragging (user is controlling via OrbitControls)
    if (isDragging || !groupRef.current) return;
    
    // Gentle oscillation for the entire group
    groupRef.current.rotation.y += delta * 0.1;
    
    // Make boxes respond to mouse movement
    boxRefs.current.forEach((boxRef, i) => {
      if (!boxRef.current) return;
      
      // Calculate position-based offset for varied movement
      const pos = boxPositions[i];
      const distFromCenter = Math.sqrt(pos[0]**2 + pos[1]**2 + pos[2]**2);
      
      // Apply subtle rotation based on mouse position
      boxRef.current.rotation.x += Math.sin(mousePosition.y * 0.5) * 0.01 * (distFromCenter * 0.05);
      boxRef.current.rotation.y += Math.cos(mousePosition.x * 0.5) * 0.01 * (distFromCenter * 0.05);
      
      // Apply hover effect if this is the hovered box
      if (hoveredBox === i) {
        boxRef.current.scale.x = THREE.MathUtils.lerp(boxRef.current.scale.x, 1.4, 0.1);
        boxRef.current.scale.y = THREE.MathUtils.lerp(boxRef.current.scale.y, 1.4, 0.1);
        boxRef.current.scale.z = THREE.MathUtils.lerp(boxRef.current.scale.z, 1.4, 0.1);
      } else {
        boxRef.current.scale.x = THREE.MathUtils.lerp(boxRef.current.scale.x, 1, 0.1);
        boxRef.current.scale.y = THREE.MathUtils.lerp(boxRef.current.scale.y, 1, 0.1);
        boxRef.current.scale.z = THREE.MathUtils.lerp(boxRef.current.scale.z, 1, 0.1);
      }
    });
  });
  
  return (
    <animated.group ref={groupRef} {...groupSpring}>
      {boxPositions.map((position, index) => {
        // Use alternating colors based on position
        const useSecondary = (position[0] + position[1] + position[2]) % 2 === 0;
        const boxColor = useSecondary ? colors.secondary : colors.primary;
        
        return (
          <mesh 
            key={index}
            ref={el => boxRefs.current[index] = el}
            position={position}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredBox(index);
            }}
            onPointerOut={() => setHoveredBox(null)}
          >
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial 
              color={boxColor} 
              roughness={0.7}
              metalness={0.2}
              emissive={hoveredBox === index ? boxColor : '#000000'}
              emissiveIntensity={hoveredBox === index ? 0.5 : 0}
            />
          </mesh>
        );
      })}
    </animated.group>
  );
};

export default BoxScene;