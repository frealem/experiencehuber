import React, { useState } from 'react';
import { Box, IconButton, Modal, Button } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import UserImage from '../../../components/userImage';
import { styled } from '@mui/system';

const EditIconButton = styled(IconButton)(({ theme }) => ({
  marginBottom: '-15px',
  marginLeft: '40px',
}));

const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: theme.shadows[24],
  padding: theme.spacing(2),
}));

const ModalButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

function Profile() {
  const [open, setOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const handleIconClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTakePicture = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      video.srcObject = mediaStream;
      video.addEventListener('loadedmetadata', () => {
        video.play();
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL('image/jpeg');
        setProfilePicture(dataURL);

        mediaStream.getTracks().forEach((track) => track.stop());
        video.remove();
        canvas.remove();
      });
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  return (
    <Box align="center">
    <Box position="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <UserImage size={80} profilePicture={profilePicture} />
      {isHovered && (
        <IconButton
          style={{ position: 'absolute', right: 190, bottom: 0 }}
          size="medium"
          onClick={handleIconClick}
          color="primary"
        >
          <ModeEditIcon />
        </IconButton>
      )}
      </Box>
      <Modal open={open} onClose={handleClose}>
        <ModalContainer>
          <ModalButton variant="contained" onClick={handleTakePicture}>
            Take Picture
          </ModalButton>
          <ModalButton variant="contained" component="label">
            Upload File
            <input
              type="file"
              style={{ display: 'none' }}
              accept="image/jpeg"
              onChange={(event) => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                  setProfilePicture(e.target.result);
                };
                reader.readAsDataURL(file);
              }}
            />
          </ModalButton>
          <ModalButton variant="contained" onClick={handleClose}>
            Close
          </ModalButton>
        </ModalContainer>
      </Modal>
    </Box>
  );
}

export default Profile;