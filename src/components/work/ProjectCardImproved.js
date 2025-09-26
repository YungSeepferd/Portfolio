import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardActionArea, CardContent, Typography, Box, Stack, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import ContentAwareImage from '../common/ContentAwareImage';
import ProjectCardPreview from './ProjectCardPreview';
import CategoryTagList from '../common/CategoryTagList';
import projectUtils from '../../utils/projectUtils';
import VideoPlayer from '../common/VideoPlayer';
import { getSpacingPreset, getTypographyPreset } from '../../theme/presets';

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
    
    const primaryMedia = project.media || projectUtils.getProjectPrimaryMedia(project);
    
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
    width: '95%',
    mx: 'auto',
    aspectRatio: { xs: 'auto', lg: '4 / 3' },
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: 4, // Reduced from theme.shape.borderRadius for less rounded corners
    boxShadow: theme.shadows[2],
    backgroundColor: 'background.default',
    transition: theme.transitions.create(['transform', 'box-shadow', 'border-color'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows[8],
      borderColor: 'primary.main',
    },
    ...(projectData?.cardVariant && projectData.cardVariant !== 'default' && {
      borderTop: `4px solid ${theme.palette[projectData.cardVariant]?.main || theme.palette.primary.main}`
    })
  }), [theme, projectData?.cardVariant]);

  const imageAreaStyles = useMemo(() => ({
    position: 'relative',
    width: '100%',
    flex: { xs: '0 0 auto', md: '0 0 52%' },
    aspectRatio: { xs: '4 / 3', sm: '3 / 2', lg: 'auto' },
    minHeight: { lg: 0 },
  }), []);

  const imageContainerStyles = useMemo(() => ({
    width: '100%',
    height: '100%',
    backgroundColor: 'background.default',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: 1,
    borderColor: 'divider',
    borderRadius: `4px 4px 0 0`, // Reduced from theme.shape.borderRadius for less rounded corners
    overflow: 'hidden',
  }), []);

  const contentSpacing = useMemo(() => getSpacingPreset('cardContent'), []);
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
            '& .MuiCardActionArea-focusHighlight': { opacity: 0.08 },
          }}
        >
          <Box sx={imageAreaStyles}>
            <Box sx={imageContainerStyles}>
              {primaryMedia?.type === 'image' && (
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
                    console.error(`Failed to load image for ${title}: ${primaryMedia.src}`, e);
                    e.target.src = '/assets/images/placeholders/project.jpg';
                  }}
                />
              )}
              {primaryMedia?.type === 'video' && (
                <VideoPlayer
                  src={primaryMedia.src}
                  containerHeight="100%"
                  containerWidth="100%"
                  autoplay={true}
                  muted={true}
                  controls={true}
                  poster={primaryMedia.poster || '/assets/images/placeholders/project.jpg'}
                  onError={(e) => {
                    console.error(`Failed to load video for ${title}: ${primaryMedia.src}`, e);
                  }}
                />
              )}
              {!primaryMedia && (
                <ContentAwareImage
                  src={'/assets/images/placeholders/project.jpg'}
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
          />
          </Box>

          <CardContent sx={{ width: '100%', px: contentSpacing.px, py: contentSpacing.py }}>
            <Stack spacing={contentSpacing.rowGap} alignItems="flex-start">
              <Typography
                variant={titlePreset.variant}
                component={titlePreset.component}
                sx={{ ...titlePreset.sx, color: 'text.primary' }}
              >
                {title}
              </Typography>
              {categories && categories.length > 0 && (
                <CategoryTagList tags={categories} previewCount={isTouchLayout ? 8 : 6} />
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
