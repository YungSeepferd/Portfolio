import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // primary color
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#dc004e', // secondary color
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff', // global background color
    },
    text: {
      primary: '#333333',
    },
  },
  shape: {
    // use a larger borderRadius across components for rounded corners
    borderRadius: 12,
  },
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1976d2',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    // Add additional typography variants as needed.
  },
  spacing: 8, // base spacing unit (8px)
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // disable uppercase
          borderRadius: 12, // rounded corners, use same value as shape.borderRadius
          padding: '10px 20px',
          boxShadow: 'none', // flat design – remove default box shadow
          transition: 'background-color 0.3s ease, transform 0.2s ease',
          '&:hover': {
            boxShadow: 'none', // flat hover state
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginBottom: '1rem',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12, // ensure Paper components use the same rounded corners
          boxShadow: 'none', // remove any default shadow for a flat look
        },
      },
    },
    // Continue for other components if needed...
  },
});

export default theme;