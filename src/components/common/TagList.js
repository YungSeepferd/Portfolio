import React from 'react';
import { Box, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * TagList Component
 *
 * Displays a list of tags as clickable chips.
 *
 * @param {Object} props
 * @param {Array} props.tags - Array of tag strings to display
 * @param {Function} props.onTagClick - Optional callback when a tag is clicked
 */
function TagList({ tags, onTagClick }) {
  const theme = useTheme();

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
      }}
    >
      {tags && tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          clickable={!!onTagClick}
          onClick={onTagClick ? () => onTagClick(tag) : undefined}
          color="primary"
          variant="outlined"
          sx={{
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 4px 8px rgba(0,0,0,0.4)'
                : '0 4px 8px rgba(0,0,0,0.1)',
            }
          }}
        />
      ))}
    </Box>
  );
}

export default TagList;
