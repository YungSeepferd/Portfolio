import React from 'react';
import SkillTag from '../common/SkillTagList';
import { Box, Stack, useTheme } from '@mui/material';

/**
 * TechnologyTags Component
 * Renders an array of technology strings as styled chips.
 * @param {Array} technologies - Array of technology names
 * @param {string} variant - Style variant (default/hover/full)
 * @param {string} size - Chip size (small/medium)
 */
const TechnologyTags = ({ technologies = [], variant = 'default', size = 'small', sx = {} }) => {
  const theme = useTheme();
  if (!technologies.length) return null;
  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {technologies.map((tech) => (
          <SkillTag key={tech} label={tech} size={size} sx={theme.chip} />
        ))}
      </Stack>
    </Box>
  );
};

export default TechnologyTags;
