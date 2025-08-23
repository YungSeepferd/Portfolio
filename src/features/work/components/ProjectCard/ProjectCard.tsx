import { memo } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, useTheme } from '@mui/material';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

/**
 * ProjectCard Component
 * 
 * Displays a project preview in a card format with an image, title, description,
 * and tags. Used in the project grid to show all available projects.
 */
const ProjectCard = memo(({ project, onClick }: ProjectCardProps) => {
  const theme = useTheme();

  return (
    <Card
      onClick={onClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: onClick ? 'pointer' : 'default',
        transition: theme.transitions.create(['transform', 'box-shadow']),
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4],
        } : {},
      }}
    >
      <CardMedia
        component="img"
        height={240}
        image={project.thumbnail}
        alt={`${project.title} thumbnail`}
        sx={{
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {project.description}
        </Typography>
        <Box sx={{ mt: 'auto', display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {project.tags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
