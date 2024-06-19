import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axios from 'axios';
import { styled } from '@mui/material';

const YellowRating = styled(Rating)({
  color: 'yellow',
});

const RatingComponent = ({value}) => {

  return (
    <YellowRating
      name="customized-color"
      value={value? value: 0}
      max={5}
      precision={0.1}
      icon={<StarIcon />}
      emptyIcon={<StarBorderIcon />}
      readOnly
    />
  );
};

export default RatingComponent;