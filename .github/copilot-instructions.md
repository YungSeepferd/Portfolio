# Portfolio Project - AI Agent Guidelines

## Project Overview

This is a React-based portfolio project with TypeScript, utilizing Material UI and React Three Fiber for 3D visualizations. It features responsive design, interactive 3D backgrounds, and accessibility-first development.

## Architecture & Structure

- **Component-Based Architecture**: UI built with reusable, composable components
- **Feature-Based Organization**: Components are organized by feature/domain
- **Directory Structure**:
  ```
  src/
  ├── assets/         # Static assets (images, fonts)
  ├── components/     # React components grouped by feature
  │   ├── common/     # Shared components
  │   ├── features/   # Feature-specific components (hero, work, about, contact)
  │   └── layout/     # Layout components (header, footer)
  ├── context/        # React Context providers
  │   ├── theme-context.tsx       # Theme management
  │   ├── modal-context.tsx       # Modal state management
  │   └── accessibility-context.tsx # Accessibility preferences
  ├── hooks/          # Custom React hooks
  │   ├── common/     # General purpose hooks
  │   ├── media/      # Media-related hooks
  │   └── audio/      # Audio processing hooks
  ├── utils/          # Utility functions
  ├── visualization/  # 3D visualization system
  │   ├── components/ # 3D components
  │   ├── contexts/   # 3D-specific contexts
  │   ├── hooks/      # 3D-specific hooks
  │   └── scenes/     # Scene definitions
  └── pages/          # Page-level components
  ```

## Key Technologies & Patterns

- **React + TypeScript**: Functional components with TypeScript interfaces
- **Material UI (MUI)**: For UI components and theming
- **React Three Fiber**: For 3D scene visualizations (located in `src/visualization/`)
- **Context API**: For global state management
- **Custom Hooks**: For reusable functionality
- **Vite**: As the build system

## Development Workflows

### Development Commands

```bash
# Start development server
npm run dev

# Run tests
npm test
npm run test:e2e   # End-to-end tests
npm run test:visual # Visual regression tests

# Lint code
npm run lint
npm run lint:fix   # Fix linting issues

# Type checking
npm run type-check

# Build for production
npm run build
```

### Testing Strategy

- Use Vitest for unit/integration tests (`*.test.tsx` files)
- Use Playwright for E2E tests (in `e2e/` directory)
- Always write tests for new components/features

## Code Conventions

1. **Component Structure**:
   - Use functional components with hooks
   - Export component as default
   - Define interfaces/types for props

   ```tsx
   // src/components/features/work/project-card.tsx
   interface ProjectCardProps {
     title: string;
     description: string;
     image?: string;
     onClick?: () => void;
   }

   const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image, onClick }) => {
     // Component logic
     return (
       <Card onClick={onClick}>
         {/* Component content */}
       </Card>
     );
   };

   export default ProjectCard;
   ```

2. **Naming Conventions**:
   - Components use **PascalCase** (e.g., `ProjectCard`)
   - Files use **kebab-case** (e.g., `project-card.tsx`)
   - Hooks are prefixed with `use` (e.g., `useMediaQuery`)

3. **Styling**:
   - Use MUI's styling system (styled API)
   - Access theme values for consistency
   - Support both light and dark themes

4. **Context Usage**:
   - Access theme with `useThemeMode()`
   - Access modal state with `useModalContext()`
   - Access accessibility preferences with `useAccessibility()`
   - Access 3D scene settings with `useSceneContext()`

## Special Subsystems

### 3D Visualization System

- Located in `src/visualization/`
- Uses React Three Fiber (R3F) for Three.js integration
- Scene context manages active scenes and performance settings
- BaseScene component handles common 3D setup
- Follow performance best practices (instancing, LOD)

### Accessibility System

- Accessibility context manages user preferences
- Support reduced motion, high contrast, and text size
- Always use semantic HTML and proper ARIA attributes
- Ensure keyboard navigation works for all interactive elements

## Common Pitfalls & Solutions

- **Theme Integration**: Always use theme context for colors/styles; avoid hardcoded values
- **Modal Management**: Use modal context for managing modals instead of local state
- **Media Handling**: Use unified media utilities for consistent image/video handling
- **3D Performance**: Monitor performance and use appropriate LOD based on device capabilities

## Ongoing Refactoring

The codebase is undergoing restructuring with these changes:
- Moving components to feature-based directories
- Consolidating utility functions
- Creating a unified 3D visualization architecture
- Implementing proper context providers for visualization and accessibility

When making changes, check `src/docs/NextSteps.md` for the current refactoring status and align your changes with the ongoing restructuring effort.
