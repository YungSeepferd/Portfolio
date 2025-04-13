import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ProjectHeader from './ProjectHeader';
import ProjectSection from './ProjectSection';
import ProjectLinks from './ProjectLinks';
import TechBar from './TechBar';
import PrototypeShowcase from './PrototypeShowcase';
import HeroVideo from './HeroVideo';
import { resolveMediaPath } from '../../utils/MediaPathResolver';
import { useTheme } from '@mui/material/styles';

/**
 * ProjectFullContent Component
 * 
 * Displays the full content of a project in the modal view.
 * Dynamically renders sections based on available project data.
 */
const ProjectFullContent = ({ project }) => {
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
    heroImage,
    heroVideo,
    sections = [],
    links = [],
    prototype,
    presentation
  } = project;
  
  // Ensure heroImage path is correctly resolved
  const heroImageSrc = resolveMediaPath(heroImage);
  
  // Animation variants for content sections
  const contentAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };
  
  return (
    <Box className="project-full-content" sx={{ width: '100%', height: '100%', overflowY: 'auto' }}>
      {/* Hero Media Section */}
      <Box sx={{ width: '100%', height: '40vh', position: 'relative' }}>
        {heroVideo ? (
          <HeroVideo 
            src={resolveMediaPath(heroVideo)} 
            posterImage={heroImageSrc}
            title={title}
          />
        ) : (
          <img
            src={heroImageSrc}
            alt={`${title} Preview`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </Box>
      
      <Divider />
      
      {/* Categories/Tech Tags */}
      {categories.length > 0 && (
        <Box sx={{ p: 2 }}>
          <TechBar technologies={categories} />
        </Box>
      )}
      
      {/* Project Links (prototype, presentation, etc.) */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={contentAnimation}
      >
        <Box sx={{ 
          p: { xs: 2, sm: 3, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <ProjectLinks 
            prototype={prototype} 
            presentation={presentation}
            links={links}
          />
        </Box>
      </motion.div>
      
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        {/* Project Header */}
        <ProjectHeader
          title={title}
          description={description}
          categories={categories}
          project={project}
        />
        
        {/* Project Content Sections */}
        {sections.map((section, index) => (
          <ProjectSection
            key={`section-${index}`}
            title={section.title}
            content={section.content}
            media={section.media}
            layout={section.layout || 'standard'}
            id={`section-${index}`}
          />
        ))}
        
        {/* Technologies Section */}
        {technologies.length > 0 && (
          <Box sx={{ mt: 4, mb: 6 }}>
            <Typography variant="h5" gutterBottom>Technologies</Typography>
            <TechBar technologies={technologies} />
          </Box>
        )}
        
        {/* Prototype Showcase (if available) */}
        {prototype && (
          <PrototypeShowcase 
            title="Interactive Prototype"
            prototypeUrl={prototype}
          />
        )}
      </Box>
    </Box>
  );
};

export default ProjectFullContent;
