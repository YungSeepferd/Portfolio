/// <reference types="jest" />
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { ReactElement } from 'react';
import '@testing-library/jest-dom/extend-expect';
import theme from '../../../core/theme';
import ContentContainer from './index';

/** @jest-environment jsdom */

jest.mock('../../../core/theme', () => ({
  __esModule: true,
  default: {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  },
}));

describe('ContentContainer', () => {
  const renderWithTheme = (ui: ReactElement) => {
    return render(
      <ThemeProvider theme={theme}>
        {ui}
      </ThemeProvider>
    );
  };

  it('renders children correctly', () => {
    const testText = 'Test Content';
    renderWithTheme(
      <ContentContainer>
        <div>{testText}</div>
      </ContentContainer>
    );

    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('applies maxWidth prop correctly', () => {
    const { container } = renderWithTheme(
      <ContentContainer maxWidth="sm">
        <div>Content</div>
      </ContentContainer>
    );

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle({
      maxWidth: `${theme.breakpoints.values.sm}px`,
    });
  });

  it('accepts custom component prop', () => {
    renderWithTheme(
      <ContentContainer component="section">
        <div>Content</div>
      </ContentContainer>
    );

    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('applies custom sx prop correctly', () => {
    const customBgColor = '#ff0000';
    const { container } = renderWithTheme(
      <ContentContainer sx={{ bgcolor: customBgColor }}>
        <div>Content</div>
      </ContentContainer>
    );

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle({
      backgroundColor: customBgColor,
    });
  });
});
