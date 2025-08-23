import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Section } from './Section';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// Declare Jest globals for TypeScript
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: any;

const theme = createTheme();

describe('Section Component', () => {
  it('renders children correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <Section>
          <div data-testid="test-child">Section Content</div>
        </Section>
      </ThemeProvider>
    );
    
    const childElement = screen.getByTestId('test-child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Section Content');
  });

  it('applies id attribute correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Section id="test-section">
          <div>Content</div>
        </Section>
      </ThemeProvider>
    );
    
    const sectionElement = container.firstChild as HTMLElement;
    expect(sectionElement).toHaveAttribute('id', 'test-section');
  });
  
  it('applies full height style when fullHeight is true', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Section fullHeight>
          <div>Content</div>
        </Section>
      </ThemeProvider>
    );
    
    const sectionElement = container.firstChild as HTMLElement;
    expect(sectionElement).toHaveStyle('height: 100vh');
  });
  
  it('applies background color correctly', () => {
    const testColor = '#f5f5f5';
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Section backgroundColor={testColor}>
          <div>Content</div>
        </Section>
      </ThemeProvider>
    );
    
    const sectionElement = container.firstChild as HTMLElement;
    expect(sectionElement).toHaveStyle(`background-color: ${testColor}`);
  });
});
