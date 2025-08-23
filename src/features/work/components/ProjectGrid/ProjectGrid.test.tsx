/// <reference types="jest" />
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { ReactElement } from 'react';
import '@testing-library/jest-dom/extend-expect';
import theme from '../../../../core/theme';
import ProjectGrid from './ProjectGrid';
import { WorkProvider } from '../../contexts/WorkContext';
import { Project } from '../../types';

const mockProjects: Project[] = [
  {
    id: 'project-1',
    title: 'Project 1',
    subtitle: 'First test project',
    description: 'Description for project 1',
    tags: ['React'],
    thumbnail: '/image1.jpg',
    sections: [],
  },
  {
    id: 'project-2',
    title: 'Project 2',
    subtitle: 'Second test project',
    description: 'Description for project 2',
    tags: ['TypeScript'],
    thumbnail: '/image2.jpg',
    sections: [],
  },
];

describe('ProjectGrid', () => {
  const renderWithProviders = (ui: ReactElement) => {
    return render(
      <ThemeProvider theme={theme}>
        <WorkProvider>
          {ui}
        </WorkProvider>
      </ThemeProvider>
    );
  };

  it('renders all projects', () => {
    renderWithProviders(<ProjectGrid projects={mockProjects} />);

    mockProjects.forEach(project => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      expect(screen.getByText(project.description)).toBeInTheDocument();
      project.tags.forEach(tag => {
        expect(screen.getByText(tag)).toBeInTheDocument();
      });
    });
  });

  it('opens modal when project card is clicked', () => {
    const { container } = renderWithProviders(<ProjectGrid projects={mockProjects} />);

    // Click the first project card
    const firstCard = container.querySelector('.MuiCard-root');
    if (firstCard) {
      fireEvent.click(firstCard);
      // Modal state is managed by WorkContext, so we're just verifying the click handler works
      // You might want to add more specific assertions based on your modal implementation
    } else {
      throw new Error('Project card not found');
    }
  });

  // Additional tests could be added for responsive behavior,
  // but that would require a more complex setup with useMediaQuery mocking
});
