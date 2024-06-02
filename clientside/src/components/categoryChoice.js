import { Box, Button, Checkbox, FormControlLabel, FormGroup, Typography, useTheme } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyButton from './myButton';

const CategoryChoice = () => {
  const theme = useTheme();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions((prevOptions) => [...prevOptions, value]);
    } else {
      setSelectedOptions((prevOptions) => prevOptions.filter((option) => option !== value));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // await axios.post('/api/submit-data', { selectedOptions });
      console.log('Data submitted successfully', selectedOptions);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h3" gutterBottom align="center" color="secondary" fontWeight={600}>
        How will You Want See ?
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <FormGroup
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <FormControlLabel
          sx={{
            padding: '8px 16px',
          }}
            control={
              <Checkbox
                value="option1"
                checked={selectedOptions.includes('option1')}
                onChange={handleCheckboxChange}
                color="secondary"
              />
            }
            label="Option 1"
          />
          <FormControlLabel
          sx={{
            padding: '16px',
          }}
            control={
              <Checkbox
                value="option2"
                checked={selectedOptions.includes('option2')}
                onChange={handleCheckboxChange}
                color="secondary"
              />
            }
            label="Option 2"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="option3"
                checked={selectedOptions.includes('option3')}
                onChange={handleCheckboxChange}
                color="secondary"
              />
            }
            label="Option 3"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="option6"
                checked={selectedOptions.includes('option6')}
                onChange={handleCheckboxChange}
                color="secondary"
              />
            }
            label="Option 6llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="option4"
                checked={selectedOptions.includes('option4')}
                onChange={handleCheckboxChange}
                color="secondary"
              />
            }
            label="Option 4"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="option5"
                checked={selectedOptions.includes('option5')}
                onChange={handleCheckboxChange}
                color="secondary"
              />
            }
            label="Option 5"
          />
        </FormGroup>
        <MyButton type="submit" variant="contained" color="primary" onClick={handleSubmit}>
          To My Feed
        </MyButton>
      </Box>
    </Box>
  );
};

export default CategoryChoice;