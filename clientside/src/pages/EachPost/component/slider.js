import React from 'react';

import { Box, Divider, Typography ,Carousel} from '@mui/material'

const Slider = ({ images }) => {
  return (
    <Carousel>
      {images.map((image, index) => (
        <Box key={index}>
          <img src={image} alt={`Slide ${index}`} style={{ width: '100%' }} />
        </Box>
      ))}
    </Carousel>
  );
};

export default Slider;