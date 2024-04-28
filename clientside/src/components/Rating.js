import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axios from 'axios';
import { styled } from '@mui/material';

const YellowRating = styled(Rating)({
  color: 'yellow',
});

const RatingComponent = () => {
  const [value, setValue] = useState(0);

  const handleRatingChange = async (event, newValue) => {
    setValue(newValue);
    try {
      await axios.post('http://localhost:5000/ratings', { rating: newValue });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <YellowRating
      name="customized-color"
      value={value}
      onChange={handleRatingChange}
      max={5}
      icon={<StarIcon />}
      emptyIcon={<StarBorderIcon />}
    />
  );
};

export default RatingComponent;