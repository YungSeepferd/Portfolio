# Testing Guidelines and Patterns

## Overview

This document outlines testing patterns, conventions, and best practices for the Portfolio project.

## Test Types

### 1. Unit Tests
- Located in `__tests__` directories next to the components/modules they test
- Follow naming convention: `*.test.tsx` for component tests, `*.test.ts` for utility tests
- Use React Testing Library for component testing
- Mock external dependencies

### 2. Integration Tests
- Located in `src/tests/integration`
- Test interactions between multiple components
- Focus on user workflows and feature interactions

### 3. E2E Tests
- Located in `e2e` directory
- Use Playwright for browser-based testing
- Cover critical user paths and workflows

### 4. Visual Regression Tests
- Located in `src/tests/visual`
- Use Playwright for screenshot comparison
- Track UI changes across components

### 5. Performance Tests
- Located in `src/tests/performance`
- Measure load times and rendering performance
- Track bundle sizes and runtime metrics

## Test Patterns

### Component Testing Pattern
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ComponentName', () => {
  // Setup/Teardown
  beforeEach(() => {
    // Common setup
  });

  // Rendering tests
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  // Interaction tests
  it('handles user interactions', async () => {
    const user = userEvent.setup();
    render(<Component />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Clicked')).toBeInTheDocument();
  });

  // State tests
  it('manages state correctly', () => {
    // Test state changes
  });

  // Error tests
  it('handles errors appropriately', () => {
    // Test error conditions
  });
});
```

### Integration Testing Pattern
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Feature: User Authentication', () => {
  describe('Scenario: User Login', () => {
    it('allows user to log in successfully', async () => {
      const user = userEvent.setup();
      render(<LoginFlow />);
      
      await user.type(screen.getByLabelText(/email/i), 'user@example.com');
      await user.type(screen.getByLabelText(/password/i), 'password123');
      await user.click(screen.getByRole('button', { name: /login/i }));
      
      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });
  });
});
```

## Best Practices

1. **Arrange-Act-Assert**
   - Clearly separate test setup, actions, and assertions
   - Use descriptive test names that explain the scenario

2. **Testing Library Queries**
   - Prefer queries that reflect how users interact with your app
   - Priority order: getByRole > getByLabelText > getByText > getByTestId

3. **Mocking**
   - Mock external dependencies but not the component under test
   - Use msw for API mocking
   - Keep mocks close to the tests that use them

4. **Test Coverage**
   - Aim for 80% coverage for critical paths
   - Focus on behavior coverage over line coverage
   - Include edge cases and error scenarios

5. **Accessibility Testing**
   - Include axe-core checks in component tests
   - Test keyboard navigation
   - Verify ARIA attributes and roles

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test path/to/test

# Run tests in watch mode
npm test:watch

# Run E2E tests
npm run test:e2e

# Run visual regression tests
npm run test:visual

# Generate coverage report
npm run test:coverage
```

## CI/CD Integration

Tests are run in the CI pipeline on:
- Pull requests to main branch
- Push to main branch
- Nightly builds for performance tests

### Monitoring and Metrics

- Test execution times are tracked in CI
- Flaky tests are detected and reported
- Coverage trends are monitored over time
- Visual regression changes require manual approval
