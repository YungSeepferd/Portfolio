import React, { useEffect, useState, useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import OrbBackground from './ThreadsBackground';
import { useOrbState, ORB_MODES } from './OrbContext';

/**
 * FloatingOrbCompanion
 * 
 * Tab-aware orb that appears in different positions based on active tab:
 * - WhoAmI: Fades out to the left
 * - Skills & Technology: Spawns under tab navigation
 * - Experience/Education: Different behavior (stays visible)
 * 
 * Features:
 * - Tab-based positioning and visibility
 * - Smooth spring animations
 * - Interactive with click waves
 * - Context-aware behavior
 */
const FloatingOrbCompanion = ({ aboutSectionRef, activeTab }) => {
  const theme = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const orbContainerRef = useRef(null);
  
  // Use orb context
  const { orbMode, setOrbVisible } = useOrbState();

  // Wait for ref to be ready
  useEffect(() => {
    if (aboutSectionRef?.current) {
      setIsMounted(true);
    }
  }, [aboutSectionRef]);

  // Update visibility based on active tab
  useEffect(() => {
    // Tab indices: 0=WhoAmI, 1=Skills, 2=Experience, 3=Education
    let visible = false;
    
    if (activeTab === 0) {
      // WhoAmI: fade out
      visible = false;
    } else if (activeTab === 1) {
      // Skills & Technology: spawn and show
      visible = true;
    } else if (activeTab === 2 || activeTab === 3) {
      // Experience/Education: keep visible
      visible = true;
    }
    
    setOrbVisible(visible);
  }, [activeTab, setOrbVisible]);

  // Determine position based on tab
  const getOrbPosition = () => {
    if (activeTab === 0) {
      // WhoAmI: off-screen to the left
      return { x: -300, opacity: 0 };
    } else if (activeTab === 1) {
      // Skills: spawn in
      return { x: 0, opacity: 1 };
    } else {
      // Experience/Education: visible
      return { x: 0, opacity: 1 };
    }
  };

  const position = getOrbPosition();

  if (!isMounted) return null;

  return (
    <motion.div
      ref={orbContainerRef}
      initial={{ x: -300, opacity: 0 }}
      animate={{ 
        x: position.x, 
        opacity: position.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 20,
        mass: 0.8,
      }}
      style={{
        position: 'absolute',
        left: '10%',
        top: '200px', // Below tab navigation
        zIndex: 5,
        pointerEvents: 'auto',
        willChange: 'transform, opacity',
      }}
    >
      <Box
        sx={{
          width: { xs: 180, sm: 220, md: 280 },
          height: { xs: 180, sm: 220, md: 280 },
          position: 'relative',
          filter: 'drop-shadow(0 0 20px rgba(255, 152, 0, 0.3))',
          // Allow orb to expand beyond container in easter egg mode
          overflow: 'visible',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: { xs: 120, sm: 150, md: 200 },
            height: { xs: 120, sm: 150, md: 200 },
            position: 'relative',
          }}
        >
          <OrbBackground
            color={theme.palette.accent.main}
            isActive={orbMode === ORB_MODES.ACTIVE || activeTab === 1}
            enableMouseInteraction={true}
          />
        </Box>
      </Box>
    </motion.div>
  );
};

export default FloatingOrbCompanion;
