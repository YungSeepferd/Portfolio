import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ModalProvider, useModal } from './ModalContext';

// Declare Jest globals for TypeScript
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: any;
declare const beforeEach: (fn: () => void) => void;
declare const jest: any;

// Mock the components that are lazily loaded
jest.mock('../../components/common/pdf-viewer', () => {
  return {
    __esModule: true,
    default: ({ url, title }: { url: string, title: string }) => (
      <div data-testid="pdf-viewer">
        <div data-testid="pdf-url">{url}</div>
        <div data-testid="pdf-title">{title}</div>
      </div>
    ),
  };
});

jest.mock('../../components/common/iframe-modal', () => {
  return {
    __esModule: true,
    default: ({ url, title }: { url: string, title: string }) => (
      <div data-testid="iframe-modal">
        <div data-testid="iframe-url">{url}</div>
        <div data-testid="iframe-title">{title}</div>
      </div>
    ),
  };
});

// Test component that uses the modal context
const TestComponent = () => {
  const { 
    openPdf, 
    openIframe,
    openExternalContent,
    openProjectModal,
    closeModal,
    projectOpen
  } = useModal();
  
  return (
    <div>
      <button data-testid="open-pdf" onClick={() => openPdf('test.pdf', 'Test PDF')}>
        Open PDF
      </button>
      <button data-testid="open-iframe" onClick={() => openIframe('test-iframe.html', 'Test Iframe')}>
        Open Iframe
      </button>
      <button data-testid="open-external" onClick={() => openExternalContent('https://example.com', 'Example Website')}>
        Open External
      </button>
      <button 
        data-testid="open-project" 
        onClick={() => openProjectModal(<div data-testid="project-content">Project Content</div>)}
      >
        Open Project
      </button>
      <button data-testid="close-modal" onClick={closeModal}>
        Close Modal
      </button>
      <div data-testid="project-open">{projectOpen ? 'true' : 'false'}</div>
    </div>
  );
};

describe('ModalContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock for ResizeObserver which is required by MUI Dialog
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  
  it('should open PDF modal when openPdf is called', async () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );
    
    fireEvent.click(screen.getByTestId('open-pdf'));
    
    // Wait for the modal to be rendered
    await waitFor(() => {
      expect(screen.getByText('Test PDF')).toBeInTheDocument();
    });
    
    // We should see the PDF viewer
    await waitFor(() => {
      const pdfUrl = screen.getByTestId('pdf-url');
      expect(pdfUrl).toBeInTheDocument();
      expect(pdfUrl).toHaveTextContent('test.pdf');
    });
  });
  
  it('should open iframe modal when openIframe is called', async () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );
    
    fireEvent.click(screen.getByTestId('open-iframe'));
    
    // Wait for the modal to be rendered with the correct title
    await waitFor(() => {
      expect(screen.getByTestId('iframe-title')).toBeInTheDocument();
      expect(screen.getByTestId('iframe-title')).toHaveTextContent('Test Iframe');
    });
    
    // Check the iframe URL is set correctly
    expect(screen.getByTestId('iframe-url')).toHaveTextContent('test-iframe.html');
  });
  
  it('should open external content modal when openExternalContent is called', async () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );
    
    fireEvent.click(screen.getByTestId('open-external'));
    
    // Wait for the external content modal
    await waitFor(() => {
      expect(screen.getByTestId('iframe-title')).toBeInTheDocument();
      expect(screen.getByTestId('iframe-title')).toHaveTextContent('Example Website');
    });
    
    // Check the URL is set correctly
    expect(screen.getByTestId('iframe-url')).toHaveTextContent('https://example.com');
  });
  
  it('should open project modal when openProjectModal is called', async () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );
    
    expect(screen.getByTestId('project-open')).toHaveTextContent('false');
    
    fireEvent.click(screen.getByTestId('open-project'));
    
    // Project open state should be true
    expect(screen.getByTestId('project-open')).toHaveTextContent('true');
    
    // Project content should be rendered
    await waitFor(() => {
      expect(screen.getByTestId('project-content')).toBeInTheDocument();
      expect(screen.getByTestId('project-content')).toHaveTextContent('Project Content');
    });
  });
  
  it('should close all modals when closeModal is called', async () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );
    
    // Open a project modal first
    fireEvent.click(screen.getByTestId('open-project'));
    expect(screen.getByTestId('project-open')).toHaveTextContent('true');
    
    // Close the modal
    fireEvent.click(screen.getByTestId('close-modal'));
    
    // Modal should be closed
    expect(screen.getByTestId('project-open')).toHaveTextContent('false');
  });
  
  it('should initialize with provided initial state', () => {
    render(
      <ModalProvider initialState={{ projectOpen: true }}>
        <TestComponent />
      </ModalProvider>
    );
    
    // Project modal should be open initially
    expect(screen.getByTestId('project-open')).toHaveTextContent('true');
  });
});
