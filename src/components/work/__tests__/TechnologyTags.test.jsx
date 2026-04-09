import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TechnologyTags from '../TechnologyTags';

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

describe('TechnologyTags', () => {
  test('returns null when technologies is empty', () => {
    const { container, unmount } = renderWithTheme(<TechnologyTags technologies={[]} />);
    expect(container.innerHTML).toBe('');
    unmount();
  });

  test('renders labels for string and object technologies', () => {
    const technologies = ['Figma', { name: 'GitHub' }, 'UnknownTech'];
    const { container, unmount } = renderWithTheme(
      <TechnologyTags technologies={technologies} />
    );
    const labels = Array.from(container.querySelectorAll('.MuiChip-label')).map((el) => el.textContent);
    expect(labels).toEqual(expect.arrayContaining(['Figma', 'GitHub', 'UnknownTech']));
    unmount();
  });

  test('showHierarchy highlights first chip as filled primary', () => {
    const technologies = ['Figma', 'GitHub', 'HTML'];
    const { container, unmount } = renderWithTheme(
      <TechnologyTags technologies={technologies} showHierarchy />
    );
    const chips = container.querySelectorAll('.MuiChip-root');
    expect(chips.length).toBe(3);
    // First chip should have filled primary styles
    const firstChip = chips[0];
    const className = firstChip.getAttribute('class') || '';
    expect(className).toMatch(/MuiChip-filled/);
    expect(className).toMatch(/MuiChip-colorPrimary|MuiChip-filledPrimary/);
    unmount();
  });

  test('hover variant compacts chip size when 4+ technologies', () => {
    const technologies = ['A', 'B', 'C', 'D'];
    const { container, unmount } = renderWithTheme(
      <TechnologyTags technologies={technologies} variant="hover" />
    );
    const chips = container.querySelectorAll('.MuiChip-root');
    expect(chips.length).toBe(4);
    // Chips should be rendered as small when compacting is enabled
    Array.from(chips).forEach((chip) => {
      const className = chip.getAttribute('class') || '';
      expect(className).toMatch(/MuiChip-sizeSmall/);
    });
    unmount();
  });
});
