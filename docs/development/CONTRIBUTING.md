# Contributing to Portfolio Project

Thank you for your interest in contributing to this portfolio project! This document provides guidelines and instructions for contributors.

## Development Environment Setup

### Prerequisites

- Node.js (v16 or later)
- npm (v7 or later)
- Git

### Local Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/YungSeepferd/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run unit and integration tests
- `npm run test:e2e` - Run end-to-end tests with Playwright
- `npm run test:visual` - Run visual regression tests
- `npm run test:a11y` - Run accessibility tests
- `npm run test:perf` - Run performance tests
- `npm run test:coverage` - Run tests with coverage reporting

## Project Structure

```text
src/
├── assets/         # Static assets (images, fonts, etc.)
├── components/     # React components grouped by feature
├── config/         # Configuration files and constants
├── context/        # React Context providers
├── hooks/          # Custom React hooks
├── pages/          # Page-level components
├── schemas/        # Data validation schemas
├── theme/          # Theme configuration and design tokens
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Branching Strategy

- `main` - Stable production code
- `develop` - Integration branch for feature development
- `feature/*` - Feature branches (e.g., `feature/new-project-card`)
- `fix/*` - Bug fix branches (e.g., `fix/header-responsive`)
- `refactor/*` - Code refactoring branches

## Pull Request Process

1. Create a branch from `develop` with an appropriate prefix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes, following the code style guidelines

3. Write or update tests for your changes

4. Ensure all tests pass:

   ```bash
   npm run test
   npm run lint
   ```

5. Commit your changes using conventional commit messages:

   ```bash
   git commit -m "feat: add new project card component"
   ```

6. Push your branch and create a pull request to `develop`

7. Wait for code review and address any feedback

## Code Style Guidelines

This project follows specific code style guidelines to maintain consistency:

### TypeScript / JavaScript

- Use TypeScript for new components and features
- Follow the ESLint configuration
- Use functional components with hooks
- Use arrow functions for component definitions
- Destructure props in function parameters

Example:

```typescript
interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => {
  return <div onClick={onClick}>{title}</div>;
};
```

### Component Structure

- One component per file
- Export component as default
- Use named exports for utilities
- Place styled components above the main component
- Group imports by type (React, external libraries, internal)

### Styling

- Use MUI styled API for component styling
- Use theme values instead of hardcoded values
- Follow responsive design patterns
- Keep styling co-located with components

### Testing

- Write tests for all components
- Test both rendering and functionality
- Mock external dependencies
- Use React Testing Library for component testing

## Documentation

- Update documentation when changing functionality
- Document components with JSDoc comments
- Keep the README.md updated with setup and usage instructions
- Update the design system documentation when adding new component patterns

## Accessibility

- Ensure all components are keyboard navigable
- Use semantic HTML elements
- Add appropriate ARIA attributes
- Support screen readers with proper labeling
- Test with accessibility tools (axe)

## Performance Considerations

- Use React.memo for pure components that render often
- Optimize re-renders with useMemo and useCallback
- Lazy load components and assets where appropriate
- Monitor bundle size impact of new dependencies

## Questions and Communication

If you have questions about the codebase or need help, please:

1. Check existing documentation first
2. Open an issue for discussion
3. Comment on the relevant PR or issue for context-specific questions

Thank you for contributing!
