import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { wallsData } from './Walls';
import { Paper, Typography, Box } from '@mui/material'; // Import Material UI components
import './AboutBackground.css'; // Import the new CSS file
import { createPortal } from 'react-dom'; // Import createPortal

// Component to render the content for each cube face
const CubeContent = ({ faceIndex }) => {
  let content = null;
  switch(faceIndex) {
    case 0:
      content = (
        <div className="cube-content">
          <div className="content-box">
            <h2 className="cube-title">Professional Skills</h2>
          </div>
          <div className="content-box">
            <Typography variant="body2" component="div">
              I excel in UX Research, UI Design, Prototyping, and Frontend Development. I combine empathy
              with technical innovation to craft intuitive interfaces.
            </Typography>
          </div>
        </div>
      );
      break;
    case 1:
      content = (
        <div className="cube-content">
          <div className="content-box">
            <h2 className="cube-title">Personal Interests</h2>
          </div>
          <div className="content-box">
            <Typography variant="body2" component="div">
              Beyond the screen, I produce music, play instruments, travel frequently, and capture moments through photography.
            </Typography>
          </div>
        </div>
      );
      break;
    case 2:
      content = (
        <div className="cube-content">
          <div className="content-box">
            <h2 className="cube-title">Design Motivations</h2>
          </div>
          <div className="content-box">
            <Typography variant="body2" component="div">
              Driven by empathy, continuous learning, and collaboration, I infuse passion and purpose into my designs.
            </Typography>
          </div>
        </div>
      );
      break;
    case 3:
      content = (
        <div className="cube-content">
          <div className="content-box">
            <h2 className="cube-title">Career Vision</h2>
          </div>
          <div className="content-box">
            <Typography variant="body2" component="div">
              I aspire to lead creative design teams, harness emerging technologies, and shape human-centered innovations.
            </Typography>
          </div>
        </div>
      );
      break;
    default:
      break;
  }
  return content;
};

// The InteractiveCube handles rotation via drag and tab clicks.
const InteractiveCube = ({ targetRotationY, onTabChange, initialRotationY }) => {
  const meshRef = useRef();
  const [dragging, setDragging] = useState(false);
  const initialDrag = useRef({ x: 0, rotationY: 0 });
  const [localRotationY, setLocalRotationY] = useState(initialRotationY);
  const momentumRef = useRef(0);
  const deceleration = 0.001; // reduced deceleration for slower spin

  useEffect(() => {
    setLocalRotationY(initialRotationY);
  }, [initialRotationY]);

  // Smoothly interpolate to the target rotation (applied when not dragging)
  useFrame(({ camera }) => {
    if (dragging) return;
    // If there's momentum, apply it and decelerate linearly.
    if (Math.abs(momentumRef.current) > 0.0001) {
      meshRef.current.rotation.y += momentumRef.current;
      setLocalRotationY(meshRef.current.rotation.y);
      if (momentumRef.current > 0) {
        momentumRef.current = Math.max(momentumRef.current - deceleration, 0);
      } else {
        momentumRef.current = Math.min(momentumRef.current + deceleration, 0);
      }
    } else {
      meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.1;
      setLocalRotationY(meshRef.current.rotation.y);
    }

    // Make the content always face the camera
    meshRef.current.children.forEach((child) => {
      if (child.type === 'Group') {
        child.children.forEach((htmlChild) => {
          if (htmlChild.type === 'Html') {
            htmlChild.rotation.copy(camera.rotation);
          }
        });
      }
    });
  });

  // Pointer event handlers for drag gestures
  const onPointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId); // added for extended interaction
    setDragging(true);
    momentumRef.current = 0;
    initialDrag.current.x = e.clientX;
    initialDrag.current.rotationY = meshRef.current.rotation.y;
  };

  const onPointerMove = (e) => {
    if (dragging && meshRef.current) {
      const deltaX = e.clientX - initialDrag.current.x;
      const rotationDelta = (deltaX / 200) * (Math.PI / 2); // Adjust sensitivity as needed
      meshRef.current.rotation.y = initialDrag.current.rotationY + rotationDelta;
      setLocalRotationY(meshRef.current.rotation.y);
      momentumRef.current = rotationDelta * 0.01; // reduce momentum for slower spin
    }
  };

  const onPointerUp = (e) => {
    e.target.releasePointerCapture(e.pointerId); // release pointer capture after drag
    setDragging(false);
    // Calculate current rotation and determine nearest face index
    const currentY = meshRef.current.rotation.y;
    let normalized = (-currentY) % (2 * Math.PI);
    if (normalized < 0) normalized += 2 * Math.PI;
    const newIndex = Math.round(normalized / (Math.PI / 2)) % 4;
    if (typeof onTabChange === 'function') {
      onTabChange(newIndex);
    }
  };

  // Compute the current face index based on localRotationY.
  const currentFace = (() => {
    let norm = (-localRotationY) % (2 * Math.PI);
    if (norm < 0) norm += 2 * Math.PI;
    return Math.round(norm / (Math.PI / 2)) % 4;
  })();

  return (
    // Wrap the whole cube group with a scaling factor (e.g. 2x)
    <group scale={[2, 2, 2]}>
      <group
        ref={meshRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Increased cube dimensions from 4 to 30 */}
        {[0, 1, 2, 3].map((faceIndex) => {
          const angle = faceIndex * (Math.PI / 2);
          const transform = `rotateY(${angle}rad) translateZ(15)`;
          const color = ['#ff6347', '#4682b4', '#32cd32', '#ff69b4'][faceIndex]; // Different colors for each face
          return (
            <mesh key={faceIndex} position={[0, 0, 0]} rotation={[0, angle, 0]}>
              <boxGeometry args={[30, 30, 0.1]} />
              <meshStandardMaterial color={color} />
              <Html
                transform
                occlude
                style={{
                  width: '1200px', // Increased width
                  height: '600px',
                  pointerEvents: 'auto',
                }}
                // Culling: hide content on the back side
                visible={Math.abs(localRotationY - angle) < Math.PI / 2}
              >
                {/* Inverse-scale the text so it stays small */}
                <div className="cube-face" style={{ transform: `rotateY(${angle}rad)` }}>
                  {createPortal(<CubeContent faceIndex={faceIndex} />, document.body)}
                </div>
              </Html>
            </mesh>
          );
        })}
        {/* New orbiting content using Walls data, split into multiple boxes */}
        {wallsData.map((wall, index) => {
          const angle = index * (Math.PI / 2);
          const orbitRadius = 30; // Increase the distance from the cube
          const position = [Math.sin(angle) * orbitRadius, 0, Math.cos(angle) * orbitRadius];
          // Map index to a rotation to orient text for reading
          const rotationMap = [0, -Math.PI/2, Math.PI, Math.PI/2];

          return (
            <Html
              key={`orbit-${index}`}
              transform
              occlude={false}
              position={position}
              style={{ pointerEvents: 'auto' }}
              // Culling: hide content on the back side
              visible={Math.abs(localRotationY - angle) < Math.PI / 2}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1.5, ease: 'easeOut' }}
                className="orbiting-content"
                style={{
                  transform: `rotateY(${rotationMap[index]}rad)`,
                }}
              >
                {/* Title Box */}
                <Paper elevation={3} className="orbiting-title">
                  <Typography variant="subtitle2">
                    {wall.title}
                  </Typography>
                </Paper>
                {/* Content Box */}
                <Paper elevation={2} className="orbiting-text">
                  <Typography variant="body2">
                    {wall.content}
                  </Typography>
                </Paper>
              </motion.div>
            </Html>
          );
        })}
      </group>
    </group>
  );
};

const AboutBackground = ({ activeTab, onTabChange }) => {
  const tabMap = { 'Skills': 0, 'Interests': 1, 'Motivations': 2, 'Vision': 3 };
  const targetRotationY = -tabMap[activeTab] * (Math.PI / 2);
  const initialRotationY = -tabMap[activeTab] * (Math.PI / 2);

  return (
      <Canvas
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          // Move the camera away to accommodate the bigger cube.
          camera={{ position: [0, -0.5, 200], fov: 50 }}
      >
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={0.7} />
          {/* Lower the cube group to center it */}
          <group position={[0, -0.5, 0]}>
              <InteractiveCube targetRotationY={targetRotationY} onTabChange={onTabChange} initialRotationY={initialRotationY} />
          </group>
      </Canvas>
  );
};

export default AboutBackground;