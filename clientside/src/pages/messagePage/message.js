import React, { useState } from 'react'
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Modal, TextField, Typography, styled, useTheme } from '@mui/material'
import { Close } from '@mui/icons-material';
import ChatRoom from './components/messageComponent';

const MessagePage = ({open,onClose}) => {

  const messageSender = [
    {
      id: 1,
      message: "Message for sender 1",
      image: "",
      time: "9:29 am",
    },
    {
      id: 2,
      message: "Message for sender 2",
      image: "",
      time: "9:29 am",
    },
    {
      id: 3,
      message: "Message for sender 3",
      image: "",
      time: "9:29 am",
    },
    {
      id: 4,
      message: "Message for sender 4",
      image: "",
      time: "9:29 am",
    },
    {
      id: 5,
      message: "Message for sender 5",
      image: "",
      time: "9:29 am",
    },
  ];
  
  const messageReceiver = [
    {
      id: 10,
      message: "Message for receiver 10",
      image: "",
      time: "9:29 am",
    },
    {
      id: 11,
      message: "Message for receiver 11",
      image: "",
      time: "9:29 am",
    },
    {
      id: 12,
      message: "Message for receiver 12",
      image: "",
      time: "9:29 am",
    },
    {
      id: 13,
      message: "Message for receiver 13",
      image: "",
      time: "9:29 am",
    },
    {
      id: 14,
      message: "Message for receiver 14",
      image: "",
      time: "9:29 am",
    },
  ];

//   const MessageSender = ({ message }) => {
//     return (
//       <Box display="flex" justifyContent="flex-end">
//         <Typography>{message.message}</Typography>
//       </Box>
//     );
//   };
  
//   const MessageReceiver = ({ message }) => {
//     return (
//       <Box display="flex">
//         <Typography>{message.message}</Typography>
//       </Box>
//     );
//   };

// const theme=useTheme();

//   const ModalContent = styled(Box)({
//     borderRadius: "8px",
//     padding: "16px",
//     maxWidth: "500px",
//     width: "90%",
//   });
  return (
   <> <Dialog
   open={open}
   onClose={onClose}
   fullWidth maxWidth="sm"
 >
   <DialogTitle>
     <Box display="flex" justifyContent="space-between">
       <Box>
         <Typography fontWeight={600} color="red">
           Chat
         </Typography>
       </Box>
       <Box display="flex" justifyContent="flex-end">
         <IconButton aria-label="close" onClick={onClose}>
           <Close />
         </IconButton>
       </Box>
     </Box></DialogTitle>
     <DialogContent>
     <Box>
  <ChatRoom />
</Box>
</DialogContent>
 </Dialog></>
  )
}

export default MessagePage