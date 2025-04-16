import { tokens } from '../design/tokens';

// Define shape configuration
const shape = {
  borderRadius: parseInt(tokens.borderRadius.md.replace('px', ''), 10), // Converts '8px' to 8
};

export default shape;
