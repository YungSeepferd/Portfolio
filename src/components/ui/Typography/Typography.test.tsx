import React from 'react';
import { render, screen } from '@testing-library/react';
import Typography from './Typography';
import '@testing-library/jest-dom';

// Add Jest globals
declare const describe: (description: string, specDefinitions: () => void) => void;
declare const test: (description: string, fn: () => void) => void;
declare const expect: any;

describe('Typography Component', () => {
  test('renders with children', () => {
    render(<Typography>Test Typography</Typography>);
    expect(screen.getByText('Test Typography')).toBeInTheDocument();
  });

  test('applies variant correctly', () => {
    const { rerender } = render(<Typography variant="h1">Heading 1</Typography>);
    expect(screen.getByText('Heading 1')).toHaveClass('MuiTypography-h1');

    rerender(<Typography variant="body2">Body Text</Typography>);
    expect(screen.getByText('Body Text')).toHaveClass('MuiTypography-body2');
  });

  test('applies bold style when bold prop is true', () => {
    render(<Typography bold>Bold Text</Typography>);
    expect(screen.getByText('Bold Text')).toHaveStyle('font-weight: bold');
  });

  test('applies italic style when italic prop is true', () => {
    render(<Typography italic>Italic Text</Typography>);
    expect(screen.getByText('Italic Text')).toHaveStyle('font-style: italic');
  });

  test('applies underline style when underline prop is true', () => {
    render(<Typography underline>Underlined Text</Typography>);
    expect(screen.getByText('Underlined Text')).toHaveStyle('text-decoration: underline');
  });

  test('applies alignment correctly', () => {
    const { rerender } = render(<Typography align="center">Centered Text</Typography>);
    expect(screen.getByText('Centered Text')).toHaveClass('MuiTypography-alignCenter');

    rerender(<Typography align="right">Right Text</Typography>);
    expect(screen.getByText('Right Text')).toHaveClass('MuiTypography-alignRight');
  });

  test('applies color prop correctly', () => {
    render(<Typography color="primary">Colored Text</Typography>);
    expect(screen.getByText('Colored Text')).toHaveStyle('color: primary');
  });

  test('applies truncate styles when truncate prop is true', () => {
    render(<Typography truncate>Truncated Text</Typography>);
    const text = screen.getByText('Truncated Text');
    expect(text).toHaveStyle('overflow: hidden');
    expect(text).toHaveStyle('text-overflow: ellipsis');
    expect(text).toHaveStyle('white-space: nowrap');
  });

  test('applies multi-line truncate when maxLines prop is specified', () => {
    render(<Typography truncate maxLines={2}>Multi-line truncated text</Typography>);
    const text = screen.getByText('Multi-line truncated text');
    expect(text).toHaveStyle('-webkit-line-clamp: 2');
    expect(text).toHaveStyle('-webkit-box-orient: vertical');
  });

  test('applies monospace font when monospace prop is true', () => {
    render(<Typography monospace>Monospace Text</Typography>);
    expect(screen.getByText('Monospace Text')).toHaveStyle('font-family: "IBM Plex Mono", monospace');
  });
});
