import React from 'react';
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  useTheme,
  Slide
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';

// Slide transition for dialog
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface DialogProps {
  /**
   * If true, the dialog is open
   */
  open: boolean;

  /**
   * Callback fired when the dialog is closed
   */
  onClose: () => void;

  /**
   * The title of the dialog
   */
  title?: string;

  /**
   * The content of the dialog
   */
  children: React.ReactNode;

  /**
   * The description text for the dialog (optional)
   */
  description?: string;

  /**
   * Actions to display at the bottom of the dialog
   */
  actions?: React.ReactNode;

  /**
   * If true, the dialog will be full-screen
   */
  fullScreen?: boolean;

  /**
   * Maximum width of the dialog
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

  /**
   * If true, the dialog stretches to the maximum width
   */
  fullWidth?: boolean;

  /**
   * Show close button in title
   */
  showCloseButton?: boolean;

  /**
   * Additional props
   */
  [key: string]: any;
}

/**
 * Dialog component for feedback and confirmations
 */
export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  children,
  description,
  actions,
  fullScreen = false,
  maxWidth = 'sm',
  fullWidth = true,
  showCloseButton = true,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      TransitionComponent={Transition}
      {...rest}
    >
      {title && (
        <DialogTitle sx={{ pr: showCloseButton ? 6 : 2 }}>
          {title}
          {showCloseButton && (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      
      <DialogContent>
        {description && <DialogContentText>{description}</DialogContentText>}
        {children}
      </DialogContent>
      
      {actions && <DialogActions>{actions}</DialogActions>}
      
      {/* Default actions if none provided */}
      {!actions && (
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      )}
    </MuiDialog>
  );
};
