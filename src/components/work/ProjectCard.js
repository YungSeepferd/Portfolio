import React, { useState, useRef } from 'react';
import { Card, CardContent, Typography, Box, useTheme, useMediaQuery, Chip } from '@mui/material';
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
 * Enhanced with improved touch handling for mobile scrolling.
 */
const ProjectCard = ({ project, onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isHovered, setIsHovered] = useState(false);
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const isScrollingRef = useRef(false);

  if (!project) return null;

  const { 
    title, 
    description, 
    shortDescription, // Optional shorter description for mobile
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

  // Maximum number of tags to show on mobile
  const MAX_MOBILE_TAGS = 2; // Changed from 3 to 2 to place +counter in the third position
  
  // Calculate hidden tags count for mobile
  const hiddenTagsCount = isMobile && categories.length > MAX_MOBILE_TAGS ? 
    categories.length - MAX_MOBILE_TAGS : 0;

  // Choose which description to display based on device
  const displayDescription = isMobile && shortDescription ? shortDescription : description;

  // Touch event handlers to differentiate between scrolling and tapping
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
    isScrollingRef.current = false;
  };

  const handleTouchMove = (e) => {
    if (!isMobile) return;
    
    const touch = e.touches[0];
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);
    
    // If vertical movement is detected, mark as scrolling
    if (deltaY > 10) {
      isScrollingRef.current = true;
    }
  };

  const handleTouchEnd = (e) => {
    if (!isMobile) return;
    
    // Only trigger click if not scrolling and touch duration is short
    const touchDuration = Date.now() - touchStartRef.current.time;
    if (!isScrollingRef.current && touchDuration < 300) {
      onClick(project);
    }
  };

  return (
    <Card
      component={motion.div}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={!isMobile ? { scale: 1.03, boxShadow: theme.shadows[6] } : {}}
      onMouseEnter={() => { if (!isMobile) setIsHovered(true); }}
      onMouseLeave={() => { if (!isMobile) setIsHovered(false); }}
      onClick={(e) => { if (!isMobile) onClick(project); }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      sx={{
        cursor: 'pointer',
        width: '100%',
        // Using different aspect ratio for mobile to provide more space for content
        aspectRatio: { xs: '1 / 1.3', sm: '1 / 1.2', md: '1 / 1' }, // Made taller on mobile
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        backgroundColor: theme.palette.background.paper,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        touchAction: 'pan-y', // Allow vertical scrolling on touch devices
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
      <Box sx={{ 
        position: 'relative', 
        width: '100%', 
        // Reduce image portion on mobile to give more space to content
        flex: { xs: '0 0 45%', sm: '0 0 50%', md: '0 0 60%' }, // Further reduced on mobile
        minHeight: 0 
      }}>
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
          flex: '1 1 55%', // Increased content portion on mobile
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 1.75, md: 2 }, // Increased padding slightly on mobile
          minHeight: 0,
          backgroundColor: theme.palette.background.paper,
          justifyContent: 'space-between', // Changed to space-between to push categories to bottom
          overflow: 'hidden',
        }}
      >
        {/* Top content section (title and description) */}
        <Box>
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{ 
              fontWeight: 600, 
              color: theme.palette.text.primary, 
              fontSize: { xs: '1.05rem', sm: '1.1rem', md: '1.15rem' }, // Increased font size for mobile
              mb: { xs: 0.5, sm: 0.75, md: 1 } // Slightly increased margin
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ 
              mb: { xs: 0.75, sm: 1, md: 1.5 }, 
              display: '-webkit-box', 
              WebkitLineClamp: { xs: 5, sm: 4, md: 3 }, // Show more lines on mobile
              WebkitBoxOrient: 'vertical', 
              overflow: 'hidden', 
              fontSize: { xs: '0.9rem', sm: '0.92rem', md: '0.95rem' }, // Slightly increased font size on mobile
              lineHeight: { xs: 1.45, sm: 1.5, md: 1.6 } // Slightly increased line height
            }}
          >
            {displayDescription}
          </Typography>
        </Box>
        
        {/* Bottom content section (categories) - pushed to bottom */}
        {categories && categories.length > 0 && (
          <Box sx={{ 
            mt: 'auto', 
            pt: { xs: 0.75, sm: 1, md: 1.5 }, 
            display: 'flex', 
            flexWrap: 'wrap', 
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}>
            {/* Show first MAX_MOBILE_TAGS tags on mobile, followed by +X counter if needed */}
            {isMobile ? (
              // Mobile view with limited tags + counter if needed
              <>
                {categories.slice(0, MAX_MOBILE_TAGS).map((tag, index) => (
                  <Chip
                    key={`tag-${index}`}
                    label={tag}
                    size="small"
                    sx={{
                      height: '22px',
                      fontSize: '0.75rem',
                      backgroundColor: theme.palette.background.default,
                      color: theme.palette.text.secondary,
                      my: 0.25,
                      mr: 0.5,
                      py: 0.25,
                      '& .MuiChip-label': {
                        px: 0.8
                      }
                    }}
                  />
                ))}
                {hiddenTagsCount > 0 && (
                  <Chip
                    label={`+${hiddenTagsCount}`}
                    size="small"
                    sx={{
                      height: '22px',
                      fontSize: '0.75rem',
                      backgroundColor: theme.palette.background.default,
                      color: theme.palette.text.secondary,
                      fontWeight: 500,
                      my: 0.25,
                      mr: 0.5,
                      borderRadius: '16px',
                      py: 0.25,
                      '& .MuiChip-label': {
                        px: 0.8
                      }
                    }}
                  />
                )}
              </>
            ) : (
              // Desktop view with all tags
              <CategoryTagList 
                tags={categories} 
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  '& .MuiChip-root': { 
                    my: 0.5,
                    mr: 0.75,
                    height: 'inherit',
                    py: 0.5,
                    fontSize: '0.8rem',
                    '& .MuiChip-label': {
                      px: 1
                    }
                  }
                }}
              />
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;