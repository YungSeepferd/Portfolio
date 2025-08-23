import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Modal } from './Modal';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { ModalContext } from '../../../context/modal-context';

// Declare Jest globals for TypeScript
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: any;
declare const jest: any;
declare const beforeEach: (fn: () => void) => void;

const theme = createTheme();

// Mock modal context
const mockCloseModal = jest.fn();
const mockModalContext = {
  openPdf: jest.fn(),
  openIframe: jest.fn(),
  openExternalContent: jest.fn(),
  openProjectModal: jest.fn(),
  closeModal: mockCloseModal,
  projectContent: null as React.ReactNode,
  projectOpen: false
};

describe('Modal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal content when open', () => {
    render(
      <ThemeProvider theme={theme}>
        <ModalContext.Provider value={mockModalContext}>
          <Modal open={true}>
            <div data-testid="modal-content">Modal Content</div>
          </Modal>
        </ModalContext.Provider>
      </ThemeProvider>
    );
    
    const modalContent = screen.getByTestId('modal-content');
    expect(modalContent).toBeInTheDocument();
    expect(modalContent).toHaveTextContent('Modal Content');
  });

  it('displays title when provided', () => {
    render(
      <ThemeProvider theme={theme}>
        <ModalContext.Provider value={mockModalContext}>
          <Modal open={true} title="Test Modal">
            <div>Content</div>
          </Modal>
        </ModalContext.Provider>
      </ThemeProvider>
    );
    
    const modalTitle = screen.getByText('Test Modal');
    expect(modalTitle).toBeInTheDocument();
  });
  
  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <ModalContext.Provider value={mockModalContext}>
          <Modal open={true} onClose={handleClose}>
            <div>Content</div>
          </Modal>
        </ModalContext.Provider>
      </ThemeProvider>
    );
    
    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(mockCloseModal).not.toHaveBeenCalled(); // Should use onClose instead of context
  });
  
  it('calls context closeModal when no onClose is provided', () => {
    render(
      <ThemeProvider theme={theme}>
        <ModalContext.Provider value={mockModalContext}>
          <Modal open={true}>
            <div>Content</div>
          </Modal>
        </ModalContext.Provider>
      </ThemeProvider>
    );
    
    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });
  
  it('does not show close button when showCloseButton is false', () => {
    render(
      <ThemeProvider theme={theme}>
        <ModalContext.Provider value={mockModalContext}>
          <Modal open={true} showCloseButton={false}>
            <div>Content</div>
          </Modal>
        </ModalContext.Provider>
      </ThemeProvider>
    );
    
    const closeButton = screen.queryByLabelText('close');
    expect(closeButton).not.toBeInTheDocument();
  });
});
