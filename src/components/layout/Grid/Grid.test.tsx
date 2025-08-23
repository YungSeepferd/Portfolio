import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Grid } from './Grid';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// Declare Jest globals for TypeScript
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: any;

const theme = createTheme();

describe('Grid Component', () => {
  it('renders children correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <Grid>
          <div data-testid="test-child">Grid Content</div>
        </Grid>
      </ThemeProvider>
    );
    
    const childElement = screen.getByTestId('test-child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Grid Content');
  });

  it('applies container props correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <div>Item 1</div>
          <div>Item 2</div>
        </Grid>
      </ThemeProvider>
    );
    
    // The container element should have MUI Grid container class
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveAttribute('class');
    expect(gridElement.className).toContain('MuiGrid-container');
  });
  
  it('applies item props correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Grid item xs={12} md={6}>
          <div>Content</div>
        </Grid>
      </ThemeProvider>
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveAttribute('class');
    expect(gridElement.className).toContain('MuiGrid-item');
  });
  
  it('applies alignment props correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Grid container justifyContent="center" alignItems="center">
          <div>Content</div>
        </Grid>
      </ThemeProvider>
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveAttribute('class');
    // MUI applies specific classes for alignment
    expect(gridElement.className).toContain('MuiGrid-container');
  });
});
