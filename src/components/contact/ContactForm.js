import React, { useState, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Stack
} from '@mui/material';
import emailjs from '@emailjs/browser';
import { sendAnalytics } from '../../hooks/useCookieConsent';

const ContactForm = () => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      sendAnalytics('contact_form_submitted');
      
      // Reset form
      formRef.current.reset();
    } catch (error) {
      setStatus('error');
      setError('Failed to send message. Please try again later.');
      sendAnalytics('contact_form_error', { errorMessage: error.message });
    }
  };

  return (
    <Box component="form" ref={formRef} onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 600 }}>
      <Stack spacing={3}>
        {status === 'success' && (
          <Alert severity="success">
            Thank you for your message! I'll get back to you soon.
          </Alert>
        )}
        
        {status === 'error' && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        <TextField
          required
          fullWidth
          label="Name"
          name="from_name"
          disabled={status === 'loading'}
        />

        <TextField
          required
          fullWidth
          label="Email"
          name="from_email"
          type="email"
          disabled={status === 'loading'}
        />

        <TextField
          required
          fullWidth
          label="Message"
          name="message"
          multiline
          rows={4}
          disabled={status === 'loading'}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={status === 'loading'}
          sx={{ mt: 2 }}
        >
          {status === 'loading' ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Send Message'
          )}
        </Button>
      </Stack>
    </Box>
  );
};

export default ContactForm;
