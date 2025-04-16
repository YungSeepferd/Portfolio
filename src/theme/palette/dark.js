import { createDarkPalette } from '../../design/tokens';

/**
 * Dark theme palette configuration
 * Uses the centralized color tokens for consistency
 */
export const palette = {
  mode: 'dark',
  ...createDarkPalette()
};

export default palette;
