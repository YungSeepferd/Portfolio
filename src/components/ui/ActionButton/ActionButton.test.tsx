import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActionButton from './ActionButton';
import { ModalProvider } from '../../../context/modal-context';
import '@testing-library/jest-dom';

// Add Jest globals
declare const describe: (description: string, specDefinitions: () => void) => void;
declare const it: (description: string, fn: () => void) => void;
declare const test: (description: string, fn: () => void) => void;
declare const expect: any;

// Mock the modal context
jest.mock('../../../context/modal-context', () => ({
  ...jest.requireActual('../../../context/modal-context'),
  useModalContext: () => ({
    openPdf: jest.fn(),
    openIframe: jest.fn(),
    openExternalContent: jest.fn(),
  }),
}));

describe('ActionButton Component', () => {
  const renderWithContext = (ui: React.ReactElement) => {
    return render(<ModalProvider>{ui}</ModalProvider>);
  };

  test('renders with label', () => {
    renderWithContext(<ActionButton label="Test Button" />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  test('applies correct color based on label content', () => {
    const { rerender } = renderWithContext(<ActionButton label="GitHub Link" />);
    const githubButton = screen.getByRole('button');
    expect(githubButton).toHaveClass('MuiButton-colorInfo');

    rerender(<ActionButton label="PDF Document" />);
    const pdfButton = screen.getByRole('button');
    expect(pdfButton).toHaveClass('MuiButton-colorSecondary');

    rerender(<ActionButton label="Demo Project" />);
    const demoButton = screen.getByRole('button');
    expect(demoButton).toHaveClass('MuiButton-colorSuccess');
  });

  test('passes href attribute correctly', () => {
    renderWithContext(<ActionButton label="External Link" href="https://example.com" />);
    expect(screen.getByRole('button')).toHaveAttribute('href', 'https://example.com');
  });

  test('handles onClick event', () => {
    const handleClick = jest.fn();
    renderWithContext(<ActionButton label="Click Me" onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('has correct default props', () => {
    renderWithContext(<ActionButton label="Default Button" />);
    const button = screen.getByRole('button');
    
    // Check default variant
    expect(button).toHaveClass('MuiButton-contained');
    
    // Check default size
    expect(button).toHaveClass('MuiButton-sizeSmall');
  });
});
