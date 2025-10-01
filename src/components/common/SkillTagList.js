import React from 'react';
import PropTypes from 'prop-types';
import { Chip, useTheme } from '@mui/material';

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
  
  // Glassmorphic styling for non-primary chips
  const glassmorphicStyles = !isPrimary ? {
    background: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.15)'
      : 'rgba(5, 38, 45, 0.20)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: `1px solid ${theme.palette.divider}`,
    color: theme.palette.common.white,
    '& .MuiChip-label': {
      color: theme.palette.common.white,
    },
    '& .MuiChip-icon': {
      color: theme.palette.common.white,
      fill: theme.palette.common.white,
    },
    '& .MuiChip-deleteIcon': {
      color: theme.palette.common.white,
    },
    '&:hover': {
      background: theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.25)'
        : 'rgba(5, 38, 45, 0.30)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
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
