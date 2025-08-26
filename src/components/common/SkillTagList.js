import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';

/**
 * SkillTagList Component
 * 
 * Standardized tag component for displaying skills/technologies
 * Uses Material Design 3 chip styling
 * Used across the portfolio for consistent styling
 */
const SkillTagList = ({ label, size = "medium", onClick, variant = "skill", sx = {}, ...props }) => {
  // Map component variant to M3 variant
  const variantMapping = {
    skill: "filled",     // M3 standard filled variant
    category: "outlined", // M3 outlined variant
    default: "filled"
  };
  
  const mappedVariant = variantMapping[variant] || "filled";
  
  return (
    <Chip
      label={label}
      size={size}
      onClick={onClick}
      variant={mappedVariant}
      sx={{
        mx: 0.5,
        my: 0.5,
        fontWeight: 500,
        '& .MuiChip-label': {
          padding: size === "small" ? '0 8px' : '0 12px',
        },
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
  variant: PropTypes.string,
};

export default SkillTagList;
