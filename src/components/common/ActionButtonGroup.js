import React from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { getBarStyles } from '../../utils/getBarStyles';
import ActionButton from './ActionButton';

/**
 * ActionButtonGroup Component
 * 
 * Displays a group of action buttons with consistent styling and behavior.
 * Used in ProjectCard, ProjectFullContent, and other components that need actions.
 * 
 * @param {Object} props
 * @param {Array} props.actions - Array of standardized action objects
 * @param {string} props.size - Button size ('small', 'medium', 'large')
 * @param {string} props.variant - Button variant ('text', 'outlined', 'contained')
 * @param {string} props.layout - Layout type ('row', 'column', 'grid')
 * @param {number} props.maxButtons - Maximum number of buttons to show
 * @param {Object} props.sx - Additional styles
 * @param {string} props.barVariant - Variant for bar styling
 */
const ActionButtonGroup = ({
  actions = [],
  size = 'small',
  variant = 'outlined',
  layout = 'row',
  maxButtons = Infinity,
  sx = {},
  barVariant = 'default'
}) => {
  const theme = useTheme();
  const styles = getBarStyles(barVariant, theme);

  // Don't render if no actions
  if (!actions || actions.length === 0) return null;
  
  // Limit number of buttons if specified
  const visibleActions = actions.slice(0, maxButtons);
  
  // Determine direction based on layout
  const direction = layout === 'column' ? 'column' : 'row';
  
  return (
    <Stack 
      id="action-button-group"
      direction={direction}
      spacing={1.5}
      flexWrap={layout === 'grid' ? 'wrap' : 'nowrap'}
      justifyContent="center"
      alignItems={layout === 'column' ? 'flex-start' : 'center'}
      sx={{
        gap: 1.5,
        width: '100%',
        // Prevent hover background on Stack itself
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'transparent'
        },
        ...sx
      }}
    >
      {visibleActions.map((action, index) => {
        // Normalize: if action.url exists and action.href does not, use url as href
        const normalizedAction = {
          ...action,
          href: action.href || action.url
        };
        return (
          <Box key={`action-${index}`} id={`action-button-box-${index}`} sx={{ flexShrink: 0 }}>
            <ActionButton
              {...normalizedAction}
              variant={action.variant || variant}
              
              size={action.size || size}
              sx={{ ...styles.button, ...action.sx }}
            />
          </Box>
        );
      })}
    </Stack>
  );
};

ActionButtonGroup.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string,
      href: PropTypes.string, // Alternative to url for backward compatibility
      icon: PropTypes.node,
      variant: PropTypes.string,
      color: PropTypes.string,
      size: PropTypes.string,
      contentType: PropTypes.string,
      openInPopup: PropTypes.bool,
      sx: PropTypes.object,
      onClick: PropTypes.func
    })
  ),
  size: PropTypes.string,
  variant: PropTypes.string,
  layout: PropTypes.oneOf(['row', 'column', 'grid']),
  maxButtons: PropTypes.number,
  sx: PropTypes.object,
  barVariant: PropTypes.string,
  id: PropTypes.string
};

export default ActionButtonGroup;
