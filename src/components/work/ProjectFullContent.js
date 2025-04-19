import React from 'react';
import { Box, Divider, Typography, useTheme, Paper } from '@mui/material';
import ProjectSections from './ProjectSections';
import PrototypeShowcase from './PrototypeShowcase';
import HeroVideo from './HeroVideo';
import TitleOverlay from './TitleOverlay';
import ProjectMetaBar from './ProjectMetaBar';
import projectUtils from '../../utils/projectUtils';

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
    links = [],
    sections = [],
    prototype
  } = project;

  // Use robust utility for hero media
  const heroMedia = projectUtils.getProjectHeroMedia(project);

  return (
    <Box id="project-full-content-root" className="project-full-content" sx={{
      width: '100%',
      height: '100%',
      overflowY: 'auto',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      p: { xs: 0, sm: 0, md: 0 },
      boxSizing: 'border-box',
    }}>
      {/* Hero Media Section with Title Overlay */}
      <Box sx={{
        width: '100%',
        height: { xs: '50vh', sm: '40vh', md: '50vh' }, // Reduce hero height on mobile
        position: 'relative',
        boxShadow: theme.shadows[4],
        minHeight: { xs: 120, sm: 180, md: 240 },
      }}>
        {heroMedia.type === 'video' ? (
          <HeroVideo videoSrc={heroMedia.src} />
        ) : (
          <img
            src={heroMedia.src}
            alt={`${title} Preview`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { e.target.src = '/assets/images/placeholders/project.jpg'; }}
          />
        )}
        <TitleOverlay
          title={title}
          description={description}
          categories={categories}
        />
      </Box>

      {/* Add extra top margin for modal header area */}
      <Box sx={{
        mt: { xs: 8, sm: 10, md: 12 }, // Increased top margin for more space below hero
        mb: { xs: 2, sm: 3 },        // Added bottom margin for separation from content
        px: { xs: 1, sm: 2, md: 4 }, // Add horizontal padding for tooltags
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {/* Actions Bar - Technologies and Links */}
        <ProjectMetaBar
          technologies={technologies}
          actions={links}
          variant="full"
          sx={{
            flexWrap: 'wrap',
            rowGap: { xs: 2.5, sm: 2 }, // More vertical space for tooltags
            columnGap: { xs: 1.5, sm: 2 },
            justifyContent: { xs: 'flex-start', sm: 'flex-start' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            width: '100%',
            overflowX: 'auto',
            pb: { xs: 1, sm: 0 },
          }}
        />
      </Box>

      <Divider sx={{ borderColor: theme.palette.divider, my: { xs: 1, sm: 2 } }} />

      <Paper id="project-full-content-paper" sx={{
        p: { xs: 1.5, sm: 3, md: 4 },
        backgroundColor: theme.palette.background.paper,
        minHeight: { xs: 120, sm: 180 },
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'auto',
      }}>
        {/* Project Content Sections */}
        <ProjectSections sections={sections} />
        {/* Prototype Showcase (if available) */}
        {prototype && (
          <PrototypeShowcase
            title="Interactive Prototype"
            url={prototype}
          />
        )}
      </Paper>
    </Box>
  );
};

export default ProjectFullContent;
