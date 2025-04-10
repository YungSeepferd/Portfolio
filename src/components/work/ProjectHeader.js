import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, useTheme } from '@mui/material';
import ContentAwareImage from '../common/ContentAwareImage';
import TechBar from './TechBar';
import SkillTag from '../common/SkillTag';

/**
 * ProjectHeader Component
 * 
 * Displays the main project information at the top of a project modal,
 * including title, description, cover image, categories, and tech bar.
 */
const ProjectHeader = ({ project }) => {
  const theme = useTheme();
  
  if (!project) return null;
  
  const coverImage = project.images?.[0] || project.media;
  
  return (
    <>
      <Box variant="heroSection" sx={{ mb: 6 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box 
              sx={{
                overflow: 'hidden',
                borderRadius: theme.shape.borderRadius,
                position: 'relative',
                height: { xs: 300, md: 400 },
              }}
            >
              <ContentAwareImage
                imageData={coverImage}
                src={typeof coverImage === 'string' ? coverImage : coverImage?.src}
                alt={project.title}
                expandOnHover={true}
                containerHeight="100%"
                containerOrientation="landscape"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h2" // Change from "projectTitle" to standard variant
              sx={{ 
                color: theme.palette.text.primary,
                mb: 2
              }}
            >
              {project.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 3 }}>
              {project.description}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {project.categories?.map(tag => (
                <SkillTag key={tag} label={tag} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      {project.tools?.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <TechBar 
            technologies={project.tools} 
            projectTitle={project.title}
            links={project.links}
          />
        </Box>
      )}
    </>
  );
};

ProjectHeader.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
    tools: PropTypes.arrayOf(PropTypes.string),
    images: PropTypes.array,
    media: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    links: PropTypes.array
  }).isRequired
};

export default ProjectHeader;
