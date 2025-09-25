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
      color: theme.palette.text.primary
    }}>
      {/* Hero Media Section with Title Overlay */}
      <Box sx={{
        width: '100%',
        height: '50vh',
        position: 'relative',
        boxShadow: theme.shadows[4]
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

      {/* Actions Bar - Technologies and Links */}
      <ProjectMetaBar
        technologies={technologies}
        actions={links}
        variant="full"
      />

      <Divider sx={{ borderColor: theme.palette.divider }} />

      <Paper id="project-full-content-paper" sx={{
        p: { xs: 2, sm: 3, md: 4 },
        backgroundColor: theme.palette.background.paper
      }}>
        {/* Project Content Sections */}
        <ProjectSections sections={sections} projectId={project.id} />
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
