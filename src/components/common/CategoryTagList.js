import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import SkillTag from './SkillTagList';

/**
 * TagList Component
 *
 * Displays a list of tags as clickable chips, styled for categories.
 *
 * @param {Object} props
 * @param {Array} props.tags - Array of tag strings to display
 * @param {Function} props.onTagClick - Optional callback when a tag is clicked
 * @param {Object} props.sx - Optional styles to override default styles
 */
function CategoryTagList({ tags, onTagClick, sx }) {
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
        mb: 4,
        ...sx
      }}
    >
      {tags && tags.map((tag) => (
        <SkillTag
          key={tag}
          label={tag}
          size="small"
          variant="outlined"
          sx={{ my: 0.5 }}
          onClick={onTagClick ? () => onTagClick(tag) : undefined}
        />
      ))}
    </Box>
  );
}

export default CategoryTagList;
