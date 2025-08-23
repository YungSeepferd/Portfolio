# Testing Strategy & Documentation

This document outlines the testing approach, tools, and best practices used in the portfolio project.

## Testing Approach

This project uses a comprehensive testing approach with multiple layers:

1. **Unit Tests**: Testing individual components and functions in isolation
2. **Integration Tests**: Testing interactions between components
3. **Visual Regression Tests**: Ensuring UI appearance remains consistent
4. **End-to-End Tests**: Testing complete user flows and scenarios
5. **Accessibility Tests**: Ensuring the application meets accessibility standards

## Test Tools & Libraries

- **Vitest**: Fast unit testing framework integrated with Vite
- **React Testing Library**: Testing React components in a user-centric way
- **Playwright**: End-to-end testing framework
- **Storybook**: Component development and visual testing
- **axe-core**: Accessibility testing

## Running Tests

### Unit and Integration Tests

```bash
# Run all unit and integration tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### End-to-End Tests

```bash
# Run end-to-end tests
npm run e2e

# Run specific e2e test
npm run e2e -- --test=login.spec.ts

# Open Playwright UI
npm run e2e:ui
```

### Visual Tests

```bash
# Run visual regression tests
npm run test:visual
```

### Accessibility Tests

```bash
# Run accessibility tests
npm run test:a11y
```

## Test Organization

- **Unit Tests**: Located alongside their implementation files with `.test.ts` suffix
- **Integration Tests**: Located in `src/tests/integration/`
- **E2E Tests**: Located in `e2e/` directory
- **Visual Tests**: Located in `src/tests/visual/`
- **Accessibility Tests**: Located in `src/tests/a11y/`

## Writing Tests

### Component Test Example

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### E2E Test Example

```ts
import { test, expect } from '@playwright/test';

test('basic navigation flow', async ({ page }) => {
  // Start at homepage
  await page.goto('/');
  
  // Navigate to projects
  await page.click('text=Projects');
  await expect(page).toHaveURL('/projects');
  
  // Check if project cards are visible
  expect(await page.locator('.project-card').count()).toBeGreaterThan(0);
});
```

## Mocking Dependencies

- Use Vitest's mocking capabilities for unit tests
- Use MSW (Mock Service Worker) for API mocking in integration tests
- Use test fixtures for consistent test data

## Continuous Integration

Tests run automatically on:

- Pull requests to main branch
- Direct commits to main branch
- Nightly builds

Failed tests block merging to ensure code quality.

## Testing Standards

- Each new feature should have appropriate tests
- Bug fixes should include regression tests
- Aim for 80%+ code coverage for critical paths
- End-to-end tests should cover core user journeys
- All components should have accessibility tests
