// Summary: This file sets the overall Material-UI theme values—including palette, typography, 
// shape, and component-specific overrides—to maintain a consistent design across pages.
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0B5868',         // dark blue (primary)
      contrastText: '#FFE44B', // bright yellow for high contrast
    },
    secondary: {
      main: '#A1E3D8',         // light blue (secondary)
      contrastText: '#05262D', // dark tone for text contrast
    },
    background: {
      default: '#F6F09C',      // light yellow for global background
    },
    text: {
      primary: '#05262D',      // dark tone for primary text
    },
    // Additional custom theme properties:
    accent: {
      main: '#968445',         // earthy accent color
    },
    bubbles: {
      background: '#F6F09C',   // use the light background tone
      border: '#968445',       // accent for borders
    },
    card: {
      background: '#ffffff',   // maintain white for card backgrounds
      shadow: 'rgba(0, 0, 0, 0.2)',
    },
    filter: {
      active: '#0B5868',       // use primary as active state
      inactive: '#999999',
    },
  },
  shape: {
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
      color: '#0B5868',
    },
    h4: {
      fontSize: '1.6rem',
      fontWeight: 500,
    },  
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    // Additional typography variants can be added here.
  },
  spacing: 8, // base spacing unit (8px)
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // disable uppercase
          textAlign: 'left',
          borderRadius: 12,
          padding: '10px 20px',
          boxShadow: 'none',
          transition: 'background-color 0.3s ease, transform 0.2s ease',
          '&:hover': {
            boxShadow: 'none',
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
          borderRadius: 12,
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: 'secondary.light',
          minHeight: '400px' // Norm all cards with the same height for a continuous stripe look
        },
      },
    },
    // Other components can be overridden here…
  },
});

// Alternatively, remove this block if it's not needed

export default theme;