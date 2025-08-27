# Theme System Documentation

## Overview

The portfolio uses a modular theme system built on Material-UI's theming capabilities, extended with custom design tokens and component overrides.

## Theme Architecture

### Modular Structure
```
src/theme/
├── index.js                 # Theme creation and export
├── palette/                 # Color definitions
│   ├── light.js            # Light mode colors
│   └── dark.js             # Dark mode colors
├── typography.js           # Font and text styles
├── spacing.js              # Spacing scale (8px grid)
├── breakpoints.js          # Responsive breakpoints
├── animations.js           # Animation tokens
├── shadows.js              # Shadow definitions
├── shape.js                # Border radius tokens
├── components.js           # Component overrides
└── design/
    └── tokens.js           # Design token aggregation
```

## Color System

### Palette Structure
- **Primary**: Main brand colors
- **Secondary**: Accent colors
- **Background**: Surface colors for different elevations
- **Text**: Text colors with proper contrast ratios
- **Custom**: Portfolio-specific semantic colors

### Theme Mode Support
```javascript
// Light mode palette
export const lightColors = {
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0'
  },
  background: {
    default: '#ffffff',
    paper: '#f5f5f5'
  }
  // ... more colors
};

// Dark mode palette
export const darkColors = {
  primary: {
    main: '#90caf9',
    light: '#e3f2fd',
    dark: '#42a5f5'
  },
  background: {
    default: '#121212',
    paper: '#1e1e1e'
  }
  // ... more colors
};
```

## Typography System

### Font Families
- **Headings**: 'Montserrat', sans-serif
- **Body**: 'Roboto', 'Helvetica', 'Arial', sans-serif

### Type Scale
```javascript
const typography = {
  h1: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700,
    fontSize: '3rem',
    lineHeight: 1.2,
    letterSpacing: '-0.02em'
  },
  body1: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1rem',
    lineHeight: 1.5
  }
  // ... additional variants
};
```

## Spacing System

### 8px Grid System
```javascript
const spacing = (factor) => `${8 * factor}px`;

// Usage examples:
// spacing(1) = 8px
// spacing(2) = 16px
// spacing(3) = 24px
```

### Common Spacing Values
- **xs**: 4px (0.5 units)
- **sm**: 8px (1 unit)
- **md**: 16px (2 units)
- **lg**: 24px (3 units)
- **xl**: 32px (4 units)

## Breakpoints

### Responsive Design Points
```javascript
const breakpoints = {
  xs: 0,      // Mobile
  sm: 600,    // Tablet
  md: 900,    // Desktop
  lg: 1200,   // Large desktop
  xl: 1536    // Extra large
};
```

## Animation System

### Duration Tokens
```javascript
const animations = {
  durations: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195
  }
};
```

### Easing Functions
```javascript
const easings = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
};
```

## Custom Theme Extensions

### Portfolio-Specific Properties
```javascript
const customExtensions = {
  customSections: {
    hero: {
      minHeight: '100vh',
      background: 'linear-gradient(...)'
    },
    work: {
      cardSpacing: 3,
      gridColumns: { xs: 1, sm: 2, md: 3 }
    }
  },
  customComponents: {
    projectCard: {
      borderRadius: 2,
      transition: 'all 0.3s ease'
    }
  }
};
```

## Theme Context Integration

### ThemeProvider Setup
```javascript
import { ThemeProvider } from '@mui/material/styles';
import { useThemeMode } from './context/ThemeContext';

function App() {
  const { theme } = useThemeMode();
  
  return (
    <ThemeProvider theme={theme}>
      {/* App content */}
    </ThemeProvider>
  );
}
```

### Theme Usage in Components
```javascript
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <Box sx={{
      bgcolor: 'background.paper',
      color: 'text.primary',
      p: theme.spacing(3),
      borderRadius: theme.shape.borderRadius
    }}>
      Content
    </Box>
  );
}
```

## Development Tools

### Theme Debugger
Access theme values in development:
```javascript
// Available in development mode
import ThemeDebugger from './components/dev/ThemeDebugger';

// Shows live theme inspection
{process.env.NODE_ENV === 'development' && <ThemeDebugger />}
```

### Theme Utilities
```javascript
import { useThemeUtils } from './hooks/useThemeUtils';

const { 
  getContrastText, 
  alpha, 
  darken, 
  lighten 
} = useThemeUtils();
```

## Best Practices

### Theme Usage Guidelines
1. Always use theme values instead of hardcoded styles
2. Use semantic color names (primary, secondary) over specific colors
3. Leverage the spacing function for consistent layouts
4. Use breakpoint helpers for responsive design
5. Access custom extensions through theme object

### Performance Considerations
- Theme objects are memoized to prevent unnecessary re-renders
- Custom extensions are computed once during theme creation
- Color calculations are cached for performance
