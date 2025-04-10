import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Define a Particle class that extends THREE.Mesh
class Particle extends THREE.Mesh {
  constructor() {
    // Create a small sphere geometry for the particle
    const geometry = new THREE.SphereGeometry(0.1, 8, 8);
    // Create a standard material with some glow
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x5363EE,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.8
    });
    super(geometry, material);
  }
}

// Register the Particle class with React Three Fiber
extend({ Particle });

// ParticleComponent - A wrapper for the extended Particle class
const ParticleComponent = (props) => {
  const particleRef = useRef();

  // Add some gentle animation to the particle
  useFrame(({ clock }) => {
    if (particleRef.current) {
      particleRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.5;
      particleRef.current.rotation.y = Math.cos(clock.getElapsedTime() * 0.3) * 0.5;
    }
  });

  return <particle ref={particleRef} {...props} />;
};

export default ParticleComponent;
