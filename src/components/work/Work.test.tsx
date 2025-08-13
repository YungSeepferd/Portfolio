import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ProjectData } from '../../types/project';
import useDataLoader from '../../hooks/use-data-loader';
import Work from './Work';
import { ThemeContext } from '../../context/theme-context';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../../theme';

// Mock the useDataLoader hook
vi.mock('../../hooks/useDataLoader');

describe('Work Component', () => {
  const mockProject: ProjectData = {
    id: 'proj1',
    title: 'Sample Project',
    description: 'desc',
    categories: [],
    technologies: [],
    media: [],
    links: [],
    date: new Date().toISOString(),
  };

  beforeEach(() => {
    (useDataLoader as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: [mockProject],
      isLoading: false,
      error: null,
      reload: vi.fn(),
    });
  });

  it('renders project cards from loaded data', () => {
    render(
      <ThemeContext.Provider
        value={{
          mode: 'dark',
          toggleTheme: vi.fn(),
          theme: darkTheme,
        }}
      >
        <Work />
      </ThemeContext.Provider>
    );

    expect(screen.getByText('Sample Project')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    (useDataLoader as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
      reload: vi.fn(),
    });

    render(
      <ThemeContext.Provider
        value={{
          mode: 'dark',
          toggleTheme: vi.fn(),
          theme: darkTheme,
        }}
      >
        <Work />
      </ThemeContext.Provider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows error message when loading fails', () => {
    const errorMessage = 'Network down';
    (useDataLoader as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: [],
      isLoading: false,
      error: new Error(errorMessage),
      reload: vi.fn(),
    });

    render(
      <ThemeProvider theme={lightTheme}>
        <Work />
      </ThemeProvider>
    );

    // Title of the error panel
    expect(screen.getByText('Error Loading Projects')).toBeInTheDocument();
    // The detailed error message is shown inside the panel
    expect(screen.getByText(new RegExp(errorMessage))).toBeInTheDocument();
  });
});
