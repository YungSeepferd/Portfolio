import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectFullContent from './ProjectFullContent';
import adhdeer from './data/projects/adhdeer';
import { useModalContext } from '../../context/ModalContext';

jest.mock('../../context/ModalContext', () => ({
  useModalContext: jest.fn(),
}));

describe('ProjectFullContent Component', () => {
  beforeEach(() => {
    useModalContext.mockReturnValue({
      openPdf: jest.fn(),
      openIframe: jest.fn(),
      openExternalContent: jest.fn(),
      closeModal: jest.fn(),
    });
  });

  it('renders the project header with title and description', () => {
    render(<ProjectFullContent project={adhdeer} />);

    // Refined matcher to handle nested elements and styling
    const titleMatcher = (content, element) => {
      const hasText = (node) => node.textContent.trim() === 'ADHDeer – ADHD Support App';
      const nodeHasText = hasText(element);
      const childrenDontHaveText = Array.from(element.children).every(
        (child) => !hasText(child)
      );
      return nodeHasText && childrenDontHaveText;
    };

    expect(screen.getByText(titleMatcher)).toBeInTheDocument();

    // Check for project description
    expect(screen.getByText(/A VR experience designed to support ADHD therapy/i)).toBeInTheDocument();
  });

  it('renders the hero media section', () => {
    render(<ProjectFullContent project={adhdeer} />);

    // Check for hero image alt text
    expect(screen.getAllByAltText(/ADHDeer VR Experience Preview/i)[0]).toBeInTheDocument();
  });

  it('renders the key takeaways section', () => {
    render(<ProjectFullContent project={adhdeer} />);

    // Refined matcher for key takeaways
    const takeawayMatcher = (content, element) => {
      const hasText = (node) => node.textContent.trim() === 'Improved focus and engagement';
      const nodeHasText = hasText(element);
      const childrenDontHaveText = Array.from(element.children).every(
        (child) => !hasText(child)
      );
      return nodeHasText && childrenDontHaveText;
    };

    expect(screen.getByText(takeawayMatcher)).toBeInTheDocument();
  });

  it('renders the project links section', () => {
    render(<ProjectFullContent project={adhdeer} />);

    // Check for a specific link label
    expect(screen.getByText(/View Presentation/i)).toBeInTheDocument();
  });

  it('renders the prototype showcase section', () => {
    render(<ProjectFullContent project={adhdeer} />);

    // Check for prototype showcase link
    expect(screen.getByText(/Try Prototype/i)).toBeInTheDocument();
  });
});