import React from 'react';
import { Box, Stack, BoxProps } from '@mui/material';
import ActionButton, { ActionButtonProps } from '../ActionButton';

export interface ActionConfig extends Omit<ActionButtonProps, 'label'> {
  /** Button text */
  label: string;
  
  /** Optional identifier for the action */
  id?: string;
  
  /** Whether this is the primary/main action */
  primary?: boolean;
}

export interface ActionButtonsGroupProps extends BoxProps {
  /** Array of action configurations */
  actions: ActionConfig[];
  
  /** Direction for button layout */
  direction?: 'row' | 'column';
  
  /** Spacing between buttons */
  spacing?: number;
  
  /** Whether to use contained variant for primary action */
  enhancePrimary?: boolean;
  
  /** Container styles */
  containerSx?: BoxProps['sx'];
}

/**
 * A group of action buttons rendered together with consistent spacing and styling
 */
const ActionButtonsGroup: React.FC<ActionButtonsGroupProps> = ({
  actions = [],
  direction = 'row',
  spacing = 1,
  enhancePrimary = true,
  containerSx = {},
  ...boxProps
}) => {
  if (!actions || actions.length === 0) return null;

  return (
    <Box 
      className="action-buttons-group"
      sx={{ 
        display: 'flex',
        justifyContent: 'flex-start',
        ...containerSx,
      }}
      {...boxProps}
    >
      <Stack 
        direction={direction} 
        spacing={spacing}
        flexWrap="wrap"
      >
        {actions.map((action, index) => {
          const { label, id, primary, ...actionProps } = action;
          
          // For primary buttons, use contained variant if enhancePrimary is true
          const variant = (primary && enhancePrimary) ? 'contained' : (actionProps.variant || 'outlined');
          
          // For primary buttons, use slightly larger size
          const size = primary ? 'medium' : (actionProps.size || 'small');

          return (
            <ActionButton
              key={id || `action-${index}-${label}`}
              label={label}
              variant={variant}
              size={size}
              {...actionProps}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default ActionButtonsGroup;
