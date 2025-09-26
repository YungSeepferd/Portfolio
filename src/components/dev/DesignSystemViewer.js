import React from 'react';
import { 
  Box, Typography, Grid, Paper, Divider, useTheme, 
  Button, Chip, Card, CardContent, Avatar, TextField
} from '@mui/material';

/**
 * DesignSystemViewer Component
 * 
 * Displays all design system elements to ensure consistency.
 * Use this component to visualize and test your design system.
 */
const DesignSystemViewer = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h2" gutterBottom>Design System</Typography>
      
      {/* Typography */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Typography</Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          {['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 
            'body1', 'body2', 'caption', 'button', 'overline'].map(variant => (
            <Grid item xs={12} key={variant}>
              <Typography variant={variant}>
                {variant}: The quick brown fox jumps over the lazy dog
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
      
      {/* Colors */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Color Palette</Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          {['primary', 'secondary', 'error', 'warning', 'info', 'success'].map(color => (
            <React.Fragment key={color}>
              <Grid item xs={12}>
                <Typography variant="h6">{color}</Typography>
              </Grid>
              {['light', 'main', 'dark'].map(shade => (
                <Grid item xs={4} key={`${color}-${shade}`}>
                  <Box 
                    sx={{ 
                      bgcolor: theme.palette[color][shade], 
                      height: 100, 
                      borderRadius: theme.shape.borderRadius,
                      p: 2
                    }}
                  >
                    <Typography sx={{ color: '#fff' }}>{shade}</Typography>
                    <Typography sx={{ color: '#fff' }}>{theme.palette[color][shade]}</Typography>
                  </Box>
                </Grid>
              ))}
            </React.Fragment>
          ))}
        </Grid>
      </Paper>
      
      {/* Components */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Components</Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="h5" gutterBottom>Buttons</Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {['contained', 'outlined', 'text'].map(variant => (
            <Grid item xs={12} sm={4} key={variant}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>{variant}</Typography>
                {['primary', 'secondary', 'error', 'warning', 'info', 'success'].map(color => (
                  <Button 
                    key={`${variant}-${color}`}
                    variant={variant} 
                    color={color}
                    sx={{ mr: 1, mb: 1 }}
                  >
                    {color}
                  </Button>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
        
        {/* Add other component showcases here */}
      </Paper>

      {/* Shadows */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Shadows</Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          {Object.entries(theme.shadows).map(([key, value]) => (
            <Grid item xs={6} sm={4} md={3} key={key}>
              <Box sx={{ boxShadow: value, p: 2, mb: 1, borderRadius: 1, bgcolor: 'background.paper' }}>
                <Typography variant="body2">{`shadows[${key}]`}</Typography>
                <Typography variant="caption" sx={{ wordBreak: 'break-all' }}>{value}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Shape & Border Radius */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Shape & Border Radius</Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          {Object.entries(theme.shape).map(([key, value]) => (
            <Grid item xs={6} sm={4} md={3} key={key}>
              <Box sx={{ borderRadius: value, border: '2px solid', borderColor: 'primary.main', p: 2, mb: 1 }}>
                <Typography variant="body2">{`shape.${key}`}</Typography>
                <Typography variant="caption">{value}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Breakpoints */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Breakpoints</Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          {Object.entries(theme.breakpoints.values).map(([key, value]) => (
            <Grid item xs={6} sm={4} md={3} key={key}>
              <Box sx={{ p: 2, mb: 1, border: '1px dashed', borderColor: 'primary.main', borderRadius: 1 }}>
                <Typography variant="body2">{key}</Typography>
                <Typography variant="caption">{value}px</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Animations */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Animations & Transitions</Typography>
        <Divider sx={{ mb: 3 }} />
        <Box>
          {Object.entries(theme.transitions).map(([key, value]) => (
            <Box key={key} sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{key}:</Typography>
              <Typography variant="caption">{JSON.stringify(value)}</Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default DesignSystemViewer;
