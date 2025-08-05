import { useState, useEffect } from 'react';

export const useCookieConsent = () => {
  const [cookieConsent, setCookieConsent] = useState(() => {
    return localStorage.getItem('cookieConsent') === 'accepted';
  });

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

  return cookieConsent;
};

export const sendAnalytics = (eventName, eventData = {}) => {
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
      sanitizedData.errorMessage = sanitizedData.error.message;
      delete sanitizedData.error;
    }

    window.gtag('event', eventName, sanitizedData);
  }
};
