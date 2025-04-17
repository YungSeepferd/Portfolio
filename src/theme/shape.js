// Define shape configuration
const shape = {
  // Responsive border radius values (in px)
  borderRadius: 4, // Reduced global border radius (was 8)
  radius: {
    xs: 1,   // Minimal rounding for mobile
    sm: 2,   // Slightly more for small screens
    md: 4,   // Default for most components
    lg: 6,   // Large cards/dialogs
    xl: 8,   // Extra large surfaces
    default: 4 // Fallback/default
  }
};

export default shape;
