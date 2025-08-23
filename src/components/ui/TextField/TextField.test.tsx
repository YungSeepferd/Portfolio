import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextField from './TextField';
import '@testing-library/jest-dom';

// Add Jest globals
declare const describe: (description: string, specDefinitions: () => void) => void;
declare const test: (description: string, fn: () => void) => void;
declare const expect: any;
declare const jest: any;

describe('TextField Component', () => {
  test('renders with label', () => {
    render(<TextField label="Name" />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  test('displays required indicator when required is true', () => {
    render(<TextField label="Email" required />);
    const label = screen.getByText('Email', { exact: false });
    expect(label).toHaveTextContent('Email *');
  });

  test('displays helper text when provided', () => {
    render(<TextField helperText="Enter your full name" />);
    expect(screen.getByText('Enter your full name')).toBeInTheDocument();
  });

  test('applies error styling when isInvalid is true', () => {
    render(<TextField isInvalid errorMessage="Invalid input" />);
    expect(screen.getByText('Invalid input')).toBeInTheDocument();
  });

  test('displays success message when isValid is true', () => {
    render(<TextField isValid successMessage="Looks good!" />);
    expect(screen.getByText('Looks good!')).toBeInTheDocument();
  });

  test('handles change events', () => {
    const handleChange = jest.fn();
    render(<TextField onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('displays character count when showCharacterCount is true', () => {
    render(<TextField defaultValue="Hello" showCharacterCount />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('displays character count with max length when maxLength is provided', () => {
    render(<TextField defaultValue="Hello" showCharacterCount inputProps={{ maxLength: 10 }} />);
    expect(screen.getByText('5/10')).toBeInTheDocument();
  });

  test('applies monospace font when monospace is true', () => {
    render(<TextField monospace />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveStyle({ fontFamily: '"IBM Plex Mono", monospace' });
  });

  test('renders adornments when provided', () => {
    render(
      <TextField 
        startAdornment="$"
        endAdornment="USD"
      />
    );
    
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
  });
});
