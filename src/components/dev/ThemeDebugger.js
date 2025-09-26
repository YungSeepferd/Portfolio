import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Fab,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaletteIcon from '@mui/icons-material/Palette';
import CloseIcon from '@mui/icons-material/Close';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import SpacingIcon from '@mui/icons-material/Straighten';
import AnimationIcon from '@mui/icons-material/Animation';
import BreakpointIcon from '@mui/icons-material/Devices';
import ExtensionIcon from '@mui/icons-material/Extension';
import { getSpacingPreset, getTypographyPreset, spacingPresets, typographyPresets } from '../../theme/presets';

/**
 * Theme Debugger Tool
 * 
 * A development-only component that displays the current theme values
 * for easier debugging and theme development.
 * 
 * Features:
 * - Shows palette colors with their values
 * - Displays typography styles
 * - Shows spacing, breakpoints, and custom tokens
 */
const ThemeDebugger = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  // Helper to render object values recursively
  const renderObject = (obj, indent = 0) => {
    if (!obj || typeof obj !== 'object') return null;
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        return (
          <Box key={key} sx={{ ml: indent }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{key}:</Typography>
            {renderObject(value, indent + 2)}
          </Box>
        );
      }
      return (
        <Box key={key} sx={{ ml: indent }}>
          <Typography variant="body2">
            <strong>{key}:</strong> {String(value)}
          </Typography>
        </Box>
      );
    });
  };

  // Helper to copy value to clipboard
  const copyToClipboard = (value) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value);
    }
  };

  // Enhanced ColorSwatch with copy button
  const ColorSwatch = ({ color, name }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Box 
        sx={{ 
          width: 24, 
          height: 24, 
          borderRadius: 1, 
          bgcolor: color,
          border: '1px solid rgba(0,0,0,0.1)',
          mr: 1
        }} 
      />
      <Typography variant="body2" sx={{ mr: 1 }}>
        {name}: {color}
      </Typography>
      <IconButton size="small" onClick={() => copyToClipboard(color)} title="Copy color value">
        <span role="img" aria-label="copy">📋</span>
      </IconButton>
    </Box>
  );

  // Typography preview for each variant
  const TypographyPreview = () => {
    const variantEntries = Object.entries(theme.typography).filter(([, value]) => (
      typeof value === 'object' && value !== null && Object.prototype.hasOwnProperty.call(value, 'fontSize')
    ));
    return (
      <Box>
        {variantEntries.map(([variant]) => (
          <Typography key={variant} variant={variant} sx={{ mb: 1 }}>
            {variant}: The quick brown fox jumps over the lazy dog
          </Typography>
        ))}
      </Box>
    );
  };

  // Spacing preview
  const SpacingPreview = () => (
    <Box>
      {[0, 0.5, 1, 2, 3, 4, 6, 8].map((factor) => (
        <Box key={factor} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ width: theme.spacing(factor), height: 16, bgcolor: 'primary.main', mr: 2 }} />
          <Typography variant="body2">theme.spacing({factor}) = {theme.spacing(factor)}</Typography>
          <IconButton size="small" onClick={() => copyToClipboard(theme.spacing(factor))} title="Copy spacing value">
            <span role="img" aria-label="copy">📋</span>
          </IconButton>
        </Box>
      ))}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Spacing Presets</Typography>
        {Object.keys(spacingPresets).map((key) => (
          <Box key={key} sx={{ mb: 1.5 }}>
            <Typography variant="body2">{key}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              {JSON.stringify(getSpacingPreset(key))}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );

  // Breakpoints preview
  const BreakpointsPreview = () => (
    <Box>
      {Object.entries(theme.breakpoints.values).map(([key, value]) => (
        <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" sx={{ mr: 1 }}>{key}: {value}px</Typography>
          <IconButton size="small" onClick={() => copyToClipboard(value)} title="Copy breakpoint value">
            <span role="img" aria-label="copy">📋</span>
          </IconButton>
        </Box>
      ))}
    </Box>
  );

  // Animations preview
  const AnimationsPreview = () => (
    <Box>
      {renderObject(theme.transitions)}
    </Box>
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Fab 
        color="primary" 
        size="small" 
        onClick={() => setOpen(true)}
        sx={{ 
          position: 'fixed', 
          bottom: 24, 
          right: 24, 
          zIndex: 2000
        }}
        aria-label="Open Theme Debugger"
      >
        <ExtensionIcon />
      </Fab>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 400, p: 3, bgcolor: 'background.default', height: '100vh', overflowY: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PaletteIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h5" sx={{ flex: 1 }}>Design System Debugger</Typography>
            <IconButton onClick={() => setOpen(false)}><CloseIcon /></IconButton>
          </Box>
          <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" sx={{ mb: 2 }}>
            <Tab icon={<PaletteIcon />} label="Palette" />
            <Tab icon={<TextFieldsIcon />} label="Typography" />
            <Tab icon={<SpacingIcon />} label="Spacing" />
            <Tab icon={<BreakpointIcon />} label="Breakpoints" />
            <Tab icon={<AnimationIcon />} label="Animations" />
            <Tab icon={<ExtensionIcon />} label="Presets" />
          </Tabs>
          {/* Palette Tab */}
          {tabValue === 0 && (
            <Box>
              {Object.entries(theme.palette).map(([key, value]) => {
                if (typeof value === 'object') {
                  return (
                    <Accordion key={key} disableGutters>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{key}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {Object.entries(value).map(([subKey, color]) => {
                          if (typeof color === 'string' && (color.startsWith('#') || color.startsWith('rgb'))) {
                            return <ColorSwatch key={subKey} color={color} name={subKey} />;
                          }
                          return null;
                        })}
                      </AccordionDetails>
                    </Accordion>
                  );
                }
                return null;
              })}
            </Box>
          )}
          {/* Typography Tab */}
          {tabValue === 1 && <TypographyPreview />}
          {/* Spacing Tab */}
          {tabValue === 2 && <SpacingPreview />}
          {/* Breakpoints Tab */}
          {tabValue === 3 && <BreakpointsPreview />}
          {/* Animations Tab */}
          {tabValue === 4 && <AnimationsPreview />}
          {/* Presets Tab */}
          {tabValue === 5 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Typography Presets</Typography>
              {Object.keys(typographyPresets).map((key) => {
                const preset = getTypographyPreset(theme, key);
                return (
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
                );
              })}
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Spacing Presets</Typography>
                {Object.keys(spacingPresets).map((key) => (
                  <Box key={key} sx={{ mb: 1.5 }}>
                    <Typography variant="body2">{key}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {JSON.stringify(getSpacingPreset(key))}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default ThemeDebugger;
