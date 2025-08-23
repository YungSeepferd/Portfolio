import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import '@testing-library/jest-dom';

// Add Jest globals
declare const describe: (description: string, specDefinitions: () => void) => void;
declare const test: (description: string, fn: () => void) => void;
declare const expect: any;

// Mock the framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    footer: jest.fn().mockImplementation(({ children, ...props }) => (
      <footer data-testid="motion-footer" {...props}>
        {children}
      </footer>
    )),
  },
}));

describe('Footer Component', () => {
  test('renders simple footer with copyright', () => {
    render(<Footer variant="simple" copyrightYear={2025} copyrightText="Testing Footer" />);
    
    expect(screen.getByText('© 2025 Testing Footer')).toBeInTheDocument();
    expect(screen.queryByText('Home')).not.toBeInTheDocument(); // Links shouldn't be in simple variant
  });

  test('renders full footer with links and social icons', () => {
    render(<Footer variant="full" />);
    
    // Navigation links should be present
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    
    // Social icons should be present
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  test('renders with custom social links', () => {
    const customSocialLinks = {
      github: 'https://github.com/customuser',
      linkedin: 'https://linkedin.com/in/customuser',
      email: 'mailto:custom@example.com',
    };
    
    render(<Footer socialLinks={customSocialLinks} />);
    
    const githubLink = screen.getByLabelText('GitHub');
    const linkedinLink = screen.getByLabelText('LinkedIn');
    const emailLink = screen.getByLabelText('Email');
    
    expect(githubLink).toHaveAttribute('href', customSocialLinks.github);
    expect(linkedinLink).toHaveAttribute('href', customSocialLinks.linkedin);
    expect(emailLink).toHaveAttribute('href', customSocialLinks.email);
  });

  test('uses current year for copyright when not specified', () => {
    const currentYear = new Date().getFullYear();
    render(<Footer variant="simple" />);
    
    expect(screen.getByText(`© ${currentYear} All rights reserved`)).toBeInTheDocument();
  });
});
