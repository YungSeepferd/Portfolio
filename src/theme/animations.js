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

// --- Integrated Framer Motion Variants from animationVariants.js ---
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] } }
};

export const hoverScale = {
  initial: {},
  hover: { scale: 1.05, boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)', transition: { duration: 0.3, ease: 'easeOut' } },
  tap: { scale: 0.95 }
};

export const cardHover = {
  rest: { scale: 1, y: 0, boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)' },
  hover: { y: -10, boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)', transition: { duration: 0.3, ease: 'easeOut' } }
};

export const listItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
};

export const pageTransition = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

export const modalAnimation = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
};

export const createFadeInUp = (duration = 0.5) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration, ease: 'easeOut' } }
});

export const getThemeTransition = (theme, type = 'medium') => {
  const duration = theme.animationSettings?.durations?.[type] || (type === 'short' ? 200 : type === 'medium' ? 300 : 500);
  const ease = theme.animationSettings?.easings?.standard || 'easeOut';
  return { duration: duration / 1000, ease };
};

// --- Parallax Scroll Animations ---
/**
 * Parallax animation variants for scroll-linked motion
 * Use with framer-motion's useScroll and motion.div style prop
 */
export const parallaxVariants = {
  // Subtle parallax for background elements
  subtle: {
    distance: 50,
    easing: animations.easings.motion.standard
  },
  // Medium parallax for midground content
  medium: {
    distance: 150,
    easing: animations.easings.motion.decelerate
  },
  // Strong parallax for focal elements
  strong: {
    distance: 300,
    easing: animations.easings.motion.decelerate
  }
};

/**
 * Spring configuration presets for smooth parallax
 */
export const springPresets = {
  gentle: { stiffness: 50, damping: 20, restDelta: 0.001 },
  smooth: { stiffness: 100, damping: 30, restDelta: 0.001 },
  snappy: { stiffness: 200, damping: 40, restDelta: 0.001 }
};

export default animations;