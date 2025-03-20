import React from 'react';
import { Button, Box, useTheme } from '@mui/material';

const Filters = ({ activeFilter, filters, onFilterSelect }) => {
  const theme = useTheme();
  // Limit to max 5 filters covering majority of work (based on workdata.js)
  const displayedFilters = filters.length > 5 ? filters.slice(0, 5) : filters;
  
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {displayedFilters.map((filter) => (
        <Button
          key={filter}
          onClick={() => onFilterSelect(filter)}
          sx={{
            color: activeFilter === filter ? theme.palette.filter.active : theme.palette.filter.inactive,
            borderColor: activeFilter === filter ? theme.palette.filter.active : theme.palette.filter.inactive,
            textTransform: 'none',
          }}
          variant="outlined"
        >
          {filter}
        </Button>
      ))}
    </Box>
  );
};

export default Filters;