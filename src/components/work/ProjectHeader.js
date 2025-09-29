import React from 'react';
import { Box, Typography, Chip, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

// Styled components for project header
const HeaderWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  width: '100%',
}));

/**
 * ProjectHeader Component
 * 
 * Displays the title, description, and categories for a project.
 * It's the main information section at the top of the project modal.
 * 
 * @param {Object} props
 * @param {string} props.title - Project title
 * @param {string} props.description - Project description
 * @param {Array} props.categories - Array of category strings
 * @param {Object} props.project - Full project object for additional data
 */
const ProjectHeader = ({ title, description, categories = [], project }) => {
  // Combine directly passed props with data from project object if available
  const displayTitle = title || (project?.title || '');
  const displayDesc = description || (project?.description || '');
  const displayCategories = categories.length > 0 ? categories : (project?.categories || []);
  
  return (
    <HeaderWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            {displayTitle}
          </Typography>
          
          <Typography 
            variant="subtitle1"
            sx={{ 
              mb: 3,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
              color: 'text.secondary',
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            {displayDesc}
          </Typography>
          
          {displayCategories.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {displayCategories.map((category, index) => (
                <Chip
                  key={`category-${index}`}
                  label={category}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    borderRadius: 0,
                    fontWeight: 500,
                  }}
                />
              ))}
            </Box>
          )}
        </Grid>
      </Grid>
    </HeaderWrapper>
  );
};

ProjectHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  categories: PropTypes.array,
  project: PropTypes.object,
};

export default ProjectHeader;
