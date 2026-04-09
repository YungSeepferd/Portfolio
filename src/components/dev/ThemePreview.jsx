import React, { useMemo, useState } from 'react';
import { 
  Box, 
  Paper, 
  Container, 
  Typography, 
  Switch
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createAppTheme from '../../theme';
import { getSpacingPreset, getTypographyPreset } from '../../theme/presets';

/**
 * ThemePreview Component
 * 
 * A development tool that shows a sample of the theme with mode toggling capability.
 * This is useful for previewing theme changes in isolation.
 */
const ThemePreview = ({ baseTheme }) => {
  const initialMode = baseTheme?.palette?.mode ?? 'light';
  const [mode, setMode] = useState(initialMode);
  
  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const typographySamples = useMemo(() => (
    ['heroTitle', 'sectionTitle', 'cardTitle', 'bodyLong']
      .map((key) => ({ key, preset: getTypographyPreset(theme, key) }))
  ), [theme]);
  const spacingSamples = useMemo(() => (
    ['pageHorizontal', 'sectionVertical', 'cardContent']
      .map((key) => ({ key, preset: getSpacingPreset(key) }))
  ), []);
  
  const handleModeChange = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ pt: 4, pb: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'space-between' }}>
          <Typography variant="h4">Theme Preview</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 1 }}>Light</Typography>
            <Switch
              checked={mode === 'dark'}
              onChange={handleModeChange}
              color="primary"
            />
            <Typography variant="body2" sx={{ ml: 1 }}>Dark</Typography>
          </Box>
        </Box>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom>Typography</Typography>
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="h4">Heading 4</Typography>
          <Typography variant="h5">Heading 5</Typography>
          <Typography variant="h6">Heading 6</Typography>
          <Typography variant="subtitle1">Subtitle 1</Typography>
          <Typography variant="subtitle2">Subtitle 2</Typography>
          <Typography variant="body1" paragraph>Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</Typography>
          <Typography variant="body2" paragraph>Body 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</Typography>
          <Typography variant="button" display="block">Button Text</Typography>
          <Typography variant="caption" display="block">Caption Text</Typography>
          <Typography variant="overline" display="block">Overline Text</Typography>
        </Paper>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom>Typography Presets</Typography>
          {typographySamples.map(({ key, preset }) => (
            <Box key={key} sx={{ mb: 1.5 }}>
              <Typography
                variant={preset.variant}
                component={preset.component}
                sx={preset.sx}
              >
                {key} preset sample text
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {JSON.stringify(preset.sx)}
              </Typography>
            </Box>
          ))}
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>Colors & Palette</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
            {['primary', 'secondary', 'error', 'warning', 'info', 'success'].map(color => (
              <Box key={color} sx={{ width: '100px', textAlign: 'center' }}>
                <Box 
                  sx={{ 
                    bgcolor: `${color}.main`, 
                    color: `${color}.contrastText`,
                    p: 2, 
                    borderRadius: 1,
                    mb: 0.5 
                  }}
                >
                  {color}
                </Box>
                <Box 
                  sx={{ 
                    bgcolor: `${color}.light`, 
                    color: 'text.primary',
                    p: 1, 
                    borderRadius: 1,
                    mb: 0.5 
                  }}
                >
                  light
                </Box>
                <Box 
                  sx={{ 
                    bgcolor: `${color}.dark`, 
                    color: `${color}.contrastText`,
                    p: 1, 
                    borderRadius: 1
                  }}
                >
                  dark
                </Box>
              </Box>
            ))}
          </Box>
          
          <Typography variant="h6" gutterBottom>Background</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box 
              sx={{ 
                bgcolor: 'background.default', 
                color: 'text.primary',
                p: 2, 
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              Default
            </Box>
            <Box 
              sx={{ 
                bgcolor: 'background.paper', 
                color: 'text.primary',
                p: 2, 
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              Paper
            </Box>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>Spacing Presets</Typography>
            {spacingSamples.map(({ key, preset }) => (
              <Box key={key} sx={{ mb: 1.5 }}>
                <Typography variant="subtitle2">{key}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  {JSON.stringify(preset)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default ThemePreview;
