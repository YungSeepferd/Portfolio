import React from 'react';
import { render, screen } from '@testing-library/react';
import ActionButtonsGroup from './ActionButtonsGroup';
import { ModalProvider } from '../../../context/modal-context';
import '@testing-library/jest-dom';

// Add Jest globals
declare const describe: (description: string, specDefinitions: () => void) => void;
declare const test: (description: string, fn: () => void) => void;
declare const expect: any;

// Mock ActionButton to simplify testing
jest.mock('../ActionButton', () => {
  const MockActionButton = ({ label, ...props }: any) => (
    <button 
      data-testid={`action-button-${label}`}
      data-variant={props.variant}
      data-size={props.size}
      data-href={props.href}
    >
      {label}
    </button>
  );
  MockActionButton.displayName = 'ActionButton';
  return {
    __esModule: true,
    default: MockActionButton
  };
});

describe('ActionButtonsGroup Component', () => {
  const actions = [
    { label: 'View Demo', href: 'https://demo.example.com', primary: true, contentType: 'external' as const },
    { label: 'GitHub', href: 'https://github.com/example/repo', contentType: 'external' as const },
    { label: 'Documentation', href: '/docs/example.pdf', contentType: 'pdf' as const }
  ];

  const renderWithContext = (ui: React.ReactElement) => {
    return render(<ModalProvider>{ui}</ModalProvider>);
  };

  test('renders all action buttons', () => {
    renderWithContext(<ActionButtonsGroup actions={actions} />);
    
    expect(screen.getByText('View Demo')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();
  });

  test('applies different styles to primary action when enhancePrimary is true', () => {
    renderWithContext(<ActionButtonsGroup actions={actions} enhancePrimary />);
    
    const primaryButton = screen.getByTestId('action-button-View Demo');
    const secondaryButton = screen.getByTestId('action-button-GitHub');
    
    expect(primaryButton).toHaveAttribute('data-variant', 'contained');
    expect(primaryButton).toHaveAttribute('data-size', 'medium');
    
    expect(secondaryButton).toHaveAttribute('data-variant', 'outlined');
    expect(secondaryButton).toHaveAttribute('data-size', 'small');
  });

  test('renders in column direction when specified', () => {
    renderWithContext(<ActionButtonsGroup actions={actions} direction="column" />);
    const container = screen.getByText('View Demo').closest('.action-buttons-group');
    expect(container).toBeInTheDocument();
  });

  test('returns null when no actions are provided', () => {
    const { container } = renderWithContext(<ActionButtonsGroup actions={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
