import { useEffect } from 'react';
import theme, { globalStyles } from './theme';

/**
 * CSSVariables Component
 * 
 * This component generates CSS variables from the theme object
 * to be used in regular CSS files. It runs once on mount and
 * injects CSS variables into the :root element.
 * 
 * The variables follow a consistent naming convention:
 * --category-property for easy organization
 */
const CSSVariables = () => {
  useEffect(() => {
    // Get document root element to set CSS variables
    const root = document.documentElement;
    
    // Add global animation keyframes and font imports
    const styleEl = document.createElement('style');
    styleEl.textContent = globalStyles;
    document.head.appendChild(styleEl);
    
    // ========== COLOR VARIABLES ==========
    
    // Primary colors
    root.style.setProperty('--primary-main', theme.palette.primary.main);
    root.style.setProperty('--primary-dark', theme.palette.primary.dark);
    root.style.setProperty('--primary-light', theme.palette.primary.light);
    root.style.setProperty('--primary-contrast', theme.palette.primary.contrastText);
    
    // Secondary colors
    root.style.setProperty('--secondary-main', theme.palette.secondary.main);
    root.style.setProperty('--secondary-dark', theme.palette.secondary.dark);
    root.style.setProperty('--secondary-light', theme.palette.secondary.light);
    root.style.setProperty('--secondary-contrast', theme.palette.secondary.contrastText);
    
    // Background colors
    root.style.setProperty('--bg-default', theme.palette.background.default);
    root.style.setProperty('--bg-paper', theme.palette.background.paper);
    root.style.setProperty('--bg-alternate', theme.palette.background.alternatePanel);
    
    // Text colors
    root.style.setProperty('--text-primary', theme.palette.text.primary);
    root.style.setProperty('--text-secondary', theme.palette.text.secondary);
    root.style.setProperty('--text-muted', theme.palette.text.muted);
    root.style.setProperty('--text-accent', theme.palette.text.accent);
    
    // Accent colors
    root.style.setProperty('--accent-main', theme.palette.accent.main);
    root.style.setProperty('--accent-dark', theme.palette.accent.dark);
    root.style.setProperty('--accent-light', theme.palette.accent.light);
    
    // Bubbles
    root.style.setProperty('--bubbles-bg', theme.palette.bubbles.background);
    root.style.setProperty('--bubbles-border', theme.palette.bubbles.border);
    
    // Card
    root.style.setProperty('--card-bg', theme.palette.card.background);
    root.style.setProperty('--card-shadow', theme.palette.card.shadow);
    root.style.setProperty('--card-glow', theme.palette.card.activeGlow);
    root.style.setProperty('--card-border', theme.palette.card.border);
    
    // Shadows
    root.style.setProperty('--shadow-light', theme.palette.shadow.light);
    root.style.setProperty('--shadow-medium', theme.palette.shadow.medium);
    root.style.setProperty('--shadow-dark', theme.palette.shadow.dark);
    
    // Overlays
    root.style.setProperty('--overlay-bg', theme.palette.overlay.background);
    root.style.setProperty('--overlay-dark', theme.palette.overlay.dark);
    
    // Dots
    root.style.setProperty('--dots-inactive', theme.palette.dots.inactive);
    root.style.setProperty('--dots-active', theme.palette.secondary.main);
    
    // Status colors
    root.style.setProperty('--status-success', theme.palette.status.success);
    root.style.setProperty('--status-warning', theme.palette.status.warning);
    root.style.setProperty('--status-error', theme.palette.status.error);
    root.style.setProperty('--status-info', theme.palette.status.info);
    
    // Structure
    root.style.setProperty('--divider', theme.palette.divider);
    root.style.setProperty('--borders', theme.palette.structure.borders);
    root.style.setProperty('--lines', theme.palette.structure.lines);
    
    // ========== SPACING VARIABLES ==========
    
    // Base spacings from 1-12
    for (let i = 1; i <= 12; i++) {
      root.style.setProperty(`--spacing-${i}`, theme.spacing(i));
    }
    
    // Named spacings
    root.style.setProperty('--spacing-xs', theme.spacing(0.5)); // 4px
    root.style.setProperty('--spacing-sm', theme.spacing(1)); // 8px
    root.style.setProperty('--spacing-md', theme.spacing(2)); // 16px
    root.style.setProperty('--spacing-lg', theme.spacing(3)); // 24px
    root.style.setProperty('--spacing-xl', theme.spacing(4)); // 32px
    root.style.setProperty('--spacing-xxl', theme.spacing(6)); // 48px
    root.style.setProperty('--spacing-section', theme.spacing(8)); // 64px
    
    // Semantic spacing
    root.style.setProperty('--section-padding', theme.spacing(theme.spacingSizes.section));
    root.style.setProperty('--container-padding', theme.spacing(theme.spacingSizes.container));
    root.style.setProperty('--card-padding', theme.spacing(theme.spacingSizes.cardPadding));
    root.style.setProperty('--element-gap', theme.spacing(theme.spacingSizes.elementGap));
    
    // ========== TYPOGRAPHY VARIABLES ==========
    
    // Font family
    root.style.setProperty('--font-family', theme.typography.fontFamily);
    
    // Font sizes for each variant
    for (const key in theme.typography) {
      if (theme.typography[key].fontSize) {
        root.style.setProperty(`--font-size-${key}`, theme.typography[key].fontSize);
      }
    }
    
    // Font weights
    root.style.setProperty('--font-weight-light', '300');
    root.style.setProperty('--font-weight-regular', '400');
    root.style.setProperty('--font-weight-medium', '500');
    root.style.setProperty('--font-weight-semibold', '600');
    root.style.setProperty('--font-weight-bold', '700');
    
    // ========== ANIMATION VARIABLES ==========
    
    // Transition durations
    root.style.setProperty('--transition-short', `${theme.animationSettings.durations.short}ms`);
    root.style.setProperty('--transition-medium', `${theme.animationSettings.durations.medium}ms`);
    root.style.setProperty('--transition-long', `${theme.animationSettings.durations.long}ms`);
    
    // Easings
    root.style.setProperty('--easing-standard', theme.animationSettings.easings.css.standard);
    root.style.setProperty('--easing-accelerate', theme.animationSettings.easings.css.accelerate);
    root.style.setProperty('--easing-decelerate', theme.animationSettings.easings.css.decelerate);
    
    // Common transitions
    root.style.setProperty('--transition-hover', theme.animationSettings.transitions.hover);
    root.style.setProperty('--transition-active', theme.animationSettings.transitions.active);
    
    // ========== SHAPE VARIABLES ==========
    
    // Border radius
    root.style.setProperty('--border-radius', `${theme.shape.borderRadius}px`);
    root.style.setProperty('--border-radius-sm', `${theme.shape.borderRadius/2}px`);
    root.style.setProperty('--border-radius-lg', `${theme.shape.borderRadius*2}px`);
    
    // ========== Z-INDEX VARIABLES ==========
    
    // Z-index values
    for (const key in theme.zIndex) {
      root.style.setProperty(`--z-${key}`, theme.zIndex[key]);
    }
    
    // ========== CUSTOM COMPONENT VARIABLES ==========
    
    // Project bubble
    root.style.setProperty('--project-bubble-width', `${theme.customComponents.projectBubble.width}`);
    root.style.setProperty('--project-bubble-height', `${theme.customComponents.projectBubble.height}`);
    root.style.setProperty('--project-bubble-hover-scale', theme.customComponents.projectBubble.hoverScale);
    
    // Parallax settings
    root.style.setProperty('--parallax-container-width', theme.customComponents.parallax.container.width);
    root.style.setProperty('--slideshow-height', theme.customComponents.parallax.slideshow.height);
    root.style.setProperty('--dot-size', theme.customComponents.parallax.dot.size);
    
    // Custom sizes
    for (const key in theme.customSizes) {
      root.style.setProperty(`--size-${key}`, theme.customSizes[key]);
    }
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);
  
  // This component doesn't render anything
  return null;
};

export default CSSVariables;
