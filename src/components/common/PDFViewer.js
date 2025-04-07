import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Box, CircularProgress, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * PDFViewer Component
 * 
 * A modal dialog component that displays PDF files using an iframe.
 * 
 * @param {Object} props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {function} props.onClose - Function to call when closing the dialog
 * @param {string} props.pdfPath - Path to the PDF file to display
 * @param {string} props.title - Title to display in the dialog header
 */
const PDFViewer = ({ open, onClose, pdfPath, title }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Handle iframe load completion
  const handleLoad = () => {
    setLoading(false);
  };

  // Handle iframe load error
  const handleError = () => {
    setLoading(false);
    setError(true);
  };
  
  // Make sure we reset state when opening a new PDF
  React.useEffect(() => {
    if (open) {
      setLoading(true);
      setError(false);
    }
  }, [open, pdfPath]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          height: { xs: '90vh', md: '85vh' },
          m: { xs: 1, sm: 2, md: 3 },
          position: 'relative',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        m: 0, 
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {title || 'PDF Document'}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0, overflow: 'hidden' }}>
        {loading && (
          <Box sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}>
            <CircularProgress size={40} />
          </Box>
        )}
        
        {error ? (
          <Box sx={{ 
            p: 3, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}>
            <Typography variant="h6" color="error">Failed to load PDF</Typography>
            <Typography variant="body2">
              The PDF could not be loaded. Please check the file path: {pdfPath}
            </Typography>
            <Button 
              variant="contained" 
              href={pdfPath} 
              target="_blank"
              sx={{ mt: 2 }}
            >
              Open in New Tab
            </Button>
          </Box>
        ) : (
          <Box sx={{ width: '100%', height: '100%' }}>
            <iframe
              src={`${pdfPath}#view=FitH`}
              title={title || "PDF Document"}
              width="100%"
              height="100%"
              onLoad={handleLoad}
              onError={handleError}
              style={{ border: 'none' }}
            />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PDFViewer;