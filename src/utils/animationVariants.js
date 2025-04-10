/**
 * Standard Animation Variants for Framer Motion
 * 
 * This file contains reusable animation variants that can be used
 * across the application to ensure consistent animations.
 */

// Fade in animation from bottom
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: 'easeOut' 
    }
  }
};

// Fade in animation with delay based on child index
export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

// Slide in from left
export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

// Slide in from right
export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

// Scale up animation
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1] // Cubic bezier easing
    }
  }
};

// Hover animations
export const hoverScale = {
  initial: {},
  hover: { 
    scale: 1.05, 
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
    transition: { 
      duration: 0.3, 
      ease: 'easeOut' 
    }
  },
  tap: { 
    scale: 0.95 
  }
};

// Card hover animation
export const cardHover = {
  rest: { 
    scale: 1,
    y: 0,
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)'
  },
  hover: {
    y: -10,
    boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)',
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

// List item animation for staggered lists
export const listItem = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
  }
};

// Page transition animations
export const pageTransition = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

// Modal animations
export const modalAnimation = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    transition: { duration: 0.3 }
  }
};

/**
 * Factory function to create animations with custom durations
 * @param {number} duration - Animation duration in seconds
 * @returns {Object} Custom animation variants
 */
export const createFadeInUp = (duration = 0.5) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration,
      ease: 'easeOut' 
    }
  }
});

/**
 * Get appropriate transition settings based on theme
 * @param {Object} theme - MUI theme object
 * @param {string} type - Type of transition (short, medium, long)
 * @returns {Object} - Transition settings for Framer Motion
 */
export const getThemeTransition = (theme, type = 'medium') => {
  const duration = theme.animationSettings?.durations?.[type] || 
    (type === 'short' ? 200 : type === 'medium' ? 300 : 500);
  
  const ease = theme.animationSettings?.easings?.standard || 'easeOut';
  
  return {
    duration: duration / 1000, // Convert from ms to seconds for Framer Motion
    ease
  };
};
