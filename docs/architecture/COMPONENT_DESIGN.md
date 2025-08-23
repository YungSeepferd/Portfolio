# Component Design System

This document outlines the component design principles and patterns used throughout the portfolio application. It serves as a guide for maintaining consistency in component development and usage.

## Component Structure

### Directory Structure

Components are organized in the following structure:

```typescript
src/components/
├── common/         // Reusable components across the application
├── features/       // Feature-specific components
│   ├── about/      // About section components
│   ├── contact/    // Contact section components
│   ├── hero/       // Hero section components
│   └── work/       // Work/portfolio components
└── layout/         // Layout components (header, footer, etc.)
```

### Component File Organization

Each component should follow this structure:

```typescript
// Imports
import React from 'react';
import { styled } from '@mui/material/styles';
import { ComponentProps } from '../../types';

// Types and interfaces
interface MyComponentProps extends ComponentProps {
  // Component-specific props
}

// Styled components
const StyledContainer = styled('div')(({ theme }) => ({
  // Theme-based styling
}));

// Component implementation
const MyComponent: React.FC<MyComponentProps> = ({ 
  children, 
  ...props 
}) => {
  // Component logic
  return (
    <StyledContainer {...props}>
      {children}
    </StyledContainer>
  );
};

export default MyComponent;
```

## Component Patterns

### Composition Pattern

Components should be designed for composition, enabling flexible and reusable UI elements:

```typescript
// Good practice
<Card>
  <CardHeader title="Title" />
  <CardContent>Content goes here</CardContent>
  <CardActions>
    <Button>Action</Button>
  </CardActions>
</Card>

// Instead of a monolithic component
<CompleteCard 
  title="Title" 
  content="Content goes here" 
  actionText="Action" 
/>
```

### Container/Presentation Pattern

Separate container components (with logic) from presentational components (UI only):

```typescript
// Container component
const ProjectContainer: React.FC = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    // Fetch projects
  }, []);
  
  return <ProjectList projects={projects} />;
};

// Presentation component
const ProjectList: React.FC<{projects: Project[]}> = ({ projects }) => (
  <Grid container>
    {projects.map(project => (
      <ProjectCard key={project.id} project={project} />
    ))}
  </Grid>
);
```

### Hooks for Logic

Extract complex logic into custom hooks:

```typescript
// Custom hook
const useProjectData = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Data fetching logic
  }, []);
  
  return { projects, loading, error };
};

// Component using the hook
const ProjectContainer = () => {
  const { projects, loading, error } = useProjectData();
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <ProjectList projects={projects} />;
};
```

## Component Types

### Layout Components

Components that define the structure of the page:

- `Header`: Main navigation and branding
- `Footer`: Site footer with links and information
- `PageLayout`: General page layout structure

### Feature Components

Components specific to application features:

- `Hero`: Main landing section
- `WorkGrid`: Portfolio project display
- `AboutSection`: Information about the person/company
- `ContactForm`: User contact interface

### Common Components

Reusable UI components:

- `ActionButton`: Styled buttons for common actions
- `ContentAwareImage`: Intelligently displayed images
- `ErrorBoundary`: Error handling wrapper
- `ThemedCard`: Styled card component

## Component Properties

### Required Properties

All components should accept these basic props:

```typescript
interface ComponentProps {
  className?: string;         // For external styling
  style?: React.CSSProperties; // For inline styles
  id?: string;                // For identification/anchors
  [key: string]: any;         // For additional HTML attributes
}
```

### Component Composition

Components should support composition through `children`:

```typescript
interface ComposableProps extends ComponentProps {
  children: React.ReactNode;
}
```

## Style Integration

### Theme Usage

Components should use the theme for styling:

```typescript
const StyledComponent = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));
```

### Responsive Design

Components should adapt to different screen sizes:

```typescript
const ResponsiveComponent = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(3),
  },
}));
```

## Best Practices

1. **Keep components focused**: Each component should do one thing well
2. **Favor composition**: Use composition over complex props
3. **Use TypeScript**: Define clear interfaces for component props
4. **Theme integration**: Use theme variables instead of hardcoded values
5. **Accessibility**: Ensure components are accessible (ARIA attributes, keyboard navigation)
6. **Testing**: Write tests for component functionality
7. **Performance**: Optimize rendering with React.memo, useMemo, useCallback when appropriate
