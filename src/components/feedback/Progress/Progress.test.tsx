import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Progress } from './Progress';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// Declare Jest globals for TypeScript
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: any;

const theme = createTheme();

describe('Progress Component', () => {
  it('renders circular progress by default', () => {
    render(
      <ThemeProvider theme={theme}>
        <Progress value={50} />
      </ThemeProvider>
    );
    
    // CircularProgress should be in the document
    const circularProgress = document.querySelector('.MuiCircularProgress-root');
    expect(circularProgress).toBeInTheDocument();
  });
  
  it('renders linear progress when variant is linear', () => {
    render(
      <ThemeProvider theme={theme}>
        <Progress variant="linear" value={50} />
      </ThemeProvider>
    );
    
    // LinearProgress should be in the document
    const linearProgress = document.querySelector('.MuiLinearProgress-root');
    expect(linearProgress).toBeInTheDocument();
  });
  
  it('displays value as text when showValue is true', () => {
    render(
      <ThemeProvider theme={theme}>
        <Progress value={75} showValue={true} />
      </ThemeProvider>
    );
    
    const valueText = screen.getByText('75%');
    expect(valueText).toBeInTheDocument();
  });
  
  it('displays custom label when provided', () => {
    const labelText = 'Loading...';
    render(
      <ThemeProvider theme={theme}>
        <Progress value={30} label={labelText} />
      </ThemeProvider>
    );
    
    const label = screen.getByText(labelText);
    expect(label).toBeInTheDocument();
  });
  
  it('renders indeterminate circular progress when isIndeterminate is true', () => {
    render(
      <ThemeProvider theme={theme}>
        <Progress isIndeterminate={true} />
      </ThemeProvider>
    );
    
    const indeterminateProgress = document.querySelector('.MuiCircularProgress-indeterminate');
    expect(indeterminateProgress).toBeInTheDocument();
  });
  
  it('renders indeterminate linear progress when isIndeterminate is true and variant is linear', () => {
    render(
      <ThemeProvider theme={theme}>
        <Progress variant="linear" isIndeterminate={true} />
      </ThemeProvider>
    );
    
    const indeterminateLinearProgress = document.querySelector('.MuiLinearProgress-indeterminate');
    expect(indeterminateLinearProgress).toBeInTheDocument();
  });
});
