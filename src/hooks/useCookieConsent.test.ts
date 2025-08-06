import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCookieConsent, sendAnalytics } from './useCookieConsent';

describe('useCookieConsent', () => {
  const mockStorage: { [key: string]: string } = {};

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key: string): string | null => mockStorage[key] || null,
        setItem: (key: string, value: string): void => {
          mockStorage[key] = value;
        },
        removeItem: (key: string): void => {
          delete mockStorage[key];
        },
        clear: (): void => {
          Object.keys(mockStorage).forEach((key) => delete mockStorage[key]);
        },
      },
      writable: true,
    });
  });

  it('returns initial consent state from localStorage', () => {
    window.localStorage.setItem('cookieConsent', 'accepted');

    const { result } = renderHook(() => useCookieConsent());
    expect(result.current.cookieConsent).toBe(true);
  });

  it('defaults to false when no stored consent exists', () => {
    const { result } = renderHook(() => useCookieConsent());
    expect(result.current.cookieConsent).toBe(false);
  });

  it('updates consent state and persists to localStorage', () => {
    const { result } = renderHook(() => useCookieConsent());

    act(() => {
      result.current.setCookieConsent(true);
    });

    expect(result.current.cookieConsent).toBe(true);
    expect(window.localStorage.getItem('cookieConsent')).toBe('accepted');

    act(() => {
      result.current.setCookieConsent(false);
    });

    expect(result.current.cookieConsent).toBe(false);
    expect(window.localStorage.getItem('cookieConsent')).toBe('declined');
  });
});

describe('sendAnalytics', () => {
  let gtagSpy: any;

  beforeEach(() => {
    gtagSpy = vi.fn();
    window.gtag = gtagSpy;
    window.localStorage.clear();
  });

  it('sends analytics event when consent is given', () => {
    window.localStorage.setItem('cookieConsent', 'accepted');

    sendAnalytics('test_event', { value: 123 });

    expect(gtagSpy).toHaveBeenCalledWith('event', 'test_event', {
      value: 123,
    });
  });

  it('does not send analytics event when consent is not given', () => {
    window.localStorage.setItem('cookieConsent', 'declined');

    sendAnalytics('test_event', { value: 123 });

    expect(gtagSpy).not.toHaveBeenCalled();
  });

  it('handles missing gtag function gracefully', () => {
    window.localStorage.setItem('cookieConsent', 'accepted');
    delete window.gtag;

    // Should not throw an error
    expect(() => {
      sendAnalytics('test_event', { value: 123 });
    }).not.toThrow();
  });
});
