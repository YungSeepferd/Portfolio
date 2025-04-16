import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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

  // Color display component
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
      <Typography variant="body2">
        {name}: {color}
      </Typography>
    </Box>
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Fab 
        color="secondary" 
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
          {tabValue === 1 && (
            <Box>
              {renderObject(theme.typography)}
            </Box>
          )}
          {/* Spacing Tab */}
          {tabValue === 2 && (
            <Box>
              {renderObject(theme.spacing)}
            </Box>
          )}
          {/* Breakpoints Tab */}
          {tabValue === 3 && (
            <Box>
              {renderObject(theme.breakpoints)}
            </Box>
          )}
          {/* Animations Tab */}
          {tabValue === 4 && (
            <Box>
              {renderObject(theme.transitions)}
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default ThemeDebugger;
