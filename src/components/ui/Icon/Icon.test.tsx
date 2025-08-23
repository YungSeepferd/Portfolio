import React from 'react';
import { render, screen } from '@testing-library/react';
import Icon from './Icon';
import '@testing-library/jest-dom';

// Add Jest globals
declare const describe: (description: string, specDefinitions: () => void) => void;
declare const test: (description: string, fn: () => void) => void;
declare const expect: any;

describe('Icon Component', () => {
  test('renders default icon when no icon prop is provided', () => {
    render(<Icon data-testid="test-icon" />);
    const icon = screen.getByTestId('test-icon');
    expect(icon).toBeInTheDocument();
    expect(icon.tagName.toLowerCase()).toBe('svg');
  });

  test('applies correct size based on size prop', () => {
    const { rerender } = render(<Icon size="small" data-testid="test-icon" />);
    const smallIcon = screen.getByTestId('test-icon');
    expect(smallIcon).toHaveStyle({ fontSize: '16px' });

    rerender(<Icon size="large" data-testid="test-icon" />);
    const largeIcon = screen.getByTestId('test-icon');
    expect(largeIcon).toHaveStyle({ fontSize: '32px' });

    rerender(<Icon size={40} data-testid="test-icon" />);
    const customSizeIcon = screen.getByTestId('test-icon');
    expect(customSizeIcon).toHaveStyle({ fontSize: '40px' });
  });

  test('applies color prop correctly', () => {
    render(<Icon color="primary" data-testid="test-icon" />);
    const icon = screen.getByTestId('test-icon');
    expect(icon).toHaveStyle({ color: 'primary' });
  });

  test('renders custom icon component when provided', () => {
    const CustomIcon = () => <svg data-testid="custom-svg">Custom Icon</svg>;
    render(<Icon icon={<CustomIcon />} data-testid="test-icon" />);
    const customIcon = screen.getByTestId('custom-svg');
    expect(customIcon).toBeInTheDocument();
  });

  test('passes additional props to SvgIcon', () => {
    render(<Icon className="custom-icon" data-testid="test-icon" />);
    const icon = screen.getByTestId('test-icon');
    expect(icon).toHaveClass('custom-icon');
  });
});
