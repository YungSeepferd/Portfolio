import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TechBar from '../TechBar';

// Mock TechnologyTags to capture forwarded props
jest.mock('../TechnologyTags', () => {
  return function MockTechnologyTags(props) {
    // expose props for assertions without referencing out-of-scope vars
    globalThis.__lastTechTagsProps = props;
    return <div data-testid="tech-tags-mock" />;
  };
});

function renderWithTheme(ui) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  const theme = createTheme();
  act(() => {
    root.render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  });
  return { container, unmount: () => root.unmount() };
}

describe('TechBar', () => {
  beforeEach(() => {
    globalThis.__lastTechTagsProps = undefined;
  });

  test('returns null when technologies is empty', () => {
    const { container, unmount } = renderWithTheme(<TechBar technologies={[]} />);
    expect(container.innerHTML).toBe('');
    unmount();
  });

  test('forwards props to TechnologyTags', () => {
    const technologies = ['Figma', 'GitHub'];
    const props = { variant: 'hover', size: 'medium', sx: { mt: 1 }, 'data-x': 'y' };
    const { unmount } = renderWithTheme(
      <TechBar technologies={technologies} {...props} />
    );
    const captured = globalThis.__lastTechTagsProps;
    expect(captured).toBeTruthy();
    expect(captured.technologies).toEqual(technologies);
    expect(captured.variant).toBe('hover');
    expect(captured.size).toBe('medium');
    expect(captured.sx).toEqual({ mt: 1 });
    // ensure arbitrary props are forwarded as well
    expect(captured['data-x']).toBe('y');
    unmount();
  });
});
