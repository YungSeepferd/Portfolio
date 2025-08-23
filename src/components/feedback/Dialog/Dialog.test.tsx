import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dialog } from './Dialog';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// Declare Jest globals for TypeScript
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: any;
declare const jest: any;

const theme = createTheme();

describe('Dialog Component', () => {
  it('renders dialog content when open', () => {
    const handleClose = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Dialog open={true} onClose={handleClose}>
          <div data-testid="dialog-content">Dialog Content</div>
        </Dialog>
      </ThemeProvider>
    );
    
    const dialogContent = screen.getByTestId('dialog-content');
    expect(dialogContent).toBeInTheDocument();
    expect(dialogContent).toHaveTextContent('Dialog Content');
  });

  it('displays title when provided', () => {
    const handleClose = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Dialog open={true} onClose={handleClose} title="Test Dialog">
          <div>Content</div>
        </Dialog>
      </ThemeProvider>
    );
    
    const dialogTitle = screen.getByText('Test Dialog');
    expect(dialogTitle).toBeInTheDocument();
  });
  
  it('displays description when provided', () => {
    const handleClose = jest.fn();
    const description = 'This is a description for the dialog';
    render(
      <ThemeProvider theme={theme}>
        <Dialog 
          open={true} 
          onClose={handleClose} 
          title="Test Dialog"
          description={description}
        >
          <div>Content</div>
        </Dialog>
      </ThemeProvider>
    );
    
    const dialogDescription = screen.getByText(description);
    expect(dialogDescription).toBeInTheDocument();
  });
  
  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Dialog open={true} onClose={handleClose} title="Test Dialog">
          <div>Content</div>
        </Dialog>
      </ThemeProvider>
    );
    
    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
  
  it('renders custom actions when provided', () => {
    const handleClose = jest.fn();
    const handleConfirm = jest.fn();
    
    render(
      <ThemeProvider theme={theme}>
        <Dialog
          open={true}
          onClose={handleClose}
          title="Test Dialog"
          actions={
            <>
              <button data-testid="cancel-button" onClick={handleClose}>
                Cancel
              </button>
              <button data-testid="confirm-button" onClick={handleConfirm}>
                Confirm
              </button>
            </>
          }
        >
          <div>Content</div>
        </Dialog>
      </ThemeProvider>
    );
    
    const cancelButton = screen.getByTestId('cancel-button');
    const confirmButton = screen.getByTestId('confirm-button');
    
    expect(cancelButton).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
    
    fireEvent.click(confirmButton);
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });
});
