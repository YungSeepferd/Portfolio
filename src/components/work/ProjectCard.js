import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, Typography, Box, Stack, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import ContentAwareImage from '../common/ContentAwareImage';
import ProjectCardPreview from './ProjectCardPreview';
import CategoryTagList from '../common/CategoryTagList';
import projectUtils from '../../utils/projectUtils';
import VideoPlayer from '../common/VideoPlayer';
import { getSpacingPreset, getTypographyPreset } from '../../theme/presets';

/**
 * ProjectCard Component
 *
 * Displays a preview card for a project in the main grid.
 * Shows TechBar and Links on hover via ProjectCardPreview.
 */
const ProjectCard = ({ project, onClick }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const cardRadius = theme.shape.cardRadius || theme.shape.borderRadius || 8;
  const cardSpacing = getSpacingPreset('cardContent');
  const cardTitlePreset = getTypographyPreset(theme, 'cardTitle');
  const isTouchLayout = useMediaQuery(theme.breakpoints.down('md'));

  if (!project) return null;

  const { 
    title, 
    categories = [], 
    technologies = [], 
    links = [],
    cardVariant = 'default'
  } = project;

  // Handle links as either array or object for backward compatibility
  const linksArray = Array.isArray(links) ? links : 
                    (links && typeof links === 'object' ? Object.values(links) : []);

  // Use robust utility for card image
  // Get the full media object (type + src)
  const primaryMedia = project.media || projectUtils.getProjectPrimaryMedia(project);
  
  // Animation for the card itself
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      style={{ height: '100%' }} // Ensure motion div takes full height
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        sx={{
          cursor: 'pointer',
          position: 'relative',
          width: '100%',
          aspectRatio: { xs: 'auto', lg: '4 / 2' },
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: cardRadius,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: cardRadius,
          borderBottomRightRadius: cardRadius,
          boxShadow: theme.shadows[2],
          backgroundColor: theme.palette.background.default,
          transition: theme.transitions.create(['transform', 'box-shadow'], {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut,
          }),
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 8px 20px 0 ${theme.palette.primary.main}33`,
          },
          ...(cardVariant && cardVariant !== 'default' && {
            borderTop: `2px solid ${theme.palette[cardVariant]?.main || 'primary.main'}`
          })
        }}
      >
        <CardActionArea
          onClick={() => onClick(project)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            height: '100%',
            padding: 0,
            '& .MuiCardActionArea-focusHighlight': { opacity: 0.08 },
          }}
        >
          {/* Image Area with Overlay */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              flex: { xs: '0 0 auto', md: '0 0 52%' },
              aspectRatio: { xs: '4 / 3', sm: '3 / 2', lg: 'auto' },
              minHeight: { lg: 0 },
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: { xs: '100%', md: '100%' },
                backgroundColor: 'background.default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: 1,
                borderColor: 'divider',
                borderRadius: 0,
                overflow: 'hidden',
              }}
            >
              {primaryMedia?.type === 'image' && (
                <ContentAwareImage
                  src={primaryMedia.src}
                  alt={`${title} preview`}
                  containerHeight="100%"
                  containerWidth="100%"
                  objectFit="cover"
                  sx={{ width: '100%', height: '100%', borderRadius: 0, objectPosition: 'center' }}
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
                  sx={{ width: '100%', height: '100%', borderRadius: 0, objectPosition: 'center' }}
                />
              )}
            </Box>
            {/* Hover Overlay using ProjectCardPreview - now only over image */}
            <ProjectCardPreview
              isVisible={isHovered || isTouchLayout}
              technologies={technologies}
              links={linksArray}
              size={isTouchLayout ? 'comfortable' : 'compact'}
            />
          </Box>
          {/* Content */}
          <CardContent sx={{ width: '100%', px: cardSpacing.px, py: cardSpacing.py }}>
            <Stack spacing={cardSpacing.rowGap} alignItems="flex-start">
              <Typography
                variant={cardTitlePreset.variant}
                component={cardTitlePreset.component}
                sx={{ ...cardTitlePreset.sx, color: 'text.primary' }}
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
};

export default ProjectCard;
