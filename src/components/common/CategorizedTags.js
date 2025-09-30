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
const CategorizedTags = ({ categories = [], columns = { xs: 1, md: 2, lg: 3 } }) => {
  // Compute responsive grid spans from desired column counts (not raw Grid widths)
  const count = Array.isArray(categories) ? categories.length : 0;
  const mdCols = (columns && columns.md) || 2; // desired columns at md
  const lgCols = (columns && columns.lg) || mdCols; // desired columns at lg
  // Single category should take full width to avoid wasted space
  const mdSpan = count <= 1 ? 12 : Math.max(3, Math.floor(12 / mdCols));
  const lgSpan = count <= 1 ? 12 : Math.max(3, Math.floor(12 / lgCols));

  return (
    <Grid container spacing={2} sx={{ mt: 0 }}>
      {categories.map((cat) => (
        <Grid item xs={12} md={mdSpan} lg={lgSpan} key={cat.title}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: `${cat.color}.main` }}>
              {cat.title}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pr: { md: 0.5, lg: 0 } }}>
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
