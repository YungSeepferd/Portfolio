import React from 'react';
import SkillTag from '../common/SkillTagList';
import { Box, Stack, useTheme } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import FigmaIcon from '@mui/icons-material/DesignServices';
import BrushIcon from '@mui/icons-material/Brush';
import AdbIcon from '@mui/icons-material/Adb';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import HtmlIcon from '@mui/icons-material/Html';
import CssIcon from '@mui/icons-material/Css';
import JavascriptIcon from '@mui/icons-material/Javascript';
import StorageIcon from '@mui/icons-material/Storage';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import AdobeIcon from '@mui/icons-material/PhotoCamera';

// Map technology names to icons
const techIconMap = {
  'figma': <FigmaIcon fontSize="small" />,
  'github': <GitHubIcon fontSize="small" />,
  'adobe illustrator': <BrushIcon fontSize="small" />,
  'adobe xd': <AdobeIcon fontSize="small" />,
  'adobe premiere pro': <AdobeIcon fontSize="small" />,
  'adobe': <AdobeIcon fontSize="small" />,
  'sketch': <BrushIcon fontSize="small" />,
  'javascript': <JavascriptIcon fontSize="small" />,
  'html': <HtmlIcon fontSize="small" />,
  'css': <CssIcon fontSize="small" />,
  'unity': <IntegrationInstructionsIcon fontSize="small" />,
  'c': <CodeIcon fontSize="small" />,
  'c#': <CodeIcon fontSize="small" />,
  'c++': <CodeIcon fontSize="small" />,
  'arduino': <AdbIcon fontSize="small" />,
  'user testing': <StorageIcon fontSize="small" />,
  'prototyping': <WebAssetIcon fontSize="small" />,
};

const getTechIcon = (name) => {
  if (!name) return null;
  const key = name.toLowerCase();
  return techIconMap[key] || <CodeIcon fontSize="small" />;
};

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
      <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={{ xs: 1.5, sm: 2 }}>
        {technologies.map((tech) => {
          const label = typeof tech === 'string' ? tech : tech?.name || '';
          return (
            <SkillTag
              key={label}
              label={label}
              icon={getTechIcon(label)}
              size="responsive"
              sx={theme.chip}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default TechnologyTags;
