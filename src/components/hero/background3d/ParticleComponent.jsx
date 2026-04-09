import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * ParticleComponent
 * 
 * Renders animated 3D particles that can follow the mouse
 */
const ParticleComponent = ({ 
  count = 300, 
  color = 0xffffff, 
  size = 0.05,
  mousePosition = null,
  mouseInfluence = 0.2,
  maxDistance = 30,
  speed = 0.1
}) => {
  const particlesRef = useRef();
  const particlesMaterialRef = useRef();
  
  useEffect(() => {
    const particles = particlesRef.current;
    if (!particles) return;
    
    // Assign random positions to particles
    const positions = particles.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random positions within a sphere volume
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = Math.random() * maxDistance;
      
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);
      
      // Store original positions for animation references
      particles.userData.originalPositions = [...positions];
    }
    
    particles.geometry.attributes.position.needsUpdate = true;
  }, [count, maxDistance]);
  
  useFrame((state, delta) => {
    const particles = particlesRef.current;
    if (!particles) return;
    
    const time = state.clock.getElapsedTime();
    const positions = particles.geometry.attributes.position.array;
    const originalPositions = particles.userData.originalPositions;
    
    if (!originalPositions) return;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Gentle pulsing movement
      const amplitude = 0.2;
      const frequency = 0.1 + (i % 5) * 0.03;
      
      positions[i3] = originalPositions[i3] + Math.sin(time * frequency + i) * amplitude;
      positions[i3 + 1] = originalPositions[i3 + 1] + Math.cos(time * frequency + i) * amplitude;
      positions[i3 + 2] = originalPositions[i3 + 2] + Math.sin(time * frequency * 0.5 + i) * amplitude;
      
      // Mouse influence
      if (mousePosition) {
        const distance = Math.sqrt(
          Math.pow(positions[i3] - mousePosition.x * 10, 2) +
          Math.pow(positions[i3 + 1] - mousePosition.y * 10, 2)
        );
        
        const influence = Math.max(0, 1 - distance / 10) * mouseInfluence;
        
        positions[i3] += (mousePosition.x * 10 - positions[i3]) * influence * delta;
        positions[i3 + 1] += (mousePosition.y * 10 - positions[i3 + 1]) * influence * delta;
      }
    }
    
    particles.geometry.attributes.position.needsUpdate = true;
    
    // Slowly rotate the entire particle system
    particles.rotation.y += delta * 0.05;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(count * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={particlesMaterialRef}
        size={size}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
};

export default ParticleComponent;
