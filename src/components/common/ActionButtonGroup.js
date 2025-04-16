import React from 'react';
import { Box, Stack, Button, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { getBarStyles } from '../../utils/getBarStyles';

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
      direction={direction}
      spacing={1.5}
      flexWrap={layout === 'grid' ? 'wrap' : 'nowrap'}
      justifyContent="center"
      alignItems={layout === 'column' ? 'flex-start' : 'center'}
      sx={{
        gap: 1.5,
        width: '100%',
        ...sx
      }}
    >
      {visibleActions.map((action, index) => (
        <Box key={`action-${index}`} sx={{ flexShrink: 0 }}>
          <Button
            href={action.url || action.href}
            target={action.href ? '_blank' : undefined}
            startIcon={action.icon}
            variant={action.variant || variant}
            color={action.color || 'accent'}
            size={action.size || size}
            sx={{ ...styles.button }}
            aria-label={action.label}
          >
            {action.label}
          </Button>
        </Box>
      ))}
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
  barVariant: PropTypes.string
};

export default ActionButtonGroup;
