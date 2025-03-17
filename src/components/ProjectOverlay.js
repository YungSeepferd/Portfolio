import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Overlay from './Overlay';
import styles from './ProjectOverlay.module.css';
import Button from '@mui/material/Button';

/**
 * MiniGeography renders a subtle rotating shape in the overlay,
 * serving as a secondary interactive reference similar to the Hero's geography.
 */
const MiniGeography = () => {
  const meshRef = React.useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#1976d2" opacity={0.3} transparent />
    </mesh>
  );
};

/**
 * ProjectOverlay displays detailed project information inside an overlay.
 * It now also includes a mini interactive geography section.
 */
const ProjectOverlay = ({ project, onClose }) => {
  return (
    <Overlay onClose={onClose}>
      <div className={styles.overlayContent}>
        <h2>{project.title}</h2>
        <img
          src={project.media.src}
          alt={project.title}
          style={{
            width: '100%',
            maxWidth: '800px',
            borderRadius: '12px',
            margin: '2rem 0',
          }}
        />
        <p>{project.details}</p>
        {/* Placeholder for additional UX designer notes */}
        <div className={styles.overlayPlaceholder}>
          <h3>UX Designer Notes</h3>
          <p>
            Add your detailed breakdown, user research or design process insights here.
          </p>
          <ul>
            <li>Problem Statement: [Your description]</li>
            <li>User Research: [Your insights]</li>
            <li>Design Decisions: [Your rationale]</li>
          </ul>
        </div>
        {/* Mini interactive geography canvas */}
        <div style={{ width: '100%', height: '200px', margin: '2rem 0' }}>
          <Canvas
            camera={{ position: [0, 0, 2] }}
            style={{ width: '100%', height: '100%' }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <MiniGeography />
          </Canvas>
        </div>
        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </div>
    </Overlay>
  );
};

export default ProjectOverlay;