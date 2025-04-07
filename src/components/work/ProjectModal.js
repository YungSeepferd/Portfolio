import React, { useMemo } from 'react';
import { Box, Divider, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { isVideo } from '../../utils/mediaHelper';
import ErrorBoundary from '../common/ErrorBoundary';
import { processProjectContent } from '../../utils/projectContentParser';

// Import FooterContact instead of ProjectCTA
import ProjectHeader from './ProjectHeader';
import ProjectNavigation from './ProjectNavigation';
import HeroVideo from './HeroVideo';
import ProjectSections from './ProjectSections';
import ProjectOutcomes from './ProjectOutcomes';
import FooterContact from '../contact/FooterContact'; // Changed from ProjectCTA
import ProjectPrototypeEmbed from './ProjectPrototypeEmbed';
import ProjectFullContent from './ProjectFullContent';
import ProjectGallerySection from './ProjectGallerySection';

/**
 * ProjectModal Component
 * 
 * Displays detailed information about a selected project.
 */
const ProjectModal = ({ project, projects, currentIndex, setCurrentIndex, onClose }) => {
  const theme = useTheme();
  
  const parsedContent = useMemo(() => 
    processProjectContent(project), [project]);
  
  if (!project) return null;
  
  // Find hero video if available
  const heroVideo = project.images?.find(img => 
    (typeof img === 'object' && img.type === 'video') || 
    (typeof img === 'string' && isVideo(img))
  );
  
  // Determine project layout type
  const layoutType = project.layoutType || 'default';
  
  // Determine if we should show individual sections or just the full content
  const useFullContentLayout = layoutType === 'single-column' || 
                              !parsedContent.sections || 
                              parsedContent.sections.length === 0 ||
                              (parsedContent.fullContent && parsedContent.sectionCount <= 1);

  // Get project accent color for section numbering
  const projectAccentColor = project.color || theme.palette.primary.main;
  
  // Define animation for the modal
  const modalAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };
  
  return (
    <ErrorBoundary componentName="ProjectModal">
      <motion.div
        initial={modalAnimation.initial}
        animate={modalAnimation.animate}
        exit={modalAnimation.exit}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.background.default,
          zIndex: theme.zIndex.modal,
          overflow: 'auto',
        }}
      >
        <ProjectNavigation 
          onClose={onClose}
          onPrev={() => {
            const newIndex = (currentIndex - 1 + projects.length) % projects.length;
            setCurrentIndex(newIndex);
          }}
          onNext={() => {
            const newIndex = (currentIndex + 1) % projects.length;
            setCurrentIndex(newIndex);
          }}
        />
        
        <Box 
          component="article"
          sx={{ 
            p: { xs: 2, sm: 4, md: 8 },
            pt: { xs: 8, sm: 10 },
            maxWidth: '1600px',
            mx: 'auto',
            width: '100%'
          }}
        >
          {/* Project header */}
          <ProjectHeader project={project} />
          
          {/* Hero video if available */}
          {heroVideo && <HeroVideo videoSrc={heroVideo} />}
          
          {/* Prototype embed if available */}
          {project.hasPrototypeEmbed && project.prototypeEmbedUrl && (
            <ProjectPrototypeEmbed embedUrl={project.prototypeEmbedUrl} title={project.title} />
          )}
          
          <Divider sx={{ my: 6 }} />
          
          {/* Project content */}
          {!useFullContentLayout ? (
            <ProjectSections 
              project={project} 
              sections={parsedContent.sections} 
              accentColor={projectAccentColor} 
            />
          ) : (
            <ProjectFullContent 
              project={project} 
              content={parsedContent.fullContent} 
              description={project.description} 
            />
          )}
          
          <Divider sx={{ my: 6 }} />
          
          {/* Project outcomes */}
          <ProjectOutcomes 
            project={project} 
            outcomes={parsedContent.outcomes} 
            sectionNumber={parsedContent.sections.length > 0 
              ? (parsedContent.sections.length + 1).toString().padStart(2, '0')
              : "01"}
            accentColor={projectAccentColor}
          />
          
          {/* Project gallery */}
          {project.images?.length > 1 && (
            <Box component="section">
              <ProjectGallerySection images={project.images} title={project.title} />
            </Box>
          )}
          
          <Divider sx={{ my: 6 }} />
          
          {/* Replace ProjectCTA with FooterContact */}
          <FooterContact/>
        </Box>
      </motion.div>
    </ErrorBoundary>
  );
};

export default ProjectModal;