import React from 'react';
import PropTypes from 'prop-types';
import { Chip, useTheme, useMediaQuery } from '@mui/material';

/**
 * SkillTagList Component
 * 
 * Standardized tag component for displaying skills/technologies
 * Used across the portfolio for consistent styling
 */
const SkillTagList = ({ label, size = "medium", onClick, variant = "skill", sx = {}, ...props }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // Responsive size: use 'small' on mobile, 'medium' otherwise
  const chipSize = typeof size === 'object'
    ? (isMobile ? size.xs || 'small' : size.md || 'medium')
    : (isMobile ? (size === 'responsive' ? 'small' : size) : (size === 'responsive' ? 'medium' : size));

  // Custom style for extra small tags on mobile
  const extraSmallMobileSx = isMobile ? {
    fontSize: '0.65rem',
    height: 22,
    minHeight: 22,
    px: 0.75,
    py: 0,
    borderRadius: 1.5,
    '.MuiChip-label': {
      px: 0.75,
      py: 0,
      fontSize: '0.65rem',
      lineHeight: 1.1,
    },
  } : {};

  return (
    <Chip
      label={label}
      size={chipSize}
      onClick={onClick}
      variant={variant}
      sx={{
        mx: 0.5,
        my: 0.5,
        ...extraSmallMobileSx,
        ...sx
      }}
      {...props}
    />
  );
};

SkillTagList.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(["small", "medium", "responsive"]),
    PropTypes.object // { xs: 'small', md: 'medium' }
  ]),
  onClick: PropTypes.func,
  variant: PropTypes.string,
};

export default SkillTagList;
