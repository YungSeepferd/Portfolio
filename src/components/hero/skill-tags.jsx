import React from 'react';
import SkillTag from '../common/SkillTagList';
import { Box, Stack } from '@mui/material';

/**
 * SkillTags Component
 * Renders an array of skill strings as styled chips.
 */
const SkillTags = ({ skills = [], variant = 'skill', size = 'responsive', sx = {} }) => {
  if (!skills.length) return null;
  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {skills.map((skill) => (
          <SkillTag key={skill} label={skill} size={size} variant={variant} />
        ))}
      </Stack>
    </Box>
  );
};

export default SkillTags;
