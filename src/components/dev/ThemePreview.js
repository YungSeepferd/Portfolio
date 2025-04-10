import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Divider,
  AppBar,
  Toolbar,
  Switch,
  FormControlLabel,
  useTheme,
  ThemeProvider,
  createTheme
} from '@mui/material';

/**
 * ThemePreview Component
 * 
 * A sandbox environment to preview how components look with different theme settings.
 * Allows toggling between light and dark mode and showcases various components.
 */
const ThemePreview = ({ baseTheme }) => {
  const [mode, setMode] = useState('dark');
  const [tabValue, setTabValue] = useState(0);
  
  // Create a custom theme based on the base theme but with the selected mode
  const theme = React.useMemo(() => {
    if (!baseTheme) return createTheme({ palette: { mode } });
    
    return createTheme({
      ...baseTheme,
      palette: {
        ...baseTheme.palette,
        mode,
      },
    });
  }, [baseTheme, mode]);
  
  const handleModeChange = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', width: '100%' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Theme Preview
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={mode === 'dark'}
                  onChange={handleModeChange}
                  color="default"
                />
              }
              label={mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
            />
          </Toolbar>
        </AppBar>
        
        <Box sx={{ p: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="Typography" />
            <Tab label="Buttons" />
            <Tab label="Cards" />
            <Tab label="Forms" />
          </Tabs>
          
          {/* Typography Section */}
          {tabValue === 0 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h1" gutterBottom>h1. Heading</Typography>
              <Typography variant="h2" gutterBottom>h2. Heading</Typography>
              <Typography variant="h3" gutterBottom>h3. Heading</Typography>
              <Typography variant="h4" gutterBottom>h4. Heading</Typography>
              <Typography variant="h5" gutterBottom>h5. Heading</Typography>
              <Typography variant="h6" gutterBottom>h6. Heading</Typography>
              <Typography variant="subtitle1" gutterBottom>subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Typography>
              <Typography variant="subtitle2" gutterBottom>subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Typography>
              <Typography variant="body1" gutterBottom>body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur.</Typography>
              <Typography variant="body2" gutterBottom>body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur.</Typography>
              <Typography variant="button" display="block" gutterBottom>button text</Typography>
              <Typography variant="caption" display="block" gutterBottom>caption text</Typography>
              <Typography variant="overline" display="block" gutterBottom>overline text</Typography>
            </Paper>
          )}
          
          {/* Buttons Section */}
          {tabValue === 1 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>Contained Buttons</Typography>
                <Button variant="contained" color="primary" sx={{ mr: 1, mb: 1 }}>Primary</Button>
                <Button variant="contained" color="secondary" sx={{ mr: 1, mb: 1 }}>Secondary</Button>
                <Button variant="contained" color="success" sx={{ mr: 1, mb: 1 }}>Success</Button>
                <Button variant="contained" color="error" sx={{ mr: 1, mb: 1 }}>Error</Button>
                <Button variant="contained" color="info" sx={{ mr: 1, mb: 1 }}>Info</Button>
                <Button variant="contained" color="warning" sx={{ mr: 1, mb: 1 }}>Warning</Button>
                <Button variant="contained" disabled sx={{ mr: 1, mb: 1 }}>Disabled</Button>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>Outlined Buttons</Typography>
                <Button variant="outlined" color="primary" sx={{ mr: 1, mb: 1 }}>Primary</Button>
                <Button variant="outlined" color="secondary" sx={{ mr: 1, mb: 1 }}>Secondary</Button>
                <Button variant="outlined" color="success" sx={{ mr: 1, mb: 1 }}>Success</Button>
                <Button variant="outlined" color="error" sx={{ mr: 1, mb: 1 }}>Error</Button>
                <Button variant="outlined" color="info" sx={{ mr: 1, mb: 1 }}>Info</Button>
                <Button variant="outlined" color="warning" sx={{ mr: 1, mb: 1 }}>Warning</Button>
                <Button variant="outlined" disabled sx={{ mr: 1, mb: 1 }}>Disabled</Button>
              </Box>
              
              <Box>
                <Typography variant="h6" gutterBottom>Text Buttons</Typography>
                <Button color="primary" sx={{ mr: 1, mb: 1 }}>Primary</Button>
                <Button color="secondary" sx={{ mr: 1, mb: 1 }}>Secondary</Button>
                <Button color="success" sx={{ mr: 1, mb: 1 }}>Success</Button>
                <Button color="error" sx={{ mr: 1, mb: 1 }}>Error</Button>
                <Button color="info" sx={{ mr: 1, mb: 1 }}>Info</Button>
                <Button color="warning" sx={{ mr: 1, mb: 1 }}>Warning</Button>
                <Button disabled sx={{ mr: 1, mb: 1 }}>Disabled</Button>
              </Box>
            </Paper>
          )}
          
          {/* Cards Section */}
          {tabValue === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://source.unsplash.com/random/800x600/?nature"
                    alt="Random nature"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Basic Card
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      This is an example of a basic card with an image, content, and actions.
                      Cards support a wide variety of content, including images, text, and buttons.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Primary Card
                    </Typography>
                    <Typography variant="body2">
                      This card uses the primary color as its background.
                      The text color adjusts automatically for contrast.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained" color="secondary">
                      Action
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText' }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Secondary Card
                    </Typography>
                    <Typography variant="body2">
                      This card uses the secondary color as its background.
                      The text color adjusts automatically for contrast.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained" color="primary">
                      Action
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          )}
          
          {/* Forms Section */}
          {tabValue === 3 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>Form Elements</Typography>
              
              <Box sx={{ mb: 3 }}>
                <TextField
                  label="Standard"
                  variant="standard"
                  sx={{ mr: 2, mb: 2 }}
                />
                <TextField
                  label="Outlined"
                  variant="outlined"
                  sx={{ mr: 2, mb: 2 }}
                />
                <TextField
                  label="Filled"
                  variant="filled"
                  sx={{ mr: 2, mb: 2 }}
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <TextField
                  label="With Helper Text"
                  helperText="Some important text"
                  sx={{ mr: 2, mb: 2 }}
                />
                <TextField
                  label="With Error"
                  error
                  helperText="Error message"
                  sx={{ mr: 2, mb: 2 }}
                />
                <TextField
                  label="Disabled"
                  disabled
                  sx={{ mr: 2, mb: 2 }}
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <TextField
                  label="With Icon"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  sx={{ mr: 2, mb: 2 }}
                />
                <TextField
                  label="Password"
                  type="password"
                  sx={{ mr: 2, mb: 2 }}
                />
                <TextField
                  label="Multiline"
                  multiline
                  rows={4}
                  sx={{ mr: 2, mb: 2 }}
                />
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>Form Actions</Typography>
              <Box>
                <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                  Submit
                </Button>
                <Button variant="outlined" color="secondary">
                  Cancel
                </Button>
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ThemePreview;
