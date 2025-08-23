# Component Template Guide

This guide provides templates and patterns for creating components following the new project structure. Use these examples as a reference when creating or migrating components.

## Basic Component Template

### Directory Structure

```plaintext
ComponentName/
├── ComponentName.tsx       # Main component implementation
├── ComponentName.test.tsx  # Component tests
├── ComponentName.styles.ts # Component styles (if using styled-components or MUI styled)
└── index.ts                # Barrel export
```

### Component Implementation (ComponentName.tsx)

```tsx
import React from 'react';
import { SomeProps } from '../../types'; // Import types from feature types directory
import { StyledContainer, StyledContent } from './ComponentName.styles';

// Define the component props interface
export interface ComponentNameProps {
  /**
   * Primary content of the component
   */
  children?: React.ReactNode;
  
  /**
   * Optional className for styling
   */
  className?: string;
  
  /**
   * Variant of the component
   */
  variant?: 'default' | 'primary' | 'secondary';
  
  /**
   * Callback fired when the component is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  // Additional props...
}

/**
 * ComponentName - Description of what this component does
 * 
 * @example
 * ```tsx
 * <ComponentName variant="primary">Content</ComponentName>
 * ```
 */
const ComponentName: React.FC<ComponentNameProps> = ({
  children,
  className,
  variant = 'default',
  onClick,
  ...rest
}) => {
  // Component logic here
  
  return (
    <StyledContainer 
      className={className} 
      variant={variant}
      onClick={onClick}
      {...rest}
    >
      <StyledContent>
        {children}
      </StyledContent>
    </StyledContainer>
  );
};

export default ComponentName;
```

### Component Styles (ComponentName.styles.ts)

```tsx
import { styled } from '@mui/material/styles';

// Define the type for styled component props
interface StyledContainerProps {
  variant?: 'default' | 'primary' | 'secondary';
}

export const StyledContainer = styled('div')<StyledContainerProps>(
  ({ theme, variant = 'default' }) => ({
    display: 'flex',
    padding: theme.spacing(2),
    backgroundColor: 
      variant === 'primary' 
        ? theme.palette.primary.main 
        : variant === 'secondary' 
          ? theme.palette.secondary.main 
          : theme.palette.background.paper,
    color: 
      variant === 'primary' || variant === 'secondary'
        ? theme.palette.getContrastText(
            variant === 'primary' 
              ? theme.palette.primary.main 
              : theme.palette.secondary.main
          )
        : theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['background-color', 'color'], {
      duration: theme.transitions.duration.short,
    }),
  })
);

export const StyledContent = styled('div')(({ theme }) => ({
  flex: '1 1 auto',
}));
```

### Component Tests (ComponentName.test.tsx)

```tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme'; // Adjust the import path as needed
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  it('renders children correctly', () => {
    renderWithTheme(<ComponentName>Test Content</ComponentName>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies the correct styles based on variant', () => {
    const { rerender } = renderWithTheme(
      <ComponentName data-testid="component">Default</ComponentName>
    );
    
    const component = screen.getByTestId('component');
    
    // Test default variant
    expect(component).toHaveStyle({
      backgroundColor: expect.any(String),
    });
    
    // Test primary variant
    rerender(
      <ThemeProvider theme={theme}>
        <ComponentName data-testid="component" variant="primary">
          Primary
        </ComponentName>
      </ThemeProvider>
    );
    
    expect(component).toHaveStyle({
      backgroundColor: expect.any(String),
    });
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <ComponentName onClick={handleClick}>Clickable</ComponentName>
    );
    
    fireEvent.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Barrel Export (index.ts)

```tsx
export { default } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

## Feature Component Template

For components that are part of a specific feature:

```plaintext
src/
└── features/
    └── feature-name/
        └── components/
            └── FeatureComponent/
                ├── FeatureComponent.tsx
                ├── FeatureComponent.test.tsx
                ├── FeatureComponent.styles.ts
                └── index.ts
```

## Context Provider Template

For context providers:

```plaintext
src/
└── contexts/
    └── FeatureContext/
        ├── FeatureContext.tsx
        ├── FeatureContext.test.tsx
        └── index.ts
```

### Context Implementation (FeatureContext.tsx)

```tsx
import React, { createContext, useContext, useState, useCallback } from 'react';

// Define the context state type
interface FeatureContextState {
  isEnabled: boolean;
  value: string;
}

// Define the context value type including state and actions
interface FeatureContextValue {
  // State
  isEnabled: boolean;
  value: string;
  
  // Actions
  enable: () => void;
  disable: () => void;
  setValue: (newValue: string) => void;
}

// Create context with initial default value
const FeatureContext = createContext<FeatureContextValue | undefined>(undefined);

// Provider props interface
interface FeatureProviderProps {
  children: React.ReactNode;
  initialValue?: string;
  initialEnabled?: boolean;
}

// Create the provider component
export const FeatureProvider: React.FC<FeatureProviderProps> = ({
  children,
  initialValue = '',
  initialEnabled = false,
}) => {
  const [state, setState] = useState<FeatureContextState>({
    isEnabled: initialEnabled,
    value: initialValue,
  });
  
  // Define actions as callbacks
  const enable = useCallback(() => {
    setState(prev => ({ ...prev, isEnabled: true }));
  }, []);
  
  const disable = useCallback(() => {
    setState(prev => ({ ...prev, isEnabled: false }));
  }, []);
  
  const setValue = useCallback((newValue: string) => {
    setState(prev => ({ ...prev, value: newValue }));
  }, []);
  
  // Create the context value
  const contextValue: FeatureContextValue = {
    // State
    isEnabled: state.isEnabled,
    value: state.value,
    
    // Actions
    enable,
    disable,
    setValue,
  };
  
  return (
    <FeatureContext.Provider value={contextValue}>
      {children}
    </FeatureContext.Provider>
  );
};

// Create a custom hook for using this context
export const useFeature = (): FeatureContextValue => {
  const context = useContext(FeatureContext);
  if (context === undefined) {
    throw new Error('useFeature must be used within a FeatureProvider');
  }
  return context;
};

export default FeatureContext;
```

### Context Tests (FeatureContext.test.tsx)

```tsx
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { FeatureProvider, useFeature } from './FeatureContext';

// Create a test component that uses the context
const TestComponent: React.FC = () => {
  const { isEnabled, value, enable, disable, setValue } = useFeature();
  
  return (
    <div>
      <div data-testid="status">{isEnabled ? 'Enabled' : 'Disabled'}</div>
      <div data-testid="value">{value}</div>
      <button onClick={enable} data-testid="enable">Enable</button>
      <button onClick={disable} data-testid="disable">Disable</button>
      <button onClick={() => setValue('New Value')} data-testid="setValue">
        Set Value
      </button>
    </div>
  );
};

describe('FeatureContext', () => {
  it('provides initial context values', () => {
    render(
      <FeatureProvider initialEnabled={true} initialValue="Initial Value">
        <TestComponent />
      </FeatureProvider>
    );
    
    expect(screen.getByTestId('status')).toHaveTextContent('Enabled');
    expect(screen.getByTestId('value')).toHaveTextContent('Initial Value');
  });
  
  it('enables the feature when enable is called', () => {
    render(
      <FeatureProvider initialEnabled={false}>
        <TestComponent />
      </FeatureProvider>
    );
    
    expect(screen.getByTestId('status')).toHaveTextContent('Disabled');
    
    act(() => {
      screen.getByTestId('enable').click();
    });
    
    expect(screen.getByTestId('status')).toHaveTextContent('Enabled');
  });
  
  it('disables the feature when disable is called', () => {
    render(
      <FeatureProvider initialEnabled={true}>
        <TestComponent />
      </FeatureProvider>
    );
    
    expect(screen.getByTestId('status')).toHaveTextContent('Enabled');
    
    act(() => {
      screen.getByTestId('disable').click();
    });
    
    expect(screen.getByTestId('status')).toHaveTextContent('Disabled');
  });
  
  it('updates the value when setValue is called', () => {
    render(
      <FeatureProvider initialValue="Initial Value">
        <TestComponent />
      </FeatureProvider>
    );
    
    expect(screen.getByTestId('value')).toHaveTextContent('Initial Value');
    
    act(() => {
      screen.getByTestId('setValue').click();
    });
    
    expect(screen.getByTestId('value')).toHaveTextContent('New Value');
  });
  
  it('throws an error when useFeature is used outside of FeatureProvider', () => {
    // Suppress error output for this test
    const consoleSpy = jest.spyOn(console, 'error');
    consoleSpy.mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useFeature must be used within a FeatureProvider');
    
    consoleSpy.mockRestore();
  });
});
```

### Context Barrel Export (index.ts)

```tsx
export { default } from './FeatureContext';
export { FeatureProvider, useFeature } from './FeatureContext';
```

## Hook Template

For custom hooks:

```plaintext
src/
└── hooks/
    └── category/
        └── useFeature.ts
```

### Hook Implementation (useFeature.ts)

```tsx
import { useState, useCallback, useEffect } from 'react';

// Define the hook parameters interface
interface UseFeatureParams {
  initialValue?: string;
  onChange?: (value: string) => void;
}

// Define the hook return type
interface UseFeatureResult {
  value: string;
  isLoading: boolean;
  error: Error | null;
  setValue: (newValue: string) => void;
  reset: () => void;
}

/**
 * useFeature - Hook description and purpose
 *
 * @param {UseFeatureParams} params - The hook parameters
 * @returns {UseFeatureResult} The hook result object
 *
 * @example
 * ```tsx
 * const { value, isLoading, error, setValue, reset } = useFeature({
 *   initialValue: 'initial',
 *   onChange: (newValue) => console.log(newValue)
 * });
 * ```
 */
export function useFeature({
  initialValue = '',
  onChange,
}: UseFeatureParams = {}): UseFeatureResult {
  const [value, setValueState] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Example of using useCallback for memoized functions
  const setValue = useCallback((newValue: string) => {
    setValueState(newValue);
    if (onChange) {
      onChange(newValue);
    }
  }, [onChange]);
  
  const reset = useCallback(() => {
    setValueState(initialValue);
    setError(null);
  }, [initialValue]);
  
  // Example of an effect that runs when dependencies change
  useEffect(() => {
    // Example async operation
    const fetchSomething = async () => {
      try {
        setIsLoading(true);
        // Example async operation
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsLoading(false);
      }
    };
    
    fetchSomething();
    
    // Cleanup function
    return () => {
      // Any cleanup code here
    };
  }, [value]);
  
  return {
    value,
    isLoading,
    error,
    setValue,
    reset
  };
}

export default useFeature;
```

## Utility Function Template

For utility functions:

```plaintext
src/
└── utils/
    └── category/
        └── featureUtils.ts
```

### Utility Implementation (featureUtils.ts)

```tsx
/**
 * Formats a string according to specified rules
 * 
 * @param value - The string to format
 * @param options - Formatting options
 * @returns The formatted string
 */
export function formatValue(
  value: string,
  options: { uppercase?: boolean; trim?: boolean } = {}
): string {
  let result = value;
  
  if (options.trim) {
    result = result.trim();
  }
  
  if (options.uppercase) {
    result = result.toUpperCase();
  }
  
  return result;
}

/**
 * Validates that a value meets certain criteria
 * 
 * @param value - The value to validate
 * @returns An object with validation results
 */
export function validateValue(value: string): { 
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!value) {
    errors.push('Value is required');
  }
  
  if (value.length < 3) {
    errors.push('Value must be at least 3 characters long');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Type guard to check if a value is a non-empty string
 * 
 * @param value - The value to check
 * @returns Whether the value is a non-empty string
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}
```

## Feature Public API Template

For feature index exports:

```tsx
// src/features/feature-name/index.ts

// Re-export components
export { default as FeatureComponent } from './components/FeatureComponent';
export type { FeatureComponentProps } from './components/FeatureComponent';

export { default as AnotherComponent } from './components/AnotherComponent';
export type { AnotherComponentProps } from './components/AnotherComponent';

// Re-export hooks
export { useFeatureHook } from './hooks/useFeatureHook';

// Re-export types
export type { FeatureItem, FeatureConfig } from './types';

// Re-export utils
export { formatFeatureData } from './utils/dataUtils';
```

## Best Practices

1. **Keep components focused**: Each component should do one thing well
2. **Extract complex logic to hooks**: If a component has complex logic, extract it to a custom hook
3. **Use TypeScript interfaces**: Define clear interfaces for props, state, and hook returns
4. **Document public APIs**: Add JSDoc comments to components, hooks, and utility functions
5. **Test core functionality**: Write tests that verify the core functionality works as expected
6. **Co-locate related files**: Keep component files together in the same directory
7. **Use barrel exports**: Create index.ts files to provide a clean public API
8. **Follow naming conventions**: Use consistent naming for files and components
9. **Apply proper typing**: Use TypeScript to ensure type safety
10. **Organize imports**: Group imports logically (React, third-party, internal)
