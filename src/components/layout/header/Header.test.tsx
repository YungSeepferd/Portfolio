import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import { Header } from './index';

// Declare Jest globals for TypeScript
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: any;
declare const beforeEach: (fn: () => void) => void;
declare const jest: any;

// Mock the window.scrollTo function
Object.defineProperty(window, 'scrollTo', { value: jest.fn(), writable: true });

// Mock react-scroll
jest.mock('react-scroll', () => {
  return {
    Link: ({ children, to, ...props }: any) => (
      <a href={`#${to}`} {...props}>
        {children}
      </a>
    ),
    scroller: {
      scrollTo: jest.fn(),
    },
    Events: {
      scrollEvent: {
        register: jest.fn(),
        remove: jest.fn(),
      },
    },
  };
});

// Mock the ui-config module
jest.mock('../../../config/ui-config', () => ({
  navItems: [
    { name: 'About', target: 'about' },
    { name: 'Projects', target: 'projects' },
    { name: 'Contact', target: 'contact', isCallToAction: true },
  ],
  socialLinks: [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: 'LinkedIn',
      ariaLabel: 'Visit LinkedIn profile',
    },
  ],
}));

describe('Header Component', () => {
  const mockMatchMedia = () => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
      writable: true,
    });
  };

  beforeEach(() => {
    mockMatchMedia();
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders the header with logo and navigation', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    // Check if the logo/title is rendered
    expect(screen.getByText('WORK IN PROGRESS')).toBeInTheDocument();

    // Check if navigation items are rendered
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('displays the social links', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    // Check if the LinkedIn icon button is rendered
    const linkedInButton = screen.getByLabelText('Visit LinkedIn profile');
    expect(linkedInButton).toBeInTheDocument();
    expect(linkedInButton.tagName).toBe('BUTTON');
    expect(linkedInButton.closest('a')).toHaveAttribute('href', 'https://linkedin.com');
  });

  it('changes appearance on scroll', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    // Simulate scroll event
    window.scrollY = 100;
    fireEvent.scroll(window);

    // Check if the header changes appearance
    const appBar = document.querySelector('.MuiAppBar-root');
    expect(appBar).toHaveStyle('box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)');
  });

  it('opens mobile menu when burger icon is clicked', () => {
    // Set viewport to mobile size
    window.innerWidth = 400;
    window.dispatchEvent(new Event('resize'));

    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    // Find and click the burger menu icon
    const burgerButton = screen.getByLabelText('open drawer');
    fireEvent.click(burgerButton);

    // Check if the mobile menu is displayed
    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('closes mobile menu when close icon is clicked', () => {
    // Set viewport to mobile size
    window.innerWidth = 400;
    window.dispatchEvent(new Event('resize'));

    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    // Open the mobile menu
    const burgerButton = screen.getByLabelText('open drawer');
    fireEvent.click(burgerButton);
    
    // Find and click the close button
    const closeButton = screen.getByLabelText('Close menu');
    fireEvent.click(closeButton);
    
    // Check if the mobile menu is closed - the Menu text should not be visible
    expect(screen.queryByText('Menu')).not.toBeInTheDocument();
  });
});
