import { useEffect } from 'react';
import theme from './theme';

// This component generates CSS variables from the theme object
// to be used in regular CSS files
const CSSVariables = () => {
  useEffect(() => {
    // Extract colors from theme and set as CSS variables
    const root = document.documentElement;

    // Primary colors
    root.style.setProperty('--primary-color', theme.palette.primary.main);
    root.style.setProperty('--primary-dark', theme.palette.primary.dark);
    root.style.setProperty('--primary-light', theme.palette.primary.light);
    
    // Secondary colors
    root.style.setProperty('--secondary-color', theme.palette.secondary.main);
    root.style.setProperty('--secondary-dark', theme.palette.secondary.dark);
    root.style.setProperty('--secondary-light', theme.palette.secondary.light);
    
    // Background colors
    root.style.setProperty('--background-default', theme.palette.background.default);
    root.style.setProperty('--background-paper', theme.palette.background.paper);
    root.style.setProperty('--background-light', theme.palette.background.paper);
    
    // Text colors
    root.style.setProperty('--text-primary', theme.palette.text.primary);
    root.style.setProperty('--text-secondary', theme.palette.text.secondary);
    
    // Accent
    root.style.setProperty('--accent-color', theme.palette.accent.main);
    
    // Bubbles
    root.style.setProperty('--bubbles-background', theme.palette.bubbles.background);
    root.style.setProperty('--bubbles-border', theme.palette.bubbles.border);
    
    // Card
    root.style.setProperty('--card-background', theme.palette.card.background);
    root.style.setProperty('--card-shadow', theme.palette.card.shadow);
    
    // Shadows
    root.style.setProperty('--shadow-light', theme.palette.shadow.light);
    root.style.setProperty('--shadow-medium', theme.palette.shadow.medium);
    root.style.setProperty('--shadow-dark', theme.palette.shadow.dark);
    
    // Overlays
    root.style.setProperty('--overlay-background', theme.palette.overlay.background);
    root.style.setProperty('--overlay-dark', theme.palette.overlay.dark);
    
    // Dots
    root.style.setProperty('--dots-inactive', theme.palette.dots.inactive);
    root.style.setProperty('--dots-active', theme.palette.dots.active);
    
    // Placeholder
    root.style.setProperty('--placeholder', theme.palette.placeholder);
    
    // Other
    root.style.setProperty('--divider', theme.palette.divider);

    // Add spacing variables
    root.style.setProperty('--spacing', `${theme.spacing(1)}px`);
    root.style.setProperty('--spacing-2', `${theme.spacing(2)}px`);
    root.style.setProperty('--spacing-3', `${theme.spacing(3)}px`);
    root.style.setProperty('--spacing-4', `${theme.spacing(4)}px`);
    root.style.setProperty('--spacing-5', `${theme.spacing(5)}px`);
    root.style.setProperty('--spacing-6', `${theme.spacing(6)}px`);
    root.style.setProperty('--spacing-8', `${theme.spacing(8)}px`);
    
    // Border radius
    root.style.setProperty('--border-radius', `${theme.shape.borderRadius}px`);
    
    // Typography - Font sizes
    for (const key in theme.typography) {
      if (theme.typography[key].fontSize) {
        root.style.setProperty(`--font-size-${key}`, theme.typography[key].fontSize);
      }
    }
    
    // Font weights
    root.style.setProperty('--font-weight-light', '300');
    root.style.setProperty('--font-weight-regular', '400');
    root.style.setProperty('--font-weight-medium', '500');
    root.style.setProperty('--font-weight-bold', '700');
    
    // Transitions
    root.style.setProperty('--transition-fast', '0.3s');
    root.style.setProperty('--transition-standard', '0.5s');
    
    // Z-index values
    root.style.setProperty('--z-index-modal', '1300');
    root.style.setProperty('--z-index-appbar', '1100');
    root.style.setProperty('--z-index-drawer', '1200');
    
  }, []);

  return null; // This component doesn't render anything
};

export default CSSVariables;
