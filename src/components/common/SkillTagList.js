import React from 'react';
import PropTypes from 'prop-types';
import { Chip, useTheme } from '@mui/material';
import effects from '../../theme/effects';

/**
 * SkillTagList Component
 * 
 * Standardized tag component for displaying skills/technologies
 * Used across the portfolio for consistent styling
 * Now with glassmorphic styling
 */
const SkillTagList = ({ label, size = "medium", onClick, variant = "outlined", color = "default", sx = {}, ...props }) => {
  const theme = useTheme();
  
  // Use MUI default styling for primary color, glassmorphic for others
  const isPrimary = color === 'primary' && variant === 'filled';
  const isDark = theme.palette.mode === 'dark';
  
  const baseStyles = {
    mx: 0.5,
    my: 0.5,
    borderRadius: theme.shape?.radius?.pill || 999,
    fontWeight: 500,
    transition: theme.transitions.create(['background-color', 'transform'], {
      duration: theme.transitions.duration.shorter,
    }),
    '& .MuiChip-icon': {
      marginRight: '8px',
      marginLeft: '-4px',
    },
    '&:hover': {
      transform: onClick ? 'scale(1.05)' : 'none',
    },
  };
  
  // Glassmorphic styling for chips
  // In light theme, always apply glass (black glass with light copy)
  // In dark theme, apply glass to non-primary chips only
  const chipGlassTokens = isDark ? effects.chipGlass.dark : effects.chipGlass.light;
  const applyGlass = !isDark || !isPrimary;
  const glassmorphicStyles = applyGlass ? {
    background: chipGlassTokens.background,
    backdropFilter: `blur(${chipGlassTokens.blur})`,
    WebkitBackdropFilter: `blur(${chipGlassTokens.blur})`,
    border: `1px solid ${chipGlassTokens.border}`,
    color: `${chipGlassTokens.text} !important`,
    // Force all nested content to adopt the glass foreground
    '& *': {
      color: `${chipGlassTokens.text} !important`,
    },
    '&& .MuiChip-label': {
      color: `${chipGlassTokens.text} !important`,
    },
    '&& .MuiChip-icon': {
      color: `${chipGlassTokens.icon} !important`,
      // Ensure nested SvgIcon adopts the light color
      '& .MuiSvgIcon-root': {
        color: `${chipGlassTokens.icon} !important`,
        fill: `${chipGlassTokens.icon} !important`,
      },
      '& svg': {
        color: `${chipGlassTokens.icon} !important`,
        fill: `${chipGlassTokens.icon} !important`,
      },
      '& path, & circle, & rect, & polygon, & line, & polyline': {
        fill: `${chipGlassTokens.icon} !important`,
        stroke: `${chipGlassTokens.icon} !important`,
      },
    },
    '&& .MuiChip-deleteIcon': {
      color: `${chipGlassTokens.icon} !important`,
    },
    '&:hover': {
      background: chipGlassTokens.hoverBackground,
      backdropFilter: `blur(${chipGlassTokens.blurHover})`,
      WebkitBackdropFilter: `blur(${chipGlassTokens.blurHover})`,
    },
    '&:active': {
      background: chipGlassTokens.activeBackground,
    },
  } : {};
  
  return (
    <Chip
      label={label}
      size={size}
      onClick={onClick}
      variant={variant}
      color={color}
      sx={{
        ...baseStyles,
        ...glassmorphicStyles,
        ...sx
      }}
      {...props}
    />
  );
};

SkillTagList.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium"]),
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["filled", "outlined", "category", "skill"]),
  color: PropTypes.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]),
  sx: PropTypes.object,
};

export default SkillTagList;
