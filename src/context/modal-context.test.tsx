import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModalProvider } from './modal-context';
import { useModal } from './modal-context';
import { useContext } from 'react';

const TestContent = () => <div>Test Modal Content</div>;

const TestComponent = () => {
  const { openProjectModal, closeModal } = useModal();
  return (
    <div>
      <button onClick={() => openProjectModal(<TestContent />)}>Open Modal</button>
      <button onClick={closeModal}>Close Modal</button>
    </div>
  );
};

describe('ModalContext', () => {
  it('opens and closes project modal', () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    // Initially modal content should not be visible
    expect(screen.queryByText('Test Modal Content')).not.toBeInTheDocument();

    // Open modal
    fireEvent.click(screen.getByText('Open Modal'));
    expect(screen.getByText('Test Modal Content')).toBeInTheDocument();

    // Close modal
    fireEvent.click(screen.getByText('Close Modal'));
    expect(screen.queryByText('Test Modal Content')).not.toBeInTheDocument();
  });

  it('opens PDF viewer modal', () => {
    const TestPDFComponent = () => {
      const { openPdf } = useModal();
      return <button onClick={() => openPdf('test.pdf', 'Test PDF')}>Open PDF</button>;
    };

    render(
      <ModalProvider>
        <TestPDFComponent />
      </ModalProvider>
    );

    fireEvent.click(screen.getByText('Open PDF'));
    expect(screen.getByText('Test PDF')).toBeInTheDocument();
  });

  it('opens iframe modal', () => {
    const TestIframeComponent = () => {
      const { openIframe } = useModal();
      return (
        <button onClick={() => openIframe('https://example.com', 'Test Iframe')}>
          Open Iframe
        </button>
      );
    };

    render(
      <ModalProvider>
        <TestIframeComponent />
      </ModalProvider>
    );

    fireEvent.click(screen.getByText('Open Iframe'));
    expect(screen.getByText('Test Iframe')).toBeInTheDocument();
  });

  it('handles external content modal', () => {
    const TestExternalComponent = () => {
      const { openExternalContent } = useModal();
      return (
        <button onClick={() => openExternalContent('https://example.com', 'External Content')}>
          Open External
        </button>
      );
    };

    render(
      <ModalProvider>
        <TestExternalComponent />
      </ModalProvider>
    );

    fireEvent.click(screen.getByText('Open External'));
    expect(screen.getByText('External Content')).toBeInTheDocument();
  });
});
