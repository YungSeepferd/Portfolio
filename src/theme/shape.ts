/**
 * Theme shape configuration
 */

interface ShapeConfig {
  borderRadius: number;
  radius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    default: number;
  };
}

const shape: ShapeConfig = {
  borderRadius: 4,
  radius: {
    xs: 1,
    sm: 2,
    md: 4,
    lg: 6,
    xl: 8,
    default: 4,
  },
};

export default shape;
