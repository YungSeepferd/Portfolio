import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, useTheme } from '@mui/material';
import ContentAwareImage from '../common/ContentAwareImage';
import TechBar from './TechBar';
import SkillTag from '../common/SkillTag';

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
              variant="projectTitle"
              sx={{ 
                color: theme.palette.primary.main,
                fontSize: '2.5rem',
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
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
            links={project.links || []}
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
