import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ContentAwareImage from '../common/ContentAwareImage';
import ProjectCardPreview from './ProjectCardPreview';
import CategoryTagList from '../common/CategoryTagList';
import projectUtils from '../../utils/projectUtils';
import VideoPlayer from '../common/VideoPlayer';

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
      title, 
      description, 
      categories = [], 
      technologies = [], 
      links = [],
      cardVariant = 'default'
    } = project;

    const linksArray = Array.isArray(links) ? links : 
                      (links && typeof links === 'object' ? Object.values(links) : []);
    
    const primaryMedia = project.media || projectUtils.getProjectPrimaryMedia(project);
    
    return {
      title,
      description,
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
    width: '100%',
    aspectRatio: '4 / 3', // Changed from 1/1 to 4/3 for smaller height
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
      borderColor: 'secondary.main',
    },
    ...(projectData?.cardVariant && projectData.cardVariant !== 'default' && {
      borderTop: `4px solid ${theme.palette[projectData.cardVariant]?.main || theme.palette.primary.main}`
    })
  }), [theme, projectData?.cardVariant]);

  const imageAreaStyles = useMemo(() => ({
    position: 'relative',
    width: '100%',
    flex: '0 0 60%',
    minHeight: 0,
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

  const contentStyles = useMemo(() => ({
    flex: '1 1 40%',
    display: 'flex',
    flexDirection: 'column',
    p: theme.spacing(1.5, 2),
    minHeight: 0,
    backgroundColor: 'background.paper',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    '&:last-child': {
      pb: theme.spacing(1.5, 2),
    },
  }), [theme]);

  if (!projectData) return null;

  const { title, description, categories, technologies, linksArray, primaryMedia } = projectData;

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
        onClick={handleClick} 
        variant="outlined"
        elevation={0}
        sx={cardStyles}
      >
        {/* Image Area with Overlay */}
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
                  objectPosition: 'center' 
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
                  objectPosition: 'center' 
                }}
              />
            )}
          </Box>
          <ProjectCardPreview
            isVisible={isHovered}
            technologies={technologies}
            links={linksArray}
          />
        </Box>

        {/* Content */}
        <CardContent sx={contentStyles}>
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{ 
              fontWeight: theme.typography.fontWeightSemiBold,
              color: 'text.primary', 
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.3,
              mb: theme.spacing(1),
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ 
              mb: theme.spacing(1),
              flexGrow: 1,
              display: '-webkit-box', 
              WebkitLineClamp: 3, 
              WebkitBoxOrient: 'vertical', 
              overflow: 'hidden', 
              fontSize: { xs: '0.875rem', md: '0.9375rem' },
              lineHeight: 1.5,
            }}
          >
            {description}
          </Typography>
          {categories && categories.length > 0 && (
            <Box sx={{ mt: 'auto', pt: theme.spacing(1) }}>
              <CategoryTagList tags={categories} />
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
});

ProjectCardImproved.displayName = 'ProjectCardImproved';

export default ProjectCardImproved;
