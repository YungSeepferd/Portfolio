/**
 * Effects tokens for the design system
 * These tokens define visual effects like glassmorphism, overlays, and filters
 */

const effects = {
  glassmorphism: {
    light: {
      background: 'rgba(5, 38, 45, 0.20)',
      backgroundHover: 'rgba(5, 38, 45, 0.30)',
      backgroundActive: 'rgba(5, 38, 45, 0.25)',
      border: 'rgba(5, 38, 45, 0.3)',
      borderHover: 'rgba(5, 38, 45, 0.4)',
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
  // Dedicated tokens for chip glass styling
  chipGlass: {
    light: {
      // Black glass with light foreground for light theme
      background: 'rgba(0, 0, 0, 0.24)',
      hoverBackground: 'rgba(0, 0, 0, 0.34)',
      activeBackground: 'rgba(0, 0, 0, 0.28)',
      border: 'rgba(255, 255, 255, 0.22)',
      text: 'rgba(255, 255, 255, 0.92)',
      icon: 'rgba(255, 255, 255, 0.92)',
      blur: '8px',
      blurHover: '12px',
    },
    dark: {
      // White glass with light foreground for dark theme
      background: 'rgba(255, 255, 255, 0.15)',
      hoverBackground: 'rgba(255, 255, 255, 0.25)',
      activeBackground: 'rgba(255, 255, 255, 0.2)',
      border: 'rgba(255, 255, 255, 0.30)',
      text: '#FFFFFF',
      icon: '#FFFFFF',
      blur: '8px',
      blurHover: '12px',
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