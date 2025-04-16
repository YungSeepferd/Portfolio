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
 * - Shows spacing values
 * - Shows breakpoints
 * - Displays custom theme extensions
 * - Shows animation settings
 */
const ThemeDebugger = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') return null;

  // Function to convert object to displayable format
  const formatObject = (obj, indent = 0) => {
    if (!obj) return 'null';
    if (typeof obj !== 'object') return String(obj);
    
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        return (
          <Box key={key} sx={{ ml: indent }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {key}:
            </Typography>
            {formatObject(value, indent + 2)}
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
          bottom: 16, 
          right: 16,
          zIndex: 9999,
        }}
      >
        <PaletteIcon />
      </Fab>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          '& .MuiDrawer-paper': { 
            width: { xs: '100%', sm: 400 },
            maxWidth: '100%',
            p: 2,
            bgcolor: '#f5f5f5',
            color: '#333',
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            <PaletteIcon sx={{ mr: 1 }} /> Theme Debugger
          </Typography>
          <IconButton onClick={() => setOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<PaletteIcon />} label="Palette" />
          <Tab icon={<TextFieldsIcon />} label="Typography" />
          <Tab icon={<SpacingIcon />} label="Spacing" />
          <Tab icon={<BreakpointIcon />} label="Breakpoints" />
          <Tab icon={<AnimationIcon />} label="Animations" />
          <Tab icon={<ExtensionIcon />} label="Extensions" />
        </Tabs>

        <Box sx={{ overflow: 'auto', height: 'calc(100% - 100px)' }}>
          {/* Palette Tab */}
          {tabValue === 0 && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>Theme Mode: {theme.palette.mode}</Typography>
              
              {Object.entries(theme.palette).map(([key, value]) => {
                if (typeof value === 'object' && value !== null && !React.isValidElement(value)) {
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
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Variant</TableCell>
                    <TableCell>Font Size</TableCell>
                    <TableCell>Font Weight</TableCell>
                    <TableCell>Line Height</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(theme.typography).map(([variant, styles]) => {
                    if (typeof styles === 'object' && !React.isValidElement(styles)) {
                      return (
                        <TableRow key={variant}>
                          <TableCell>
                            <Typography variant={variant}>{variant}</Typography>
                          </TableCell>
                          <TableCell>{styles.fontSize}</TableCell>
                          <TableCell>{styles.fontWeight}</TableCell>
                          <TableCell>{styles.lineHeight}</TableCell>
                        </TableRow>
                      );
                    }
                    return null;
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Spacing Tab */}
          {tabValue === 2 && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>Spacing Units</Typography>
              <Paper sx={{ p: 2 }}>
                {[0, 0.5, 1, 2, 3, 4, 6, 8, 10, 12].map((unit) => (
                  <Box key={unit} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box 
                      sx={{ 
                        width: theme.spacing(unit), 
                        height: 20, 
                        bgcolor: theme.palette.primary.main,
                        mr: 2
                      }} 
                    />
                    <Typography variant="body2">
                      theme.spacing({unit}) = {theme.spacing(unit)}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            </Box>
          )}

          {/* Breakpoints Tab */}
          {tabValue === 3 && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>Breakpoints</Typography>
              <Paper sx={{ p: 2 }}>
                {Object.entries(theme.breakpoints.values).map(([key, value]) => (
                  <Typography key={key} variant="body2" gutterBottom>
                    {key}: {value}px
                  </Typography>
                ))}
              </Paper>
            </Box>
          )}

          {/* Animations Tab */}
          {tabValue === 4 && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>Animation Settings</Typography>
              <Paper sx={{ p: 2 }}>
                {theme.animationSettings ? (
                  formatObject(theme.animationSettings)
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No animation settings defined in theme
                  </Typography>
                )}
              </Paper>
            </Box>
          )}

          {/* Extensions Tab */}
          {tabValue === 5 && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>Custom Theme Extensions</Typography>
              
              {/* Custom Sections */}
              <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>customSections</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {theme.customSections ? (
                    formatObject(theme.customSections)
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No custom sections defined
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
              
              {/* Custom Components */}
              <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>customComponents</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {theme.customComponents ? (
                    formatObject(theme.customComponents)
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No custom components defined
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
              
              {/* Custom Effects */}
              <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>customEffects</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {theme.customEffects ? (
                    formatObject(theme.customEffects)
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No custom effects defined
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default ThemeDebugger;
