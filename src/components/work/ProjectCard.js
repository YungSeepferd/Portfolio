import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ContentAwareImage from '../common/ContentAwareImage';
import ProjectCardPreview from './ProjectCardPreview';
import TagList from '../common/TagList';

/**
 * ProjectCard Component
 *
 * Displays a preview card for a project in the main grid.
 * Shows TechBar and Links on hover via ProjectCardPreview.
 */
const ProjectCard = ({ project, onClick }) => {
  const theme = useTheme();
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

  // Determine image source with proper fallbacks and path resolution
  const getProjectImage = () => {
    // Try direct media object first
    if (project.media) {
      if (typeof project.media === 'string') {
        return project.media;
      }
      if (project.media.src) {
        return project.media.src;
      }
    }
    
    // Then try featuredImages.overview
    if (project.featuredImages?.overview) {
      if (typeof project.featuredImages.overview === 'string') {
        return project.featuredImages.overview;
      }
      if (typeof project.featuredImages.overview === 'object' && project.featuredImages.overview.src) {
        return project.featuredImages.overview.src;
      }
    }
    
    // Fall back to gallery image or placeholder
    if (project.galleryImages && project.galleryImages.length > 0) {
      const firstImage = project.galleryImages[0];
      if (typeof firstImage === 'string') {
        return firstImage;
      }
      if (firstImage && firstImage.src) {
        return firstImage.src;
      }
    }
    
    return 'https://via.placeholder.com/400x250?text=Project+Image+Not+Found';
  };

  const imageSrc = getProjectImage();
  
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
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: theme.shadows[6],
          },
          ...(cardVariant && cardVariant !== 'default' && {
            borderTop: `4px solid ${theme.palette[cardVariant]?.main || theme.palette.primary.main}`
          })
        }}
      >
        {/* Image Area with Overlay */}
        <Box sx={{ position: 'relative', width: '100%', flex: '0 0 60%', minHeight: 0 }}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              background: theme.palette.grey[100],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <ContentAwareImage
              src={imageSrc}
              alt={`${title} preview`}
              containerHeight="100%"
              containerWidth="100%"
              objectFit="cover"
              style={{ width: '100%', height: '100%', borderRadius: 0, objectPosition: 'center' }}
              onError={(e) => {
                console.error(`Failed to load image for ${title}: ${imageSrc}`, e);
                e.target.src = 'https://via.placeholder.com/400x250?text=Image+Not+Found';
              }}
            />
          </Box>
          {/* Hover Overlay using ProjectCardPreview - now only over image */}
          <ProjectCardPreview
            isVisible={isHovered}
            technologies={technologies}
            links={linksArray}
          />
        </Box>
        {/* Content */}
        <CardContent
          sx={{
            flex: '1 1 40%', // 40% of the card height for content
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
            <TagList tags={categories} />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;