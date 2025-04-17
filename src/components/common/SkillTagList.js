import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';

/**
 * SkillTagList Component
 * 
 * Standardized tag component for displaying skills/technologies
 * Used across the portfolio for consistent styling
 */
const SkillTagList = ({ label, size = "medium", onClick, variant = "skill", sx = {}, ...props }) => {
  return (
    <Chip
      label={label}
      size={size}
      onClick={onClick}
      variant={variant}
      sx={{
        mx: 0.5,
        my: 0.5,
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
