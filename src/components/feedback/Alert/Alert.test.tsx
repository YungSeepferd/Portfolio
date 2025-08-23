import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Alert } from './Alert';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// Declare Jest globals for TypeScript
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: any;
declare const jest: any;

const theme = createTheme();

describe('Alert Component', () => {
  it('renders children correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <Alert>Alert content</Alert>
      </ThemeProvider>
    );
    
    expect(screen.getByText('Alert content')).toBeInTheDocument();
  });

  it('displays title when provided', () => {
    render(
      <ThemeProvider theme={theme}>
        <Alert title="Alert Title">Alert content</Alert>
      </ThemeProvider>
    );
    
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('Alert content')).toBeInTheDocument();
  });
  
  it('applies correct severity', () => {
    render(
      <ThemeProvider theme={theme}>
        <Alert severity="error">Error message</Alert>
      </ThemeProvider>
    );
    
    // The alert component will have specific class for error severity
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveClass('MuiAlert-standardError');
  });
  
  it('shows close button when showCloseButton is true', () => {
    render(
      <ThemeProvider theme={theme}>
        <Alert showCloseButton={true} onClose={jest.fn()}>
          Closable alert
        </Alert>
      </ThemeProvider>
    );
    
    expect(screen.getByLabelText('close')).toBeInTheDocument();
  });
  
  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Alert showCloseButton={true} onClose={handleClose}>
          Closable alert
        </Alert>
      </ThemeProvider>
    );
    
    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
  
  it('applies correct variant', () => {
    render(
      <ThemeProvider theme={theme}>
        <Alert variant="filled" severity="success">
          Filled alert
        </Alert>
      </ThemeProvider>
    );
    
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveClass('MuiAlert-filledSuccess');
  });
});
