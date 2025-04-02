import React from 'react';
import PropTypes from 'prop-types';
import { Chip, useTheme } from '@mui/material';

/**
 * SkillTag Component
 * 
 * Standardized tag component for displaying skills/technologies
 * Used across the portfolio for consistent styling
 */
const SkillTag = ({ label, size = "medium", onClick, ...props }) => {
  const theme = useTheme();
  
  // Size-specific styling
  const sizeStyles = size === "small" ? {
    height: theme.spacing(3),
    fontSize: theme.typography.pxToRem(12),
    borderRadius: theme.shape.borderRadius,
  } : {
    height: theme.spacing(3.5),
    fontSize: theme.typography.pxToRem(14),
    borderRadius: theme.shape.borderRadius,
  };
  
  return (
    <Chip
      label={label}
      size={size}
      onClick={onClick}
      sx={{
        backgroundColor: theme.palette.primary.light, // Use theme reference
        color: theme.palette.common.white, // Use theme reference
        border: `1px solid ${theme.palette.primary.main}`, // Use theme reference
        fontWeight: theme.typography.fontWeightMedium,
        whiteSpace: 'nowrap',
        '&:hover': {
          borderColor: theme.palette.secondary.main,
          backgroundColor: theme.palette.primary.dark,
        },
        mx: theme.spacing(0.5),
        my: theme.spacing(0.5),
        ...sizeStyles,
        ...props.sx
      }}
      {...props}
    />
  );
};

SkillTag.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium"]),
  onClick: PropTypes.func,
};

export default SkillTag;
