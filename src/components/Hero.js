import React, { Fragment, useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Typography, Box } from '@mui/material';
import * as THREE from 'three';
import './Hero.css';

// --- InteractiveShape Component ---
// We wrap each shape in React.memo to prevent unnecessary re-renders.
const InteractiveShape = React.memo(({ initialPosition, velocity, shapeIndex, setShapeIndex }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Predefine our geometries as an array of JSX elements.
  const geometries = useMemo(
    () => [
      <sphereGeometry args={[0.2, 16, 16]} />,
      <boxGeometry args={[0.3, 0.3, 0.3]} />,
      <coneGeometry args={[0.2, 0.4, 16]} />,
      <torusGeometry args={[0.2, 0.05, 16, 100]} />,
    ],
    []
  );

  useFrame((state) => {
    // Simplified interactive logic to update position, rotation and scale.
    if (meshRef.current) {
      const { mouse, clock } = state;
      const target = new THREE.Vector3(mouse.x * 5, mouse.y * 5, 0);
      // Drifting movement based on velocity with boundary check.
      meshRef.current.position.add(velocity);
      ['x', 'y', 'z'].forEach(axis => {
        if (Math.abs(meshRef.current.position[axis]) > 5) {
          velocity[axis] *= -1;
        }
      });
      // When near the cursor, add a small interaction.
      const distance = meshRef.current.position.distanceTo(target);
      if (distance < 2) {
        if (shapeIndex === 0) {
          meshRef.current.position.lerp(target, 0.05);
        } else if (shapeIndex === 1) {
          const dodgeDir = meshRef.current.position.clone().sub(target).normalize();
          meshRef.current.position.addScaledVector(dodgeDir, 0.1);
        } else if (shapeIndex === 2) {
          meshRef.current.rotation.x += 0.02;
          meshRef.current.rotation.y += 0.02;
        } else if (shapeIndex === 3) {
          const scale = 1 + Math.sin(clock.getElapsedTime() * 5) * 0.3;
          meshRef.current.scale.set(scale, scale, scale);
        }
      }
      // Update color based on cursor proximity.
      const hue = hovered ? 0 : (distance / 10) * 360;
      meshRef.current.material.color.setHSL((hue % 360) / 360, 0.7, hovered ? 0.8 : 0.5);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={initialPosition}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setShapeIndex(prev => (prev + 1) % geometries.length)}
    >
      {geometries[shapeIndex]}
      <meshStandardMaterial />
    </mesh>
  );
});

// --- InteractiveShapes Component ---
const InteractiveShapes = () => {
  const [shapeIndex, setShapeIndex] = useState(0);
  const velocities = useMemo(() => (
    Array.from({ length: 30 }, () => new THREE.Vector3(
      THREE.MathUtils.randFloat(-0.02, 0.02),
      THREE.MathUtils.randFloat(-0.02, 0.02),
      THREE.MathUtils.randFloat(-0.02, 0.02)
    ))
  ), []);

  return (
    <group>
      {Array.from({ length: 30 }).map((_, i) => (
        <InteractiveShape
          key={i}
          initialPosition={[
            THREE.MathUtils.randFloatSpread(10),
            THREE.MathUtils.randFloatSpread(10),
            THREE.MathUtils.randFloatSpread(10)
          ]}
          velocity={velocities[i]}
          shapeIndex={shapeIndex}
          setShapeIndex={setShapeIndex}
        />
      ))}
    </group>
  );
};

// Updated hero content: Change todo punchline and update tags to what you are looking for right now.
const heroContent = {
  punchline: "Design experiences",
  tags: [
    "Full Time",
    "UX Design",
    "Research Engineer",
    "Start June 2025"
  ]
};

// --- TagList Component ---
const TagList = () => (
  <Box 
    sx={{ display: 'flex', gap: '1rem', mt: 1, justifyContent: 'flex-start', flexWrap: 'wrap' }}  // changed justifyContent from 'center' to 'flex-start'
  >
    {heroContent.tags.map((tag, idx) => (
      <Fragment key={idx}>
        {idx === 2 && <br style={{ flexBasis: '100%' }} />}
        <Box
          component="span"
          sx={{
            backgroundColor: 'rgba(66,133,244,0.2)',
            padding: '5px 10px',
            borderRadius: '15px',
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}
        >
          {tag}
        </Box>
      </Fragment>
    ))}
  </Box>
);

// --- Hero Component ---
const Hero = () => (
  <section id="hero" className="hero-section">
    {/* The Canvas uses react-three-fiber to render interactive shapes */}
    <Canvas
      camera={{ position: [0, 0, 10] }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={<Html center>Loading...</Html>}>
        <InteractiveShapes />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
    {/* Hero Content Overlay */}
    <div className="hero-content">
      <Typography variant="h2" component="h1" className="hero-heading">
        {heroContent.punchline}
      </Typography>
      <div className="hero-tags" style={{ textAlign: 'left' }}>
        <TagList />
      </div>
    </div>
  </section>
);

export default Hero;