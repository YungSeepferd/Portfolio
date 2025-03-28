import React, { useRef, useState, Suspense } from 'react';
import { Box, Container, Typography, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import './Hero.css';

// --- InteractiveShape Component ---
const InteractiveShape = React.memo(({ initialPosition, velocity, shapeIndex, setShapeIndex }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Predefine our geometries
  const geometries = React.useMemo(
    () => [
      <sphereGeometry args={[0.2, 16, 16]} />,
      <boxGeometry args={[0.3, 0.3, 0.3]} />,
      <coneGeometry args={[0.2, 0.4, 16]} />,
      <torusGeometry args={[0.2, 0.05, 16, 100]} />,
    ],
    []
  );

  useFrame((state) => {
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
  const velocities = React.useMemo(() => (
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

const Hero = () => {
  const theme = useTheme();
  
  // Define skills/tags and split them into two rows
  const skillsRow1 = ['UX Research', 'Interaction Design', 'Prototyping', 'UI Design'];
  const skillsRow2 = ['Haptic Design', 'Sound Design', 'AI Integration', 'Frontend Development'];

  return (
    <Box 
      id="hero" 
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.background.default,
        py: { xs: 8, md: 12 },
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* 3D Canvas Background */}
      <Canvas
        camera={{ position: [0, 0, 10] }}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          zIndex: 0,
          pointerEvents: 'auto' // Ensure canvas receives pointer events
        }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={<Html center>Loading...</Html>}>
          <InteractiveShapes />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
      
      {/* Content Container with positioning for bottom left placement */}
      <Container 
        maxWidth={false} // Changed to false to allow full width positioning
        sx={{ 
          position: 'relative',
          zIndex: 1,
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'flex-end', // Align to bottom
          justifyContent: 'flex-start', // Align to left
          p: 0, // Remove default padding
          pointerEvents: 'none', // Allow events to pass through to canvas
        }}
      >
        {/* Content box with left alignment */}
        <Box 
          sx={{ 
            textAlign: 'left',
            maxWidth: '650px',
            mb: theme.heroBottomMargin || 15,
            ml: theme.heroLeftMargin || 8,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h1" 
              component="h1"
              sx={{ 
                mb: 2, // Reduced from 4 to 2
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                color: theme.palette.text.primary,
              }}
            >
              Vincent Göke
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography 
              variant="h4" 
              component="h2"
              sx={{ 
                mb: 2, // Reduced from 4 to 2
                color: theme.palette.primary.main,
                fontWeight: 500,
              }}
            >
              Creative Technologist & Interaction Designer
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Typography 
              variant="body1"
              sx={{ 
                mb: 3, // Reduced from 5 to 3
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: theme.palette.text.secondary,
              }}
            >
              Fulltime | Available from June 2025 | Germany, Austria, Remote
            </Typography>
          </motion.div>

          {/* First row of skills - adjusted for left alignment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Box 
              sx={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                gap: 1, // Reduced from 1.5 to 1
                mb: 1, // Reduced from 2 to 1
              }}
            >
              {skillsRow1.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    borderColor: theme.palette.divider,
                    px: 1,
                    fontSize: theme.typography.chipText?.fontSize || '0.9rem', // Use theme value or default
                    '&:hover': {
                      bgcolor: theme.palette.background.paper,
                      color: theme.palette.secondary.main,
                      borderColor: theme.palette.secondary.main,
                    }
                  }}
                />
              ))}
            </Box>
          </motion.div>

          {/* Second row of skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Box 
              sx={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                gap: 1, // Reduced from 1.5 to 1
              }}
            >
              {skillsRow2.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    borderColor: theme.palette.divider,
                    px: 1,
                    fontSize: theme.typography.chipText?.fontSize || '0.9rem', // Use theme value or default
                    '&:hover': {
                      bgcolor: theme.palette.background.paper,
                      color: theme.palette.secondary.main,
                      borderColor: theme.palette.secondary.main,
                    }
                  }}
                />
              ))}
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;