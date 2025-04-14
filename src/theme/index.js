import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { palette as lightPalette } from './palette/light';
import { palette as darkPalette } from './palette/dark';
import typography from './typography';
import breakpoints from './breakpoints';
import shadows from './shadows';
import shape from './shape';
import { getComponentOverrides } from './components';
import { createCustomParts } from './custom';

/**
 * Core theme creation function
 * Creates a complete theme based on the provided mode
 * 
 * @param {string} mode - 'light' or 'dark'
 * @returns {Object} Material UI theme object
 */
export const createAppTheme = (mode = 'light') => {
  // Select palette based on mode
  const palette = mode === 'dark' ? darkPalette : lightPalette;
  
  // Create base theme
  let theme = createTheme({
    palette: {
      mode,
      ...palette
    },
    typography,
    breakpoints: { values: breakpoints },
    shape,
    shadows
  });
  
  // Add component overrides
  theme = createTheme(theme, {
    components: getComponentOverrides(theme)
  });
  
  // Add custom parts for application-specific needs
  theme = {
    ...theme,
    ...createCustomParts(theme)
  };
  
  // Apply responsive typography
  theme = responsiveFontSizes(theme, {
    breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
    factor: 1.2,
  });
  
  return theme;
};

// Export pre-created theme instances
export const lightTheme = createAppTheme('light');
export const darkTheme = createAppTheme('dark');

// Export the theme creation function as default
export default createAppTheme;
