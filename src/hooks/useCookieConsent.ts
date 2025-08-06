import { useState, useEffect } from 'react';

interface CookieConsentHook {
  cookieConsent: boolean;
  setCookieConsent: (consent: boolean) => void;
}

export const useCookieConsent = (): CookieConsentHook => {
  const [cookieConsent, setInternalCookieConsent] = useState<boolean>(() => {
    return localStorage.getItem('cookieConsent') === 'accepted';
  });

  const setCookieConsent = (consent: boolean): void => {
    setInternalCookieConsent(consent);
    localStorage.setItem('cookieConsent', consent ? 'accepted' : 'declined');
  };

  useEffect(() => {
    const handleConsentAccepted = () => {
      setCookieConsent(true);
    };

    const handleConsentDeclined = () => {
      setCookieConsent(false);
    };

    window.addEventListener('cookieConsentAccepted', handleConsentAccepted);
    window.addEventListener('cookieConsentDeclined', handleConsentDeclined);

    return () => {
      window.removeEventListener('cookieConsentAccepted', handleConsentAccepted);
      window.removeEventListener('cookieConsentDeclined', handleConsentDeclined);
    };
  }, []);

  return {
    cookieConsent,
    setCookieConsent,
  };
};

interface AnalyticsEventData {
  [key: string]: any;
  email?: string;
  errorStack?: string;
  userId?: string;
  sessionId?: string;
  error?: Error | { message: string };
}

export const sendAnalytics = (eventName: string, eventData: AnalyticsEventData = {}): void => {
  const hasConsent = localStorage.getItem('cookieConsent') === 'accepted';

  if (hasConsent && window.gtag) {
    // Sanitize the data to remove potential sensitive information
    const sanitizedData = { ...eventData };

    // Remove potentially sensitive fields
    delete sanitizedData.email;
    delete sanitizedData.errorStack;
    delete sanitizedData.userId;
    delete sanitizedData.sessionId;

    // If there's an error message, only keep the message without the stack trace
    if (sanitizedData.error && typeof sanitizedData.error === 'object') {
      sanitizedData.errorMessage =
        'error' in sanitizedData.error ? sanitizedData.error.message : String(sanitizedData.error);
      delete sanitizedData.error;
    }

    window.gtag('event', eventName, sanitizedData);
  }
};
