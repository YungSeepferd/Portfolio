# Button Patterns

## Button Variants

### Primary Buttons
- Used for primary calls-to-action
- High visibility, filled background
- Example: "Contact Me", "View Project"

```javascript
<Button 
  variant="contained" 
  color="primary"
  size="large"
/>
```

### Secondary Buttons
- Used for secondary actions
- Outlined style
- Example: "Learn More", "See Details"

```javascript
<Button 
  variant="outlined" 
  color="primary"
  size="medium"
/>
```

### Text Buttons
- Used for tertiary actions
- No background or border
- Example: "Show More", "Skip"

```javascript
<Button 
  variant="text" 
  color="primary"
  size="small"
/>
```

## Size Guidelines

### Large (`size="large"`)
- Height: 48px
- Padding: 16px 32px
- Font Size: 1rem (16px)
- Use for: Primary CTAs, hero section buttons

### Medium (`size="medium"`) - Default
- Height: 40px
- Padding: 12px 24px
- Font Size: 0.875rem (14px)
- Use for: Most buttons throughout the application

### Small (`size="small"`)
- Height: 32px
- Padding: 8px 16px
- Font Size: 0.875rem (14px)
- Use for: Compact UI areas, inline buttons

## Styling Standards

### Border Radius
- Default: theme.shape.borderRadius * 3 (12px)
- Small: theme.shape.borderRadius * 2 (8px)
- Pill: theme.shape.borderRadius * 6 (24px)

### Typography
- Font Weight: 500 (medium)
- Text Transform: none (sentence case)
- Letter Spacing: 0.2px

### States
- Hover: Slight elevation increase, background lightens
- Active/Pressed: Scale down slightly
- Disabled: 38% opacity, no hover effects
- Focus: Visible outline ring in primary color

### Animation
- Duration: theme.transitions.duration.shorter (200ms)
- Easing: theme.transitions.easing.easeInOut
- Properties: background-color, transform, box-shadow

## Usage Examples

### Primary CTA Button
```javascript
<Button
  variant="contained"
  color="primary"
  size="large"
  sx={{
    borderRadius: theme.shape.borderRadius * 3,
    textTransform: 'none',
    fontWeight: 500,
    px: { xs: 3, sm: 4 },
    py: { xs: 1.5, sm: 2 },
    transition: theme.transitions.create(
      ['background-color', 'transform', 'box-shadow'],
      {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeInOut
      }
    ),
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[4]
    },
    '&:active': {
      transform: 'translateY(0)'
    }
  }}
>
  Contact Me
</Button>
```

### Secondary Action Button
```javascript
<Button
  variant="outlined"
  color="primary"
  size="medium"
  sx={{
    borderRadius: theme.shape.borderRadius * 2,
    textTransform: 'none',
    fontWeight: 500,
    letterSpacing: 0.2,
    '&:hover': {
      backgroundColor: 'rgba(primary.main, 0.04)'
    }
  }}
>
  Learn More
</Button>
```

## Accessibility

- Ensure sufficient color contrast (4.5:1 for text)
- Minimum touch target size of 44x44px for mobile
- Clear hover and focus states
- Descriptive labels for screen readers
- Use proper HTML button elements

## Implementation Notes

1. Always use the MUI `Button` component
2. Prefer using theme variables over hardcoded values
3. Use consistent spacing from the theme system
4. Maintain consistent hover/active states
5. Follow accessibility guidelines