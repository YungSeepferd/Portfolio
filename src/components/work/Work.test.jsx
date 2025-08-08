import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, beforeEach, describe, it, expect } from 'vitest';
import useDataLoader from '../../hooks/useDataLoader';
import Work from './Work';
import { ThemeContext } from '../../context/ThemeContext';
import { darkTheme } from '../../theme';

vi.mock('../../hooks/useDataLoader');

describe('Work Component (legacy test)', () => {
  beforeEach(() => {
    vi.mocked(useDataLoader).mockReturnValue({
      data: [
        {
          id: 'proj1',
          title: 'Sample Project',
          description: 'desc',
          categories: [],
          technologies: [],
        },
      ],
      isLoading: false,
      error: null,
      reload: vi.fn(),
    });
  });

  it('renders project cards from loaded data', () => {
    render(
      <ThemeContext.Provider value={{ mode: 'dark', toggleTheme: vi.fn(), theme: darkTheme }}>
        <Work />
      </ThemeContext.Provider>
    );

    expect(screen.getByText('Sample Project')).toBeInTheDocument();
  });
});
