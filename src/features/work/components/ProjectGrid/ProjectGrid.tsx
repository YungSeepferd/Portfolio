import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useCallback } from 'react';
import { Project } from '../../types';
import ProjectCard from '../ProjectCard/ProjectCard';
import { useWork } from '../../contexts/WorkContext';

interface ProjectGridProps {
  projects: Project[];
}

/**
 * ProjectGrid Component
 * 
 * Displays a responsive grid of project cards. Handles project selection and
 * modal interactions through the WorkContext.
 */
const ProjectGrid = ({ projects }: ProjectGridProps) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  const { openModal } = useWork();

  const getGridColumns = useCallback(() => {
    if (isSmall) return 12;
    if (isMedium) return 6;
    return 4;
  }, [isSmall, isMedium]);

  return (
    <Grid container spacing={3}>
      {projects.map(project => (
        <Grid item xs={getGridColumns()} key={project.id}>
          <ProjectCard
            project={project}
            onClick={() => openModal(project)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectGrid;
