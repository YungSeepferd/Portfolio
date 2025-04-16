import React from 'react';
import { Box, Divider, Typography, useTheme } from '@mui/material';
// Removed unused imports: motion, ProjectHeader, ProjectLinks, TechBar
import ProjectSections from './ProjectSections';
import PrototypeShowcase from './PrototypeShowcase';
import HeroVideo from './HeroVideo';
import TitleOverlay from './TitleOverlay';
import ActionsBar from './ActionsBar';

/**
 * ProjectFullContent Component
 * 
 * Displays the full content of a project in the modal view.
 * Dynamically renders sections based on available project data.
 */
const ProjectFullContent = ({ project }) => {
  // Keep theme for potential future use with theme.palette references
  const theme = useTheme();
  
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
    galleryImages = []
    // Removed unused prototype and presentation variables
  } = project;
  
  // Handle links as either array or object for backward compatibility
  const linksArray = Array.isArray(links) ? links : 
                   (links && typeof links === 'object' ? Object.values(links) : []);
  
  // Get the most appropriate hero media from the project
  const getHeroMedia = () => {
    // Prioritize directly referenced media in the project
    
    // 1. Check for heroVideo first - most projects won't have this but it's the top priority
    if (project.heroVideo) {
      return {
        type: 'video',
        src: project.heroVideo // Already imported in the project file
      };
    }
    
    // 2. Check for videos in galleryImages collection
    const firstVideo = galleryImages.find(item => 
      (item && typeof item === 'object' && item.type === 'video') ||
      (typeof item === 'string' && (
        item.endsWith('.mp4') || 
        item.endsWith('.webm') || 
        item.endsWith('.mov')
      ))
    );
    
    if (firstVideo) {
      if (typeof firstVideo === 'object' && firstVideo.type === 'video') {
        return {
          type: 'video',
          src: firstVideo.src // Already imported in the project file
        };
      }
      return {
        type: 'video',
        src: firstVideo // Already imported in the project file
      };
    }
    
    // 3. Check for heroImage
    if (project.heroImage) {
      return {
        type: 'image',
        src: project.heroImage // Already imported in the project file
      };
    }
    
    // 4. Check for media.src 
    if (project.media) {
      if (typeof project.media === 'string') {
        return {
          type: 'image',
          src: project.media
        };
      }
      
      if (project.media.src) {
        return {
          type: project.media.type || 'image',
          src: project.media.src
        };
      }
    }
    
    // 5. Check featuredImages.overview
    if (project.featuredImages && project.featuredImages.overview) {
      if (typeof project.featuredImages.overview === 'string') {
        return {
          type: 'image',
          src: project.featuredImages.overview
        };
      }
      
      if (typeof project.featuredImages.overview === 'object' && project.featuredImages.overview.src) {
        return {
          type: project.featuredImages.overview.type || 'image',
          src: project.featuredImages.overview.src
        };
      }
    }
    
    // 6. Use first gallery image if available
    if (galleryImages.length > 0) {
      const firstImage = galleryImages[0];
      
      if (typeof firstImage === 'string') {
        return {
          type: 'image',
          src: firstImage
        };
      }
      
      if (typeof firstImage === 'object' && firstImage.src) {
        return {
          type: firstImage.type || 'image',
          src: firstImage.src
        };
      }
    }
    
    // 7. Fallback to placeholder
    return {
      type: 'image',
      src: '/assets/images/placeholders/project.jpg'
    };
  };
  
  // Get the hero media
  const heroMedia = getHeroMedia();
  
  // Get suitable poster image for videos
  const getPosterImage = () => {
    // Try to use featured overview image as poster
    if (project.featuredImages && project.featuredImages.overview) {
      if (typeof project.featuredImages.overview === 'string') {
        return project.featuredImages.overview;
      }
      if (typeof project.featuredImages.overview === 'object' && project.featuredImages.overview.src) {
        return project.featuredImages.overview.src;
      }
    }
    
    // Try to use media as poster
    if (project.media) {
      if (typeof project.media === 'string') {
        return project.media;
      }
      if (project.media.src) {
        return project.media.src;
      }
    }
    
    // No suitable poster found
    return null;
  };
  
  return (
    <Box className="project-full-content" sx={{ 
      width: '100%', 
      height: '100%', 
      overflowY: 'auto',
      backgroundColor: theme.palette.background.default, 
      color: theme.palette.text.primary
    }}>
      {/* Hero Media Section with Title Overlay */}
      <Box sx={{ 
        width: '100%', 
        height: '50vh', 
        position: 'relative',
        boxShadow: theme.shadows[4]
      }}>
        {/* Hero Media */}
        {heroMedia.type === 'video' ? (
          <HeroVideo 
            videoSrc={heroMedia.src} 
            posterImage={getPosterImage()}
          />
        ) : (
          <img
            src={heroMedia.src}
            alt={`${title} Preview`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              console.error(`Failed to load hero image: ${heroMedia.src}`);
              e.target.src = '/assets/images/placeholders/project.jpg';
            }}
          />
        )}
        
        {/* Title Overlay */}
        <TitleOverlay 
          title={title}
          description={description}
          categories={categories}
        />
      </Box>
      
      {/* Actions Bar - Contains both Technologies and Links */}
      <ActionsBar 
        technologies={technologies}
        links={linksArray}
      />
      
      <Divider sx={{ borderColor: theme.palette.divider }} />
      
      <Box sx={{ 
        p: { xs: 2, sm: 3, md: 4 },
        backgroundColor: theme.palette.background.paper
      }}>
        {/* Project Content Sections */}
        <ProjectSections project={project} />
        
        {/* Prototype Showcase (if available) */}
        {project.prototype && (
          <PrototypeShowcase 
            title="Interactive Prototype"
            url={project.prototype}
          />
        )}
      </Box>
    </Box>
  );
};

export default ProjectFullContent;
