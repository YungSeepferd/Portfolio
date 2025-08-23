import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Snackbar } from './Snackbar';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// Declare Jest globals for TypeScript
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: any;
declare const jest: any;

const theme = createTheme();

describe('Snackbar Component', () => {
  it('renders message when open', () => {
    const handleClose = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Snackbar 
          open={true} 
          onClose={handleClose}
          message="Test message"
        />
      </ThemeProvider>
    );
    
    const message = screen.getByText('Test message');
    expect(message).toBeInTheDocument();
  });
  
  it('applies correct severity color', () => {
    const handleClose = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Snackbar 
          open={true} 
          onClose={handleClose}
          message="Error message"
          severity="error"
        />
      </ThemeProvider>
    );
    
    // The alert component will have specific class for error severity
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveClass('MuiAlert-filledError');
  });
  
  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Snackbar 
          open={true} 
          onClose={handleClose}
          message="Test message"
        />
      </ThemeProvider>
    );
    
    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
  
  it('renders custom action', () => {
    const handleClose = jest.fn();
    const handleAction = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Snackbar 
          open={true} 
          onClose={handleClose}
          message="Test message"
          action={
            <button data-testid="action-button" onClick={handleAction}>
              Action
            </button>
          }
        />
      </ThemeProvider>
    );
    
    const actionButton = screen.getByTestId('action-button');
    expect(actionButton).toBeInTheDocument();
    
    fireEvent.click(actionButton);
    expect(handleAction).toHaveBeenCalledTimes(1);
  });
  
  it('does not show close button when showCloseButton is false', () => {
    const handleClose = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Snackbar 
          open={true} 
          onClose={handleClose}
          message="Test message"
          showCloseButton={false}
        />
      </ThemeProvider>
    );
    
    const closeButton = screen.queryByLabelText('close');
    expect(closeButton).not.toBeInTheDocument();
  });
});
