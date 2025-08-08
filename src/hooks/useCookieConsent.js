import { useState, useEffect } from 'react';

export const useCookieConsent = () => {
  const [cookieConsent, setInternalCookieConsent] = useState(() => {
    try {
      return (
        typeof window !== 'undefined' && window.localStorage.getItem('cookieConsent') === 'accepted'
      );
    } catch {
      return false;
    }
  });

  const setCookieConsent = (consent) => {
    setInternalCookieConsent(consent);
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('cookieConsent', consent ? 'accepted' : 'declined');
      }
    } catch (e) {
      // noop
    }
  };

  useEffect(() => {
    const handleConsentAccepted = () => {
      setCookieConsent(true);
    };

    const handleConsentDeclined = () => {
      setCookieConsent(false);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('cookieConsentAccepted', handleConsentAccepted);
      window.addEventListener('cookieConsentDeclined', handleConsentDeclined);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('cookieConsentAccepted', handleConsentAccepted);
        window.removeEventListener('cookieConsentDeclined', handleConsentDeclined);
      }
    };
  }, []);

  return {
    cookieConsent,
    setCookieConsent,
  };
};

export const sendAnalytics = (eventName, eventData = {}) => {
  const hasConsent = (() => {
    try {
      return (
        typeof window !== 'undefined' && window.localStorage.getItem('cookieConsent') === 'accepted'
      );
    } catch {
      return false;
    }
  })();

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
      sanitizedData.errorMessage = sanitizedData.error.message || String(sanitizedData.error);
      delete sanitizedData.error;
    }

    window.gtag('event', eventName, sanitizedData);
  }
};
