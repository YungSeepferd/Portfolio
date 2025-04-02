import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, useTheme } from '@mui/material';

const ProjectFilter = ({ activeFilter, filters, onFilterChange }) => {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: theme.spacing(2), 
        mb: theme.spacing(2) 
      }}
    >
      {filters.map(filter => (
        <Button 
          key={filter}
          onClick={() => onFilterChange(filter)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onFilterChange(filter);
            }
          }}
          sx={{
            backgroundColor: activeFilter === filter ? 
              theme.palette.primary.main : 
              theme.palette.background.paper,
            border: `2px solid ${theme.palette.primary.main}`,
            color: activeFilter === filter ? 
              '#fff' : 
              theme.palette.primary.main,
            padding: theme.customComponents.filter.buttonPadding,
            borderRadius: theme.customComponents.filter.buttonRadius,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: '#fff',
            },
          }}
        >
          {filter}
        </Button>
      ))}
    </Box>
  );
};

ProjectFilter.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default ProjectFilter;