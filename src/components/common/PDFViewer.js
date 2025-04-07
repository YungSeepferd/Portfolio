import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Box } from '@mui/material';
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
        {title || 'Document Viewer'}
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
        <Box sx={{ 
          width: '100%', 
          height: '100%', 
          '& iframe': { 
            border: 'none', 
            width: '100%', 
            height: '100%' 
          } 
        }}>
          <iframe 
            src={`${pdfPath}#toolbar=1&navpanes=1&scrollbar=1`} 
            title={title || "PDF Document"}
            allowFullScreen
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PDFViewer;