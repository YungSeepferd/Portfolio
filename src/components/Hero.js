import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import './Hero.css'; // Create this CSS module for Hero-specific styles

const geometries = [
  <sphereGeometry args={[0.2, 16, 16]} />,
  <boxGeometry args={[0.3, 0.3, 0.3]} />,
  <coneGeometry args={[0.2, 0.4, 16]} />,
  <torusGeometry args={[0.2, 0.05, 16, 100]} />,
];

const InteractiveShape = ({ initialPosition, velocity, shapeIndex, setShapeIndex }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const { mouse, camera } = state;
    if (meshRef.current) {
      const distanceToMouse = meshRef.current.position.distanceTo(new THREE.Vector3(mouse.x * 5, mouse.y * 5, 0));
      
      // Continuous movement with boundary checking
      meshRef.current.position.add(velocity);
      ['x', 'y', 'z'].forEach((axis) => {
        if (meshRef.current.position[axis] > 5 || meshRef.current.position[axis] < -5) {
          velocity[axis] *= -1; // Reverse direction on boundary
        }
      });

      // Shape-specific behavior based on distance to mouse
      if (distanceToMouse < 2) {
        if (shapeIndex === 0) {
          // Sphere follows the mouse
          meshRef.current.position.lerp(new THREE.Vector3(mouse.x * 5, mouse.y * 5, 0), 0.05);
        } else if (shapeIndex === 1) {
          // Box dodges the mouse
          const dodgeDirection = new THREE.Vector3(
            meshRef.current.position.x - mouse.x * 5,
            meshRef.current.position.y - mouse.y * 5,
            0
          ).normalize();
          meshRef.current.position.addScaledVector(dodgeDirection, 0.1);
        } else if (shapeIndex === 2) {
          // Cone spirals around
          meshRef.current.rotation.x += 0.1;
          meshRef.current.rotation.y += 0.1;
        } else if (shapeIndex === 3) {
          // Torus pulses in size
          const scale = 1 + Math.sin(state.clock.getElapsedTime() * 5) * 0.3;
          meshRef.current.scale.set(scale, scale, scale);
        }
      }

      // Change color based on proximity to the mouse
      const hue = hovered ? 0 : (distanceToMouse / 10) * 360;
      meshRef.current.material.color.setHSL((hue % 360) / 360, 0.7, hovered ? 0.8 : 0.5);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={initialPosition}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setShapeIndex((prev) => (prev + 1) % geometries.length)}
    >
      {geometries[shapeIndex]}
      <meshStandardMaterial />
    </mesh>
  );
};

const InteractiveShapes = () => {
  const [shapeIndex, setShapeIndex] = useState(0);
  const velocities = useRef(
    Array.from({ length: 30 }, () =>
      new THREE.Vector3(
        THREE.MathUtils.randFloat(-0.02, 0.02),
        THREE.MathUtils.randFloat(-0.02, 0.02),
        THREE.MathUtils.randFloat(-0.02, 0.02)
      )
    )
  );

  return (
    <group>
      {Array.from({ length: 30 }).map((_, i) => (
        <InteractiveShape
          key={i}
          initialPosition={[
            THREE.MathUtils.randFloatSpread(10),
            THREE.MathUtils.randFloatSpread(10),
            THREE.MathUtils.randFloatSpread(10),
          ]}
          velocity={velocities.current[i]}
          shapeIndex={shapeIndex}
          setShapeIndex={setShapeIndex}
        />
      ))}
    </group>
  );
};

const Hero = () => (
  <section id="hero" className="hero-section" style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
    <Canvas camera={{ position: [0, 0, 10] }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} />
      <InteractiveShapes />
      <OrbitControls enableZoom={false} />
    </Canvas>
    <div className="hero-content">
  <h1 className="display-3 text-orange">Creative Technologist <br />& Junior UX Designer</h1>
  <p className="lead">Audio Design | UX Design | Haptic Designer</p>
</div>

  </section>
);

export default Hero;
