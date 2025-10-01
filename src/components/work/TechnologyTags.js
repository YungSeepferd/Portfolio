import React from 'react';
import SkillTag from '../common/SkillTagList';
import { Box, useTheme, useMediaQuery } from '@mui/material';
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
import { getSpacingPreset } from '../../theme/presets';
import modalMobileTokens from '../../theme/components/modalMobile';

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

// Normalizes a technology entry that can be a string or an object with { name }
const normalizeLabel = (tech) => (typeof tech === 'string' ? tech : tech?.name || '');

/**
 * TechnologyTags Component
 * Renders an array of technology strings as styled chips with consistent glassmorphic design.
 * Mobile: horizontal scroll, Desktop: wrap
 * @param {Array} technologies - Array of technology names
 * @param {string} variant - Style variant (default/hover/full)
 * @param {string} size - Chip size (small/medium)
 * @param {boolean} showHierarchy - Enable primary/secondary visual distinction (default: false)
 */
const TechnologyTags = ({ 
  technologies = [], 
  variant = 'default', 
  size = 'small', 
  showHierarchy = false,
  projectColor = 'primary',
  sx = {} 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const groupSpacing = getSpacingPreset('chipGroup');

  // Map size to valid values for SkillTagList
  const validSize = size === 'full' || size === 'hover' ? 'medium' : size;
  const shouldCompact = technologies.length >= (variant === 'hover' ? 4 : 6);
  const chipSize = shouldCompact ? 'small' : validSize;

  if (!technologies.length) return null;
  
  // Mobile: horizontal scroll, Desktop: wrap
  const mobileScrollStyles = isMobile ? {
    flexWrap: 'nowrap',
    overflowX: 'auto',
    overflowY: 'hidden',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE/Edge
    '&::-webkit-scrollbar': {
      display: 'none', // Chrome/Safari
    },
    pb: 1, // Space for scroll shadow
  } : {
    flexWrap: 'wrap',
  };
  
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        columnGap: modalMobileTokens.techChips.gap,
        rowGap: groupSpacing.rowGap,
        ...mobileScrollStyles,
        ...sx,
      }}
    >
      {technologies.map((tech, index) => {
        const label = normalizeLabel(tech);
        const isPrimary = showHierarchy && index === 0;
        
        return (
          <SkillTag
            key={label}
            label={label}
            icon={getTechIcon(label)}
            size={chipSize}
            color={isPrimary ? projectColor : 'default'}
            variant={isPrimary ? 'filled' : 'outlined'}
            sx={{ 
              ...theme.chip,
              fontSize: shouldCompact 
                ? { xs: '0.625rem', sm: '0.75rem', md: '0.8125rem' } 
                : modalMobileTokens.techChips.chip.fontSize,
              height: shouldCompact 
                ? { xs: 22, sm: 26, md: 28 } 
                : modalMobileTokens.techChips.chip.size,
              maxWidth: modalMobileTokens.techChips.chip.maxWidth,
              flexShrink: isMobile ? 0 : 1, // Prevent shrinking on mobile scroll
              // Primary chip gets slightly more emphasis
              fontWeight: isPrimary ? 600 : 400,
              '& .MuiChip-label': {
                px: shouldCompact 
                  ? { xs: 0.5, sm: 0.875, md: 1 } 
                  : { xs: 0.625, sm: 1, md: 1.25 },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              },
              '& .MuiChip-icon': {
                fontSize: modalMobileTokens.techChips.chip.iconSize,
                marginLeft: { xs: '4px', sm: '6px', md: '8px' },
                marginRight: { xs: '-2px', sm: '-3px', md: '-4px' },
              },
              mx: 0,
              my: 0,
            }}
          />
        );
      })}
    </Box>
  );
};

export default TechnologyTags;
