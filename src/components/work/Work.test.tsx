import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectData } from '../../types/project';
import useDataLoader from '../../hooks/useDataLoader';
import Work from './Work';
import { ThemeProvider } from '../../context/ThemeContext';

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
      <ThemeProvider>
        <Work />
      </ThemeProvider>
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
      <ThemeProvider>
        <Work />
      </ThemeProvider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows error message when loading fails', () => {
    const errorMessage = 'Failed to load projects';
    (useDataLoader as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: [],
      isLoading: false,
      error: new Error(errorMessage),
      reload: vi.fn(),
    });

    render(
      <ThemeProvider>
        <Work />
      </ThemeProvider>
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
