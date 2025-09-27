/**
 * Effects tokens for the design system
 * These tokens define visual effects like glassmorphism, overlays, and filters
 */

const effects = {
  glassmorphism: {
    light: {
      background: 'rgba(255, 255, 255, 0.15)',
      backgroundHover: 'rgba(255, 255, 255, 0.25)',
      backgroundActive: 'rgba(255, 255, 255, 0.2)',
      border: 'rgba(255, 255, 255, 0.3)',
      borderHover: 'rgba(255, 255, 255, 0.4)',
      blur: '8px',
      blurHover: '12px',
      shadow: '0px 2px 4px -1px rgba(0,0,0,0.1),0px 4px 5px 0px rgba(0,0,0,0.07),0px 1px 10px 0px rgba(0,0,0,0.06)',
      shadowHover: '0px 5px 5px -3px rgba(0,0,0,0.1),0px 8px 10px 1px rgba(0,0,0,0.07),0px 3px 14px 2px rgba(0,0,0,0.06)',
    },
    dark: {
      background: 'rgba(255, 255, 255, 0.15)',
      backgroundHover: 'rgba(255, 255, 255, 0.25)',
      backgroundActive: 'rgba(255, 255, 255, 0.2)',
      border: 'rgba(255, 255, 255, 0.3)',
      borderHover: 'rgba(255, 255, 255, 0.4)',
      blur: '8px',
      blurHover: '12px',
      shadow: '0px 2px 4px -1px rgba(0,0,0,0.1),0px 4px 5px 0px rgba(0,0,0,0.07),0px 1px 10px 0px rgba(0,0,0,0.06)',
      shadowHover: '0px 5px 5px -3px rgba(0,0,0,0.1),0px 8px 10px 1px rgba(0,0,0,0.07),0px 3px 14px 2px rgba(0,0,0,0.06)',
    }
  },
  overlay: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(0, 0, 0, 0.3)',
    dark: 'rgba(0, 0, 0, 0.5)',
  },
  ripple: {
    light: { opacity: 0.4 },
    dark: { opacity: 0.3 }
  },
  hoverLift: {
    transform: 'translateY(-2px)',
    transition: {
      properties: ['background-color', 'transform', 'box-shadow'],
      duration: 'shorter',
      easing: 'easeInOut'
    }
  }
};

export default effects;