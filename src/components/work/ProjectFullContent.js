import React, { useEffect, useRef } from 'react';
import { Box, Divider, Typography, useTheme, Paper, useMediaQuery, Skeleton } from '@mui/material';
import ProjectSections from './ProjectSections';
import PrototypeShowcase from './PrototypeShowcase';
import TitleOverlay from './TitleOverlay';
import ProjectMetaBar from './ProjectMetaBar';
import projectUtils from '../../utils/projectUtils';
import ContentAwareImage from '../common/ContentAwareImage';
import { isVideo } from '../../utils/mediaUtils';
import VideoPlayer from '../common/VideoPlayer';
import { motion } from 'framer-motion';

/**
 * ProjectFullContent Component
 * 
 * Displays the full content of a project in the modal view.
 * Enhanced with progressive loading, advanced responsive design
 * and motion effects for better user experience.
 */
const ProjectFullContent = ({ project, isLoading, setIsLoading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const contentRef = useRef(null);
  
  // Effect to notify parent when content is fully loaded
  useEffect(() => {
    const handleContentLoad = () => {
      // Delay the loading state change slightly to ensure smooth transitions
      if (setIsLoading) {
        setTimeout(() => setIsLoading(false), 300);
      }
    };

    // Add event listener to window load event in case images are still loading
    window.addEventListener('load', handleContentLoad);
    // Also set a backup timeout in case the load event doesn't fire
    const backupTimer = setTimeout(handleContentLoad, 1500);

    return () => {
      window.removeEventListener('load', handleContentLoad);
      clearTimeout(backupTimer);
    };
  }, [project?.id, setIsLoading]);
  
  if (!project) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">No project data available</Typography>
      </Box>
    );
  }

  const {
    title,
    description,
    categories = [],
    technologies = [],
    links = [],
    sections = [],
    prototype
  } = project;

  // Use robust utility for hero media
  const heroMedia = projectUtils.getProjectHeroMedia(project);
  const isHeroVideo = heroMedia && isVideo(heroMedia.src || heroMedia);

  // Animation variants for content sections
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <Box 
      ref={contentRef}
      id="project-full-content-root" 
      className="project-full-content" 
      component={motion.div}
      initial="hidden"
      animate="show"
      variants={containerAnimation}
      sx={{
        width: '100%',
        maxWidth: '100vw', // Limit to viewport width
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden', // Prevent horizontal scrolling
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        p: { xs: 0, sm: 0, md: 0 },
        boxSizing: 'border-box',
        mx: 'auto', // Center content
      }}
    >
      {/* Hero Media Section with Title Overlay */}
      <Box 
        component={motion.div}
        variants={itemAnimation}
        sx={{
          width: '100%',
          height: { 
            xs: '40vh',  // Adjusted for better mobile experience
            sm: '45vh', 
            md: '50vh' 
          },
          position: 'relative',
          boxShadow: theme.shadows[4],
          minHeight: { 
            xs: 220,
            sm: 280,
            md: 320 
          },
          maxHeight: { 
            xs: 380,
            sm: 450,
            md: 550 
          },
          overflow: 'hidden',
          maxWidth: '100vw', // Ensure no horizontal overflow
        }}
      >
        {/* Skeleton placeholder while loading */}
        {isLoading && (
          <Skeleton 
            variant="rectangular" 
            animation="wave"
            width="100%" 
            height="100%" 
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 2 
            }}
          />
        )}
        
        {isHeroVideo ? (
          <VideoPlayer
            src={heroMedia.src}
            containerWidth="100%"
            containerHeight="100%"
            autoplay={true}
            muted={true}
            controls={true}
            showOverlayControls={true}
            loop={true}
            priority={true} // Prioritize video loading
            sx={{ 
              opacity: isLoading ? 0.3 : 1,
              transition: 'opacity 0.3s ease'
            }}
          />
        ) : (
          <ContentAwareImage
            src={heroMedia.src}
            alt={`${title} Preview`}
            containerWidth="100%"
            containerHeight="100%"
            objectFit="cover"
            loading="eager" // Prioritize image loading
            onError={e => { e.target.src = '/assets/images/placeholders/project.jpg'; }}
            sx={{ 
              opacity: isLoading ? 0.3 : 1,
              transition: 'opacity 0.3s ease'
            }}
          />
        )}
        <TitleOverlay
          title={title}
          description={description}
          categories={categories}
          isMobile={isMobile}
        />
      </Box>

      {/* Content Area */}
      <Box 
        component={motion.div}
        variants={itemAnimation}
        sx={{
          mt: { xs: 3, sm: 4, md: 5 }, // Reduced margin for better content visibility
          mb: { xs: 1.5, sm: 2, md: 3 },
          px: { xs: 1.5, sm: 2.5, md: 3.5 }, // Smaller horizontal padding on mobile
          width: '100%',
          maxWidth: '100%', // Prevent overflow
          boxSizing: 'border-box',
          // Progressive reveal of content
          opacity: isLoading ? 0.7 : 1,
          transition: 'opacity 0.3s ease',
        }}
      >
        {/* Technologies and Links Bar with improved wrapping */}
        <ProjectMetaBar
          technologies={technologies}
          actions={links}
          variant={isMobile ? "compact" : isTablet ? "medium" : "full"}
          sx={{
            flexWrap: 'wrap',
            rowGap: { xs: 1.5, sm: 2 },
            columnGap: { xs: 1, sm: 1.5, md: 2 },
            justifyContent: { xs: 'center', sm: isTablet ? 'center' : 'flex-start' },
            alignItems: 'center',
            width: '100%',
            overflowX: 'hidden',
            pb: { xs: 1, sm: 0 },
          }}
        />
      </Box>

      <Divider 
        component={motion.div}
        variants={itemAnimation}
        sx={{ 
          borderColor: theme.palette.divider, 
          my: { xs: 1, sm: 2 },
          mx: { xs: 2, sm: 3, md: 4 },
        }} 
      />

      <Paper 
        component={motion.div}
        variants={itemAnimation}
        elevation={isMobile ? 0 : isTablet ? 1 : 2}
        sx={{
          p: { xs: 1.5, sm: isTablet ? 2 : 2.5, md: 3 },
          backgroundColor: theme.palette.background.paper,
          minHeight: { xs: 120, sm: 180 },
          boxSizing: 'border-box',
          width: '100%',
          maxWidth: '100%', // Reinforce max width limitation
          overflow: 'hidden',
          borderRadius: { xs: 0, sm: theme.shape.borderRadius },
          border: isMobile ? 'none' : `1px solid ${theme.palette.divider}`,
          // Apply container padding - reduced on mobile
          mx: { xs: 0, sm: 2, md: 3 },
          mb: { xs: 2, sm: 3 }
        }}
      >
        {/* Project Content Sections with Lazy Loading */}
        <ProjectSections 
          sections={sections} 
          isLoading={isLoading}
        />
        
        {/* Prototype Showcase - Only render if prototype is available */}
        {prototype && (
          <PrototypeShowcase
            title="Interactive Prototype"
            url={prototype}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        )}
      </Paper>
      
      {/* Add some space at the bottom for better mobile scrolling */}
      <Box sx={{ height: { xs: 70, sm: 50, md: 30 } }} />
    </Box>
  );
};

export default ProjectFullContent;
