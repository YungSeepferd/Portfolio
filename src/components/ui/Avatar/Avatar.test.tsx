import React from 'react';
import { render, screen } from '@testing-library/react';
import Avatar from './Avatar';
import '@testing-library/jest-dom';

// Add Jest globals
declare const describe: (description: string, specDefinitions: () => void) => void;
declare const it: (description: string, fn: () => void) => void;
declare const test: (description: string, fn: () => void) => void;
declare const expect: any;

// Mock media utils
jest.mock('../../../utils/media', () => ({
  resolveMediaPath: (path: string) => path,
  getPlaceholderImage: () => '/placeholder-avatar.jpg',
}));

describe('Avatar Component', () => {
  test('renders with src prop', () => {
    render(<Avatar src="/test-avatar.jpg" alt="Test Avatar" />);
    const avatarElement = screen.getByRole('img');
    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement).toHaveAttribute('alt', 'Test Avatar');
  });

  test('applies correct size based on size prop', () => {
    const { rerender } = render(<Avatar src="/test-avatar.jpg" size="small" />);
    const smallAvatar = screen.getByRole('img').parentElement;
    expect(smallAvatar).toHaveStyle({ width: '32px', height: '32px' });

    rerender(<Avatar src="/test-avatar.jpg" size="large" />);
    const largeAvatar = screen.getByRole('img').parentElement;
    expect(largeAvatar).toHaveStyle({ width: '56px', height: '56px' });

    rerender(<Avatar src="/test-avatar.jpg" size={100} />);
    const customAvatar = screen.getByRole('img').parentElement;
    expect(customAvatar).toHaveStyle({ width: '100px', height: '100px' });
  });

  test('applies correct variant', () => {
    const { rerender } = render(<Avatar src="/test-avatar.jpg" variant="circular" />);
    const circularAvatar = screen.getByRole('img').parentElement;
    expect(circularAvatar).toHaveClass('MuiAvatar-circular');

    rerender(<Avatar src="/test-avatar.jpg" variant="square" />);
    const squareAvatar = screen.getByRole('img').parentElement;
    expect(squareAvatar).toHaveClass('MuiAvatar-square');
  });

  test('passes additional props to MUI Avatar', () => {
    render(<Avatar src="/test-avatar.jpg" className="custom-avatar" />);
    const avatar = screen.getByRole('img').parentElement;
    expect(avatar).toHaveClass('custom-avatar');
  });
});
