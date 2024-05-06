import React, { useState } from 'react';
import {
  IconButton,
  Tooltip,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material"
 import { FacebookOutlined, FileCopyOutlined, Instagram, WhatsApp } from '@mui/icons-material';

const ShareButtons = ({ shareUrl }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState('');

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCopiedLink('');
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(url, '_blank');
  };

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(url, '_blank');
  };

  const handleShareInstagram = () => {
    const url =` https://www.instagram.com/share?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(shareUrl);
    setDialogOpen(true);
    setSnackbarOpen(true);
  };
  
  const handleFileCopy = () => {
    navigator.clipboard.writeText(shareUrl)
  };
  
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Tooltip title="Share on Facebook">
        <IconButton onClick={handleShareFacebook}>
          <FacebookOutlined />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share on WhatsApp">
        <IconButton onClick={handleShareWhatsApp}>
          <WhatsApp />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share on Instagram">
        <IconButton onClick={handleShareInstagram}>
          <Instagram />
        </IconButton>
      </Tooltip>
      <Tooltip title="Copy Link">
        <IconButton onClick={handleCopyLink}>
          <FileCopyOutlined />
        </IconButton>
      </Tooltip>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message="Link copied to clipboard"
      />
     <Dialog open={dialogOpen} onClose={handleDialogClose}>
  <DialogTitle>Copy Link</DialogTitle>
  <DialogContent>
    <TextField
      value={copiedLink}
      label="Link"
      variant="outlined"
      fullWidth
      InputProps={{
        readOnly: true,
      }}
    />
    <IconButton onClick={handleFileCopy} aria-label="copy link">
      <FileCopyOutlined />
    </IconButton>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleDialogClose} color="primary">
      Close
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
};

export default ShareButtons;