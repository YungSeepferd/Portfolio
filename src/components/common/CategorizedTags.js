import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';
import SkillTagList from './SkillTagList';

/**
 * CategorizedTags
 * Renders groups of tags under category headings using theme-aware colours.
 *
 * props.categories: Array<{ title: string, color: MUIColor, items: string[] }>
 * props.columns: responsive columns config for Grid (default 1/2)
 */
const CategorizedTags = ({ categories = [], columns = { xs: 1, md: 2 } }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 0 }}>
      {categories.map((cat) => (
        <Grid item xs={12} md={columns.md || 2} key={cat.title}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: `${cat.color}.main` }}>
              {cat.title}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {cat.items.map((item) => (
              <SkillTagList
                key={`${cat.title}-${item}`}
                label={item}
                color={cat.color}
                variant="skill"
                size="small"
              />
            ))}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

CategorizedTags.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      color: PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
      items: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  columns: PropTypes.object,
};

export default CategorizedTags;
