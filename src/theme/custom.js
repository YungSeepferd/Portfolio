import { alpha } from '@mui/material/styles';

/**
 * Custom Theme Extensions
 * 
 * This file contains custom theme properties that extend
 * the standard Material UI theme object.
 * 
 * @param {Object} theme - The base theme object
 * @returns {Object} Custom theme extensions
 */
export const createCustomParts = (theme) => {
  return {
    // Animations for consistent motion across components
    animations: {
      durations: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
      easings: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
      transitions: {
        create: (props = ['all'], options = {}) => {
          const { duration = 'standard', easing = 'easeInOut', delay = 0 } = options;
          
          const durationValue = typeof duration === 'string' 
            ? theme.animations.durations[duration] 
            : duration;
            
          const easingValue = typeof easing === 'string'
            ? theme.animations.easings[easing]
            : easing;
            
          return (Array.isArray(props) ? props : [props])
            .map(prop => `${prop} ${durationValue}ms ${easingValue} ${delay}ms`)
            .join(',');
        },
      },
    },
    
    // Section layout configurations
    sections: {
      layout: {
        spacing: {
          xs: theme.spacing(4),
          sm: theme.spacing(6),
          md: theme.spacing(8),
          lg: theme.spacing(10),
        },
        padding: {
          xs: theme.spacing(2),
          sm: theme.spacing(3),
          md: theme.spacing(4),
          lg: theme.spacing(5),
        },
        maxWidth: {
          xs: '100%',
          sm: '600px',
          md: '900px',
          lg: '1200px',
          xl: '1400px',
        },
      },
    },
    
    // Project card styling configurations
    projectCard: {
      height: '400px',
      borderWidth: '4px',
      variants: {
        primary: {
          color: theme.palette.primary.main,
          focusRing: alpha(theme.palette.primary.main, 0.25),
        },
        secondary: {
          color: theme.palette.secondary.main,
          focusRing: alpha(theme.palette.secondary.main, 0.25),
        },
        success: {
          color: theme.palette.success.main,
          focusRing: alpha(theme.palette.success.main, 0.25),
        },
        warning: {
          color: theme.palette.warning.main,
          focusRing: alpha(theme.palette.warning.main, 0.25),
        },
        error: {
          color: theme.palette.error.main,
          focusRing: alpha(theme.palette.error.main, 0.25),
        },
        info: {
          color: theme.palette.info.main,
          focusRing: alpha(theme.palette.info.main, 0.25),
        },
      },
    },
    
    // Media styling configurations
    media: {
      ratios: {
        portrait: '3 / 4',
        square: '1 / 1',
        landscape: '16 / 9',
        widescreen: '21 / 9',
      },
      placeholders: {
        // Placeholder images for components when content is loading or missing
        image: '/assets/images/placeholders/image-placeholder.jpg',
        project: '/assets/images/placeholders/project-placeholder.jpg',
        avatar: '/assets/images/placeholders/avatar-placeholder.jpg',
        video: '/assets/images/placeholders/video-placeholder.jpg',
      },
    },

    // Common overlay and component styling values
    overlays: {
      header: {
        light: 'rgba(248, 250, 252, 0.7)',
        dark: 'rgba(10, 22, 40, 0.7)',
      },
      aboutImage: {
        default: 'rgba(0,0,0,0.5)',
        hover: 'rgba(0,0,0,0.7)',
      },
      contactCard: {
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      },
      socialIcon: {
        base: alpha(theme.palette.secondary.main, 0.10),
        hover: alpha(theme.palette.secondary.main, 0.18),
      }
    },

    // Component specific layout values
    header: {
      burgerMenuOffset: {
        top: theme.spacing(1),
        right: {
          xs: theme.spacing(2.5),
          sm: theme.spacing(3),
          md: theme.spacing(1)
        }
      }
    },
    
    // Control z-index values consistently
    zIndex: {
      // Beyond Material UI's built-in z-index values
      header: 1100,
      modal: 1300,
      notification: 1400,
      tooltip: 1500,
      popover: 1600,
    },
  };
};
