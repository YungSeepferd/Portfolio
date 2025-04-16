import { createLightPalette } from '../../design/tokens';

/**
 * Light theme palette configuration
 * Uses the centralized color tokens for consistency
 */
export const palette = {
  mode: 'light',
  ...createLightPalette()
};

export default palette;
