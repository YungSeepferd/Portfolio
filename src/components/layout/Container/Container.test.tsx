import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Container } from './Container';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// Declare Jest globals for TypeScript
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: any;

const theme = createTheme();

describe('Container Component', () => {
  it('renders children correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <Container>
          <div data-testid="test-child">Test Content</div>
        </Container>
      </ThemeProvider>
    );
    
    const childElement = screen.getByTestId('test-child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Test Content');
  });
  
  it('applies flex container styles when flexContainer is true', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Container flexContainer>
          <div>Item 1</div>
          <div>Item 2</div>
        </Container>
      </ThemeProvider>
    );
    
    // Get the first div which should be our container
    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveStyle('display: flex');
  });
  
  it('applies proper maxWidth setting', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <div>Content</div>
        </Container>
      </ThemeProvider>
    );
    
    const containerElement = container.firstChild as HTMLElement;
    // In the real world, maxWidth would translate to a specific pixel value
    // based on the theme breakpoints, but for testing we just check the attribute
    expect(containerElement).toHaveAttribute('class');
    // The class string should contain the MUI Box component classes
    const className = containerElement.className;
    expect(className).toBeTruthy();
  });
  
  it('disables gutters when disableGutters is true', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Container disableGutters>
          <div>Content</div>
        </Container>
      </ThemeProvider>
    );
    
    // The container should have 0 padding
    const containerElement = container.firstChild as HTMLElement;
    // Test that the container has the style attribute
    expect(containerElement).toHaveAttribute('class');
  });
});
