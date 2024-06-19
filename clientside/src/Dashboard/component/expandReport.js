import React from 'react';
import { Box, Button, Collapse, Typography } from '@mui/material';

const ExpandableRow = ({post, guidline, expanded, onDelete, onBlock }) => {
  //const {name , reportCase} = guidline;
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Box display="flex" gap={2}>
        <Box flex="0.65">
          {post?(<>
          <Typography variant="h6" fontWeight={600}>
            {post.title}
          </Typography>
          <Typography>{post.detail}</Typography>
          <Box display="flex" justifyContent="start" mt={2}>
            <Button variant="contained" color="error" style={{ marginRight: '1rem' }} onClick={onDelete}>
              Delete
            </Button>
            <Button variant="contained" color="warning" onClick={onBlock}>
              Block
            </Button>
          </Box></>):"post deleted"}
        </Box>
        <Box display="flex" flexDirection="column" flex="0.35">
          {guidline?(<>
          <Typography variant="h6" fontWeight={600}>
            {guidline.name}
          </Typography>
          <Typography>{guidline.reportCase}</Typography></>):"guideline not found"}
        </Box>
      </Box>
    </Collapse>
  );
};

export default ExpandableRow;