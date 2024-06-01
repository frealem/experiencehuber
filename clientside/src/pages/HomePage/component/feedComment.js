import React, { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  Typography,
  Box,
  styled,
  useTheme,
  IconButton,
} from "@mui/material";
import CommentsBox from "../../EachPost/component/commentsBox";
import { Close } from "@mui/icons-material";

const ModalContent = styled(Box)({
  borderRadius: "8px",
  padding: "16px",
  maxWidth: "500px",
  width: "90%",
});

const Input = styled(TextField)({
  marginBottom: "16px",
});

const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "16px",
});

const CommentModal = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const theme = useTheme();

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // onSubmit({ name, comment });
    // setName('');
    // setComment('');
    // onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ModalContent
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.secondary[100],
        }}
      >
        <Box display="flex" justifyContent="flex-end">
          <IconButton aria-label="close" onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Box
          sx={{
            mt: "-20px",
          }}
        >
          <CommentsBox />
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;
