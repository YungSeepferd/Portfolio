import React from 'react';
import {
  Snackbar as MuiSnackbar,
  SnackbarProps as MuiSnackbarProps,
  Alert as MuiAlert,
  AlertProps as MuiAlertProps,
  IconButton,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Create a custom Alert component based on MUI's Alert
const Alert = React.forwardRef<HTMLDivElement, MuiAlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export type SnackbarSeverity = 'success' | 'info' | 'warning' | 'error';

export interface SnackbarProps extends Omit<MuiSnackbarProps, 'action'> {
  /**
   * The message to display
   */
  message?: string;
  
  /**
   * The severity of the alert (affects color and icon)
   */
  severity?: SnackbarSeverity;
  
  /**
   * Whether to show the snackbar
   */
  open: boolean;
  
  /**
   * Callback fired when the snackbar is closed
   */
  onClose: () => void;
  
  /**
   * Auto hide duration in milliseconds
   */
  autoHideDuration?: number;
  
  /**
   * Anchor position for the snackbar
   */
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  
  /**
   * If true, snackbar will show a close button
   */
  showCloseButton?: boolean;
  
  /**
   * Additional action component to display
   */
  action?: React.ReactNode;
  
  /**
   * Additional props for the Alert component
   */
  alertProps?: Partial<MuiAlertProps>;
}

/**
 * Enhanced Snackbar component for transient messages
 */
export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  severity = 'info',
  open,
  onClose,
  autoHideDuration = 6000,
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  showCloseButton = true,
  action,
  alertProps,
  ...rest
}) => {
  // Handle close action
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };
  
  // Close button for the snackbar
  const closeButton = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      {...rest}
    >
      <Alert
        severity={severity}
        onClose={handleClose}
        {...alertProps}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {action}
            {showCloseButton && closeButton}
          </Box>
        }
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
};
