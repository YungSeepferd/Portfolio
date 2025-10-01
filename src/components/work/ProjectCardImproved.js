import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardActionArea, CardContent, Typography, Box, Stack, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import ContentAwareImage from '../common/ContentAwareImage';
import ProjectCardPreview from './ProjectCardPreview';
import CategoryTagList from '../common/CategoryTagList';
import projectUtils from '../../utils/projectUtils';
import VideoPlayer from '../common/VideoPlayer';
import { getTypographyPreset } from '../../theme/presets';
import themeSpacing from '../../theme/spacing';

/**
 * Improved ProjectCard with memoization and consistent theme usage
 */
const ProjectCardImproved = React.memo(({ project, onClick }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // Memoized handlers
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleClick = useCallback(() => onClick(project), [onClick, project]);

  // Memoized project data
  const projectData = useMemo(() => {
    if (!project) return null;
    
    const { 
      id,
      title, 
      categories = [], 
      technologies = [], 
      links = [],
      cardVariant = 'default'
    } = project;

    const linksArray = Array.isArray(links) ? links : 
                      (links && typeof links === 'object' ? Object.values(links) : []);
    
    // Extract media with proper fallback logic
    let primaryMedia = null;
    
    // If project.media exists and has the expected structure
    if (project.media) {
      if (typeof project.media === 'object' && project.media.type && project.media.src) {
        // Already in correct format
        primaryMedia = project.media;
      } else if (typeof project.media === 'string') {
        // String path - assume it's an image
        primaryMedia = { type: 'image', src: project.media };
      }
    }
    
    // Fallback to projectUtils if no valid media found
    if (!primaryMedia) {
      const fallbackSrc = projectUtils.getProjectPrimaryMedia(project);
      primaryMedia = { type: 'image', src: fallbackSrc };
    }
    
    return {
      id,
      title,
      categories,
      technologies,
      linksArray,
      cardVariant,
      primaryMedia
    };
  }, [project]);

  // Memoized styles using theme consistently
  const cardStyles = useMemo(() => ({
    cursor: 'pointer',
    position: 'relative',
    width: themeSpacing.card.project.width,
    mx: 'auto',
    height: '100%', // Consistent height
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: 0,
    boxShadow: theme.shadows[2],
    backgroundColor: 'background.default',
    transition: theme.transitions.create(['transform', 'box-shadow'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
    '&:hover': {
      transform: { xs: 'translateY(-2px)', sm: 'translateY(-3px)', md: 'translateY(-4px)' },
      boxShadow: theme.shadows[8],
    },
    // Accent border moved to left side with 40% opacity
    ...(projectData?.cardVariant && projectData.cardVariant !== 'default' && {
      borderLeft: `3px solid ${theme.palette[projectData.cardVariant]?.main ? 
        `${theme.palette[projectData.cardVariant].main}66` : 
        `${theme.palette.primary.main}66`}`
    })
  }), [theme, projectData?.cardVariant]);

  const imageAreaStyles = useMemo(() => ({
    position: 'relative',
    width: '100%',
    height: 0,
    paddingBottom: themeSpacing.card.project.imageAspectRatio, // 16:9 aspect ratio
    flexShrink: 0, // Prevent image from shrinking
    // Dark overlay on hover for better button contrast
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.standard,
      }),
      zIndex: 1,
      pointerEvents: 'none',
    },
    '&:hover::before': {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
  }), [theme]);

  const imageContainerStyles = useMemo(() => ({
    width: '100%',
    height: '100%',
    backgroundColor: 'background.default',
    borderBottom: 1,
    borderColor: 'divider',
    borderRadius: 0,
    overflow: 'hidden',
    padding: 0,
    // Removed flex centering to allow image to fill completely
  }), []);

  const contentSpacing = useMemo(() => ({
    px: themeSpacing.card.project.paddingX,
    py: themeSpacing.card.project.paddingY,
  }), []);
  const titlePreset = useMemo(() => getTypographyPreset(theme, 'cardTitle'), [theme]);
  const isTouchLayout = useMediaQuery(theme.breakpoints.down('md'));

  if (!projectData) return null;

  const { id, title, categories, technologies, linksArray, primaryMedia } = projectData;
  const cardTestId = id ? `project-card-${id}` : 'project-card';

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      style={{ height: '100%' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card 
        variant="outlined"
        elevation={0}
        sx={cardStyles}
        data-testid={cardTestId}
      >
        <CardActionArea
          onClick={handleClick}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            height: '100%',
            padding: 0,
            '& .MuiCardActionArea-focusHighlight': { opacity: 0.08 },
          }}
        >
          <Box sx={imageAreaStyles}>
            <Box 
              sx={{
                ...imageContainerStyles,
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            >
              {primaryMedia?.type === 'image' && primaryMedia.src && (
                <ContentAwareImage
                  src={primaryMedia.src}
                  alt={`${title} preview`}
                  containerHeight="100%"
                  containerWidth="100%"
                  objectFit="cover"
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 0,
                    objectPosition: 'center',
                  }}
                  onError={(e) => {
                    if (process.env.NODE_ENV === 'development') {
                      console.error(`Failed to load image for ${title}:`, primaryMedia.src, e);
                    }
                  }}
                  fallbackSrc="/assets/images/placeholders/project.jpg"
                />
              )}
              {primaryMedia?.type === 'video' && primaryMedia.src && (
                <VideoPlayer
                  src={primaryMedia.src}
                  containerHeight="100%"
                  containerWidth="100%"
                  autoplay={true}
                  muted={true}
                  controls={false}
                  loop={true}
                  poster={primaryMedia.poster}
                  onError={(e) => {
                    if (process.env.NODE_ENV === 'development') {
                      console.error(`Failed to load video for ${title}:`, primaryMedia.src, e);
                    }
                  }}
                />
              )}
              {(!primaryMedia || (!primaryMedia.src)) && (
                <ContentAwareImage
                  src="/assets/images/placeholders/project.jpg"
                  alt={`${title} preview`}
                  containerHeight="100%"
                  containerWidth="100%"
                  objectFit="cover"
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 0,
                    objectPosition: 'center',
                  }}
                />
              )}
            </Box>
          <ProjectCardPreview
            isVisible={isHovered || isTouchLayout}
            technologies={technologies}
            links={linksArray}
            size={isTouchLayout ? 'comfortable' : 'compact'}
            projectColor={projectData?.cardVariant || 'primary'}
          />
          </Box>

          <CardContent sx={{ width: '100%', px: contentSpacing.px, py: contentSpacing.py }}>
            <Stack spacing={themeSpacing.card.project.contentGap} alignItems="flex-start">
              <Typography
                variant={titlePreset.variant}
                component={titlePreset.component}
                sx={{ 
                  ...titlePreset.sx, 
                  color: 'text.primary',
                  py: themeSpacing.card.project.titlePaddingY
                }}
              >
                {title}
              </Typography>
              {categories && categories.length > 0 && (
                <CategoryTagList 
                  tags={categories} 
                  previewCount={isTouchLayout ? 8 : 6}
                  accentColor={theme.palette[projectData?.cardVariant]?.main || theme.palette.primary.main}
                  sx={{ pb: { xs: 1, sm: 1.5, md: 2 } }}
                />
              )}
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
});

ProjectCardImproved.displayName = 'ProjectCardImproved';

export default ProjectCardImproved;
