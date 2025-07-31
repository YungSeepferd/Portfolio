import React from 'react';
import { render, screen } from '@testing-library/react';
import Work from './Work';
import ThemeProvider from '../../context/ThemeContext';

jest.mock('../../hooks/useDataLoader', () => {
  return jest.fn(() => ({
    data: [
      {
        id: 'proj1',
        title: 'Sample Project',
        description: 'desc',
        categories: [],
        technologies: []
      }
    ],
    isLoading: false,
    error: null,
    reload: jest.fn()
  }));
});

test('renders project cards from loaded data', () => {
  render(
    <ThemeProvider>
      <Work />
    </ThemeProvider>
  );

  expect(screen.getByText('Sample Project')).toBeInTheDocument();
});
