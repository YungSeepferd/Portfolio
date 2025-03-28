// Summary: This file sets the overall Material-UI theme values with the new color scheme.
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // Keep dark mode
    primary: {
      main: '#5363EE',         // Blue-purple for headings and footer
      contrastText: '#FFFFFF', // White text on primary buttons
      dark: '#4353D9',         // Slightly darker primary 
      light: '#6E7CFF',        // Lighter primary variant
    },
    secondary: {
      main: '#C2F750',         // Bright lime green for interactive elements
      contrastText: '#0E1A27', // Dark text on secondary buttons for contrast
      dark: '#ABDF3A',         // Darker secondary shade
      light: '#D4FF69',        // Lighter secondary shade
    },
    background: {
      default: '#0E1A27',      // Dark blue background as requested
      paper: '#131F2D',        // Slightly lighter for cards and components
      alternatePanel: '#1A2736', // Subtle lighter panel for alternating sections
    },
    text: {
      primary: '#FFFFFF',      // White text for primary content
      secondary: '#CCCCCC',    // Light gray for secondary text
      light: '#FFFFFF',        // White text kept the same
      muted: '#A0A0A0',        // Mid gray for less important content
      accent: '#C2F750',       // Green text accents
    },
    accent: {
      main: '#C2F750',         // Lime green as accent color
      dark: '#ABDF3A',         // Darker accent
      light: '#D4FF69',        // Lighter accent
      contrast: '#0E1A27',     // Dark text on accent backgrounds
    },
    bubbles: {
      background: '#1A2736',   // Dark bubble background
      border: '#3545D6',       // Blue border as specified
    },
    card: {
      background: '#131F2D',   // Slightly lighter than main background
      shadow: 'rgba(5, 10, 15, 0.4)', // Dark shadows
      activeGlow: 'rgba(194, 247, 80, 0.25)', // Green-tinted glow
      border: '#3545D6',       // Border color as specified
    },
    filter: {
      active: '#C2F750',       // Green for active state
      inactive: '#505050',     // Muted gray for inactive state
    },
    action: {
      hover: 'rgba(194, 247, 80, 0.15)', // Green-tinted hover
      selected: 'rgba(194, 247, 80, 0.25)', // Green-tinted selection
      disabled: 'rgba(255, 255, 255, 0.3)', // Light disabled state
      disabledBackground: 'rgba(255, 255, 255, 0.12)', // Light disabled background
    },
    divider: '#3545D6', // Blue divider as specified for content separation
    shadow: {
      light: 'rgba(5, 10, 15, 0.3)', // Dark theme shadows
      medium: 'rgba(5, 10, 15, 0.5)',
      dark: 'rgba(5, 10, 15, 0.7)',
    },
    overlay: {
      background: 'rgba(14, 26, 39, 0.85)', // Dark overlay
      dark: 'rgba(10, 18, 28, 0.9)', // Darker overlay
    },
    dots: {
      inactive: '#3545D6', // Blue inactive dots
      active: '#C2F750',   // Green active dots
    },
    placeholder: '#1A2736', // Dark placeholder
    transitions: {
      short: '0.3s',
      medium: '0.5s',
      long: '0.8s',
    },
    status: {
      success: '#C2F750', // Use the green for success
      warning: '#FFA726', // Keep warning
      error: '#F44336',   // Keep error bright
      info: '#5363EE',    // Use primary blue for info
    },
    focus: {
      outline: '#C2F750', // Green focus outline
    },
    // Additional structural color
    structure: {
      borders: '#3545D6', // Deep blue for borders and structural elements
      lines: '#3545D6',   // Same blue for lines
      outlines: '#3545D6', // Same blue for outlines
    },
  },
  shape: {
    borderRadius: 6, // Reduced from 12px to 6px for less rounded corners
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
      color: '#5363EE', // Updated to primary blue for headings
    },
    h4: {
      fontSize: '1.6rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.4rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.2rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.66,
    },
    overline: {
      fontSize: '0.75rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
    projectTitle: {
      fontSize: '2.5rem', // Larger than h4 (1.6rem)
      fontWeight: 700,    // Bold
      lineHeight: 1.2,    // Tighter line height
      letterSpacing: '-0.02em', // Slightly tighter letter spacing
      color: '#5363EE', // Primary color for project titles
    },
    chipText: {
      fontSize: '1rem', // New typography variant for chip text
      fontWeight: 500,
      lineHeight: 1.5,
    },
  },
  spacing: 8, // base spacing unit (8px)
  customSizes: {
    bigCardHeight: '400px',      // full height for the big card
    bigCardImageWidth: '300px'     // fixed width for the left-side image section
  },
  spacingSizes: {
    section: 8, // 8 * spacing unit (64px)
    container: 4, // 4 * spacing unit (32px)
    cardPadding: 3, // 3 * spacing unit (24px)
    elementGap: 2, // 2 * spacing unit (16px)
  },
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  customBreakpoints: {
    xs: '0px',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1536px',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // disable uppercase
          textAlign: 'left',
          borderRadius: 6, // Updated to match the new shape.borderRadius
          padding: '10px 20px',
          boxShadow: 'none',
          transition: 'background-color 0.3s ease, transform 0.2s ease',
          '&:hover': {
            boxShadow: '0 0 8px rgba(194, 247, 80, 0.5)', // Green glow on hover
          },
          '&.MuiButton-containedPrimary': {
            backgroundColor: '#5363EE',
            color: '#FFFFFF',
          },
          '&.MuiButton-containedSecondary': {
            backgroundColor: '#C2F750',
            color: '#0E1A27',
          },
          '&.MuiButton-outlinedPrimary': {
            borderColor: '#5363EE',
            color: '#5363EE',
          },
          '&.MuiButton-outlinedSecondary': {
            borderColor: '#C2F750',
            color: '#C2F750',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginBottom: '1rem',
          '& .MuiTabs-indicator': {
            backgroundColor: '#5363EE', // Changed from #C2F750 (green) to primary blue
            height: 3, // Slightly thicker indicator for better visibility
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          transition: 'color 0.3s ease',
          '&.Mui-selected': {
            color: '#5363EE', // Changed from #C2F750 (green) to primary blue
          },
          '&:hover': {
            color: '#C2F750', // Keep hover state as green for interactive feedback
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 6, // Updated to match the new shape.borderRadius
          boxShadow: 'none',
          backgroundColor: '#131F2D', // Dark background for papers
          border: '1px solid #3545D6', // Default border
        },
      },
      variants: [
        {
          props: { variant: 'overlay' },
          style: ({ theme }) => ({
            backgroundColor: 'rgba(14, 26, 39, 0.9)',
            color: theme.palette.common.white,
            padding: theme.spacing(4),
            borderRadius: theme.shape.borderRadius,
          }),
        },
        {
          props: { variant: 'bigCard' },
          style: ({ theme }) => ({
            padding: theme.spacing(2),
            borderRadius: theme.shape.borderRadius,
            backgroundColor: '#131F2D',
          }),
        },
        {
          props: { variant: 'aboutSection' },
          style: ({ theme }) => ({
            padding: theme.spacing(2),
            borderRadius: theme.shape.borderRadius,
            backgroundColor: '#131F2D',
            border: 'none', // No border for About section
          }),
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 6, // Updated to match the new shape.borderRadius
          backgroundColor: '#131F2D', // Dark background for cards
          minHeight: '300px', // Changed from 400px to 300px to make cards smaller
          border: '1px solid #3545D6',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(83, 99, 238, 0.3)', // Blue shadow for hover
            borderColor: '#C2F750', // Green border on hover
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderTopLeftRadius: 0,  // remove top left rounding for the navigation bar
          borderTopRightRadius: 0, // remove top right rounding
          backgroundColor: '#f2f2f2', // White navigation bar
          color: '#0E1A27', // Dark text for contrast on white background
          // Add shadow for better separation from content
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          '& .MuiToolbar-root': {
            // Additional styling for toolbar if needed
          },
          '& .MuiButton-root': {
            color: '#0E1A27', // Ensure buttons in navbar are dark for visibility
            '&:hover': {
              color: '#5363EE', // Primary color on hover
            },
          },
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'projectTitle' },
          style: {
            fontSize: '2.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: '#5363EE', // Primary color for project titles
          }
        }
      ]
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'inherit',
          padding: 8,
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '24px 0',
          backgroundColor: '#3545D6', // Blue divider as specified
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 16,
          paddingRight: 16,
          '@media (min-width: 600px)': {
            paddingLeft: 24,
            paddingRight: 24,
          },
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        container: {
          marginTop: -8,
          marginBottom: -8,
          width: 'calc(100% + 16px)',
          marginLeft: -8,
          marginRight: -8,
        },
        item: {
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 8,
          paddingRight: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(83, 99, 238, 0.2)', // Light blue background
          color: '#FFFFFF',
          border: '1px solid #3545D6',
          fontSize: '1rem', // Increased font size for chips
          fontWeight: 500,   // Medium weight for better readability
          height: 'auto',    // Allow height to adjust to content
          padding: '6px 0',  // Add vertical padding
        },
        label: {
          padding: '0 12px', // Add horizontal padding to the label
        },
        colorPrimary: {
          backgroundColor: 'rgba(83, 99, 238, 0.3)', // Light primary
          color: '#FFFFFF',
        },
        colorSecondary: {
          backgroundColor: 'rgba(194, 247, 80, 0.2)', // Light secondary
          color: '#C2F750',
        },
      },
    },
  },
  // Custom spacing for hero component
  heroBottomMargin: 15, // Increased from 6 to 12 (96px)
  heroLeftMargin: 8,   // Increased from 4 to 8 (64px)
});

export default theme;