// Define shape configuration
const shape = {
  // Base border radius
  borderRadius: 4,
  
  // Comprehensive border radius scale
  radius: {
    none: 0,     // No rounding
    xs: 2,       // Minimal rounding
    sm: 4,       // Small elements
    md: 8,       // Default components
    lg: 12,      // Large components
    xl: 16,      // Extra large components
    xxl: 24,     // Special cases like floating buttons
    full: '50%', // Circular elements
  },
  
  // Aspect ratios for media
  aspectRatio: {
    square: 1,
    portrait: 4/3,
    landscape: 16/9,
    ultrawide: 21/9,
  },
  
  // Border widths
  borderWidth: {
    thin: 1,
    regular: 2,
    thick: 3,
  }
};

export default shape;
