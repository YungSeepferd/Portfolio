import React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * SkillTag Component
 *
 * Standardized tag component for displaying skills/technologies.
 */
export const SkillTag = ({ label, size = "medium", onClick, ...props }) => {
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
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
        border: `1px solid ${theme.palette.primary.main}`,
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
  sx: PropTypes.object,
};


/**
 * TagList Component
 *
 * Displays a list of tags using the SkillTag component.
 */
export const TagList = ({ tags, onTagClick, tagComponent: TagComponent = SkillTag, ...props }) => {
  const theme = useTheme();

  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        mb: 2, // Adjusted margin
        ...props.sx
      }}
      {...props}
    >
      {tags.map((tag) => (
        <TagComponent
          key={tag}
          label={tag}
          onClick={onTagClick ? () => onTagClick(tag) : undefined}
          // Pass down relevant props if needed, e.g., size
          size="small" // Example: default to small for lists
          sx={{
             // Add hover effect directly if needed, or rely on SkillTag's hover
             transition: 'transform 0.2s ease-in-out',
             '&:hover': {
               transform: 'translateY(-2px)',
             }
          }}
        />
      ))}
    </Box>
  );
};

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTagClick: PropTypes.func,
  tagComponent: PropTypes.elementType,
  sx: PropTypes.object,
};
