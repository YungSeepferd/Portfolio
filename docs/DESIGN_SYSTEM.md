# Design System Documentation

This document describes the design system used in the UX Portfolio project.

## Color Palette

### Primary Colors

- **Primary**: `#1976d2` - Main brand color used for primary actions and key UI elements
- **Primary Light**: `#42a5f5` - Lighter variant for hover states and accents
- **Primary Dark**: `#1565c0` - Darker variant for pressed states and emphasis

### Secondary Colors

- **Secondary**: `#dc004e` - Accent color for highlights and secondary actions
- **Secondary Light**: `#ff5983` - Lighter variant for subtle accents
- **Secondary Dark**: `#9a0036` - Darker variant for emphasis

### Status Colors

- **Success**: `#4caf50` - Success states, confirmations
- **Warning**: `#ff9800` - Warning states, cautions
- **Error**: `#f44336` - Error states, destructive actions
- **Info**: `#2196f3` - Information, neutral highlights

### Neutral Colors

- **Background**: `#fafafa` (light) / `#121212` (dark)
- **Surface**: `#ffffff` (light) / `#1e1e1e` (dark)
- **Text Primary**: `rgba(0, 0, 0, 0.87)` (light) / `rgba(255, 255, 255, 0.87)` (dark)
- **Text Secondary**: `rgba(0, 0, 0, 0.6)` (light) / `rgba(255, 255, 255, 0.6)` (dark)

## Typography

### Font Family

- **Primary**: 'Roboto', sans-serif
- **Monospace**: 'IBM Plex Mono', monospace (for code and technical content)

### Scale

- **H1**: 2.125rem (34px) - Page titles
- **H2**: 1.5rem (24px) - Section headers
- **H3**: 1.25rem (20px) - Subsection headers
- **H4**: 1.125rem (18px) - Component titles
- **H5**: 1rem (16px) - Card titles
- **H6**: 0.875rem (14px) - Small headers
- **Body1**: 1rem (16px) - Primary body text
- **Body2**: 0.875rem (14px) - Secondary body text
- **Caption**: 0.75rem (12px) - Captions, labels
- **Button**: 0.875rem (14px) - Button text

### Line Height

- **Headings**: 1.2
- **Body Text**: 1.6
- **UI Elements**: 1.4

## Spacing

Based on 8px grid system:

- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **xxl**: 48px

## Breakpoints

- **xs**: 0px (mobile)
- **sm**: 600px (small tablet)
- **md**: 900px (tablet)
- **lg**: 1200px (laptop)
- **xl**: 1536px (desktop)

## Component Guidelines

### Buttons

#### Primary Button
- Use for main actions (submit, save, confirm)
- High emphasis with filled background
- Should only have one primary button per section

#### Secondary Button
- Use for secondary actions (cancel, back, alternative actions)
- Medium emphasis with outlined style
- Can have multiple secondary buttons per section

#### Text Button
- Use for low-priority actions (links, navigation)
- Minimal emphasis with text-only style
- Suitable for inline actions

### Cards

- **Elevation**: 1-4 (subtle shadows for depth)
- **Border Radius**: 8px standard, 16px for media cards
- **Padding**: 16px standard, 24px for content-heavy cards

### Form Elements

#### Input Fields
- **Height**: 56px (standard Material-UI height)
- **Border Radius**: 4px
- **Focus States**: Primary color outline
- **Error States**: Error color with descriptive text

#### Labels
- Always provide clear, descriptive labels
- Use sentence case (capitalize first word only)
- Position above input fields

### Navigation

#### Header Navigation
- Fixed position during scroll
- Semi-transparent background with backdrop blur
- Smooth transitions for mobile menu

#### Section Navigation
- Smooth scroll behavior
- Visual indicators for active sections
- Keyboard accessible

## Accessibility Guidelines

### Color Contrast

All color combinations meet WCAG 2.1 AA standards:
- **Normal text**: 4.5:1 minimum contrast ratio
- **Large text**: 3:1 minimum contrast ratio
- **Interactive elements**: Clear focus indicators

### Keyboard Navigation

- **Tab order**: Logical and intuitive
- **Focus indicators**: Visible and high contrast
- **Skip links**: Available for screen readers

### Screen Readers

- **Alt text**: Descriptive for all images
- **ARIA labels**: Proper labeling for interactive elements
- **Semantic HTML**: Proper heading hierarchy and landmarks

## Animation Guidelines

### Timing

- **Fast transitions**: 150ms (hover states, simple state changes)
- **Standard transitions**: 300ms (page transitions, modals)
- **Slow transitions**: 500ms (complex animations, 3D transforms)

### Easing

- **ease-in-out**: Standard for most transitions
- **ease-out**: For enter animations
- **ease-in**: For exit animations

### Reduced Motion

All animations respect `prefers-reduced-motion` setting:
- Critical animations become instant
- Decorative animations are disabled
- Focus management is preserved

## 3D and Interactive Elements

### Three.js Integration

- **Performance**: Optimized for 60fps on modern devices
- **Fallbacks**: 2D alternatives for low-performance devices
- **Accessibility**: Respects motion preferences

### Sound Design

- **User Control**: Always provide mute/volume controls
- **Context**: Sounds enhance but never distract from content
- **Accessibility**: Visual alternatives for audio cues

## Implementation

### CSS-in-JS

Using Material-UI's styling system:

```typescript
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontWeight: 500,
}));
```

### Theme Usage

```typescript
import { useTheme } from '@mui/material/styles';

const Component = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
      }}
    >
      Content
    </Box>
  );
};
```

## Validation

### Design Reviews

- Color contrast checked with tools like WebAIM
- Typography tested across different devices
- Component spacing verified against 8px grid
- Accessibility tested with screen readers

### User Testing

- Navigation patterns validated with users
- Interactive elements tested for usability
- Performance benchmarked across devices
- Accessibility tested with assistive technologies
