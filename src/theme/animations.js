/**
 * Animation System
 * 
 * This file defines animation constants and utilities for consistent motion
 * throughout the application.
 */

import { keyframes, css } from 'styled-components';

// Define animation constants
const animations = {
  durations: {
    short: 300,  // in ms
    medium: 500,
    long: 800,
    veryLong: 1500
  },
  easings: {
    // CSS string formats for CSS transitions
    css: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
      decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
    },
    // Framer Motion compatible formats (arrays)
    motion: {
      standard: [0.4, 0, 0.2, 1],
      accelerate: [0.4, 0, 1, 1],
      decelerate: [0, 0, 0.2, 1],
      sharp: [0.4, 0, 0.6, 1]
    }
  },
  transitions: {
    hover: 'all 0.3s ease',
    active: 'all 0.2s ease-in',
    layout: 'all 0.5s ease-out'
  }
};

/**
 * Creates animation variants for use with Framer Motion
 */
export const createAnimationVariants = () => {
  return {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { 
        duration: animations.durations.medium / 1000,
        ease: animations.easings.motion.standard
      }
    },
    slideUp: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { 
        duration: animations.durations.medium / 1000,
        ease: animations.easings.motion.decelerate
      }
    },
    slideIn: {
      initial: { x: -30, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { 
        duration: animations.durations.medium / 1000,
        ease: animations.easings.motion.decelerate
      }
    }
  };
};

/**
 * Creates CSS keyframes for global animations
 */
export const createGlobalAnimations = () => {
  return `
    @keyframes slideIn {
      0% {
        transform: translateX(-50%);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    
    @keyframes pulseGlow {
      0% { box-shadow: 0 0 0 0 rgba(194, 247, 80, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(194, 247, 80, 0); }
      100% { box-shadow: 0 0 0 0 rgba(194, 247, 80, 0); }
    }
  `;
};

// Define reusable animations for the application

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export const hoverEffect = {
  whileHover: { scale: 1.05, transition: { duration: 0.2 } },
  whileTap: { scale: 0.95 },
};

export const slideIn = {
  initial: { x: '-100%' },
  animate: { x: 0, transition: { duration: 0.5 } },
  exit: { x: '100%', transition: { duration: 0.3 } },
};

// Define keyframes for animations
export const fadeInKeyframes = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const slideUpKeyframes = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const hoverScaleKeyframes = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`;

// Export reusable animation styles
export const animationStyles = {
  fadeIn: css`animation: ${fadeInKeyframes} 0.5s ease-in-out;`,
  slideUp: css`animation: ${slideUpKeyframes} 0.5s ease-in-out;`,
  hoverScale: css`&:hover { animation: ${hoverScaleKeyframes} 0.3s ease-in-out; transform: scale(1.05); }`,
};

export default animations;