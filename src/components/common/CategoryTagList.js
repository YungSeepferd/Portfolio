import React, { useMemo, useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { getSpacingPreset } from '../../theme/presets';

/**
 * TagList Component
 *
 * Displays a list of tags as clickable chips, styled for categories.
 *
 * @param {Object} props
 * @param {Array} props.tags - Array of tag strings to display
 * @param {Function} props.onTagClick - Optional callback when a tag is clicked
 * @param {number} [props.previewCount=6] - Number of tags shown before expanding
 * @param {Object} props.sx - Optional styles to override default styles
 */
function CategoryTagList({ tags = [], onTagClick, previewCount = 6, textColor, sx }) {
  const theme = useTheme();
  const groupSpacing = getSpacingPreset('chipGroup');
  const [isExpanded, setIsExpanded] = useState(false);
  const validTags = useMemo(() => (Array.isArray(tags) ? tags.filter(Boolean) : []), [tags]);
  const displayTags = useMemo(() => (
    isExpanded ? validTags : validTags.slice(0, previewCount)
  ), [isExpanded, validTags, previewCount]);
  const hiddenCount = Math.max(validTags.length - displayTags.length, 0);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: groupSpacing.rowGap,
        mb: 4,
        ...sx
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, minmax(0, 1fr))',
            sm: 'repeat(2, minmax(0, 1fr))',
          },
          columnGap: groupSpacing.columnGap,
          rowGap: groupSpacing.rowGap,
        }}
      >
        {displayTags.map((tag) => (
          <Box
            key={tag}
            role={onTagClick ? 'button' : undefined}
            tabIndex={onTagClick ? 0 : undefined}
            onClick={onTagClick ? () => onTagClick(tag) : undefined}
            onKeyDown={onTagClick ? (e) => { if (e.key === 'Enter') onTagClick(tag); } : undefined}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing(1.5),
              cursor: onTagClick ? 'pointer' : 'default',
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                width: theme.spacing(0.5),
                height: theme.spacing(2.5),
                borderRadius: theme.shape.borderRadius,
                backgroundColor: theme.palette.primary.main,
                flexShrink: 0,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 400,
                letterSpacing: '0.01em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                color: textColor || (theme.palette.mode === 'light' 
                  ? 'rgba(8, 88, 104, 0.85)' // Dark grey/teal for light theme
                  : 'rgba(255, 255, 255, 0.7)'), // Light grey for dark theme
              }}
            >
              {tag}
            </Typography>
          </Box>
        ))}
      </Box>
      {hiddenCount > 0 && (
        <Button
          size="small"
          color="primary"
          variant="text"
          onClick={() => setIsExpanded(true)}
          sx={{ alignSelf: 'flex-start', ml: theme.spacing(1.5), px: 0, textTransform: 'none' }}
        >
          Show {hiddenCount} more
        </Button>
      )}
      {isExpanded && hiddenCount === 0 && validTags.length > previewCount && (
        <Button
          size="small"
          color="primary"
          variant="text"
          onClick={() => setIsExpanded(false)}
          sx={{ alignSelf: 'flex-start', ml: theme.spacing(1.5), px: 0, textTransform: 'none' }}
        >
          Show less
        </Button>
      )}
    </Box>
  );
}

export default CategoryTagList;
