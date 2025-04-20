import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import ContentAwareImage from '../common/ContentAwareImage';
import ProjectCardPreview from './ProjectCardPreview';
import CategoryTagList from '../common/CategoryTagList';
import VideoPlayer from '../common/VideoPlayer';
import projectUtils from '../../utils/projectUtils';
import { isVideo } from '../../utils/mediaUtils';

/**
 * ProjectCard Component
 *
 * Displays a preview card for a project in the main grid.
 * Shows TechBar and Links on hover via ProjectCardPreview.
 */
const ProjectCard = ({ project, onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isHovered, setIsHovered] = useState(false);

  if (!project) return null;

  const { 
    title, 
    description, 
    categories = [], 
    technologies = [], 
    links = [],
    cardVariant = 'default'
  } = project;

  // Handle links as either array or object for backward compatibility
  const linksArray = Array.isArray(links) ? links : 
                    (links && typeof links === 'object' ? Object.values(links) : []);

  // Get the primary media and determine if it's a video
  const primaryMedia = project.media || projectUtils.getProjectPrimaryMedia(project);
  const isVideoMedia = primaryMedia && isVideo(primaryMedia.src || primaryMedia);
  
  // Animation for the card itself
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // Only show hover preview on non-mobile
  const showPreview = !isMobile && isHovered;

  return (
    <Card
      component={motion.div}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={!isMobile ? { scale: 1.03, boxShadow: theme.shadows[6] } : {}}
      onMouseEnter={() => { if (!isMobile) setIsHovered(true); }}
      onMouseLeave={() => { if (!isMobile) setIsHovered(false); }}
      onClick={() => onClick(project)}
      sx={{
        cursor: 'pointer',
        width: '100%',
        aspectRatio: '1 / 1',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        backgroundColor: theme.palette.background.paper,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': !isMobile ? {
          transform: 'translateY(-5px)',
          boxShadow: theme.shadows[6],
        } : {},
        ...(cardVariant && cardVariant !== 'default' && {
          borderTop: `4px solid ${theme.palette[cardVariant]?.main || theme.palette.primary.main}`
        })
      }}
    >
      {/* Image/Video Area with Overlay */}
      <Box sx={{ position: 'relative', width: '100%', flex: '0 0 60%', minHeight: 0 }}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            background: theme.palette.background.default,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
            overflow: 'hidden',
          }}
        >
          {isVideoMedia ? (
            <VideoPlayer
              src={primaryMedia.src}
              containerHeight="100%"
              containerWidth="100%"
              autoplay={true}
              muted={true}
              controls={false}
              showOverlayControls={false}
              loop={true}
              poster={primaryMedia.poster || '/assets/images/placeholders/project.jpg'}
              onError={(e) => {
                console.error(`Failed to load video for ${title}: ${primaryMedia.src}`, e);
              }}
            />
          ) : primaryMedia ? (
            <ContentAwareImage
              src={primaryMedia.src}
              alt={`${title} preview`}
              containerHeight="100%"
              containerWidth="100%"
              objectFit="cover"
              style={{ width: '100%', height: '100%', borderRadius: 0, objectPosition: 'center' }}
              onError={(e) => {
                console.error(`Failed to load image for ${title}: ${primaryMedia.src}`, e);
                e.target.src = '/assets/images/placeholders/project.jpg';
              }}
            />
          ) : (
            <ContentAwareImage
              src={'/assets/images/placeholders/project.jpg'}
              alt={`${title} preview`}
              containerHeight="100%"
              containerWidth="100%"
              objectFit="cover"
              style={{ width: '100%', height: '100%', borderRadius: 0, objectPosition: 'center' }}
            />
          )}
        </Box>
        {/* Hover Preview */}
        {showPreview && (
          <ProjectCardPreview
            isVisible={showPreview}
            technologies={technologies}
            links={linksArray}
          />
        )}
      </Box>
      {/* Content */}
      <CardContent
        sx={{
          flex: '1 1 40%',
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 1.5, md: 2 },
          minHeight: 0,
          backgroundColor: theme.palette.background.paper,
          justifyContent: 'flex-start',
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{ fontWeight: 600, color: theme.palette.text.primary, fontSize: { xs: '1rem', md: '1.1rem' } }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1, flexGrow: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: { xs: '0.95rem', md: '1rem' } }}
        >
          {description}
        </Typography>
        {categories && categories.length > 0 && (
          <CategoryTagList tags={categories} />
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;