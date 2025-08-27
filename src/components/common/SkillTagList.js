import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';

/**
 * SkillTagList Component
 * 
 * Standardized tag component for displaying skills/technologies
 * Used across the portfolio for consistent styling
 */
const SkillTagList = ({ label, size = "medium", onClick, variant = "outlined", color = "default", sx = {}, ...props }) => {
  return (
    <Chip
      label={label}
      size={size}
      onClick={onClick}
      variant={variant}
      color={color}
      sx={{
        mx: 0.5,
        my: 0.5,
        borderRadius: 2,
        fontWeight: 500,
        '&:hover': onClick ? {
          backgroundColor: 'action.hover',
        } : undefined,
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
  variant: PropTypes.oneOf(["filled", "outlined"]),
  color: PropTypes.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]),
  sx: PropTypes.object,
};

export default SkillTagList;
