/// <reference types="jest" />
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import '@testing-library/jest-dom/extend-expect';
import { ReactElement } from 'react';
import theme from '../../../../core/theme';
import ProjectCard from './ProjectCard';
import { Project } from '../../types';

const mockProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  subtitle: 'A test project',
  description: 'This is a test project description',
  tags: ['React', 'TypeScript'],
  thumbnail: '/test-image.jpg',
  sections: [],
};

describe('ProjectCard', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(
      <ThemeProvider theme={theme}>
        {ui}
      </ThemeProvider>
    );
  };

  it('renders project information correctly', () => {
    renderWithTheme(<ProjectCard project={mockProject} />);

    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
    mockProject.tags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });

    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image).toHaveAttribute('src', mockProject.thumbnail);
    expect(image).toHaveAttribute('alt', `${mockProject.title} thumbnail`);
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    renderWithTheme(<ProjectCard project={mockProject} onClick={handleClick} />);

    fireEvent.click(screen.getByRole('article'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies hover styles when onClick is provided', () => {
    const { container } = renderWithTheme(
      <ProjectCard project={mockProject} onClick={() => {}} />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveStyle({
      cursor: 'pointer',
    });
  });

  it('does not apply hover styles when onClick is not provided', () => {
    const { container } = renderWithTheme(
      <ProjectCard project={mockProject} />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveStyle({
      cursor: 'default',
    });
  });
});
