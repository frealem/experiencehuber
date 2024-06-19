import { Box, Button, Checkbox,useMediaQuery, FormControlLabel, FormGroup, Typography, useTheme, AccordionSummary, Accordion ,AccordionDetails} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyButton from '../../components/myButton';
import { getCateogriesApi } from '../../components/States/adminIntegration/categoryApi';
import { ExpandCircleDown } from '@mui/icons-material';
import { updateUserAccount } from '../../components/States/userIntegration/userApi';
import { useNavigate } from 'react-router-dom';


const CategoryChoice = () => {
  const theme = useTheme();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [cateogries, setCategories] = useState([]);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  useEffect(()=>{
    const getCat = async()=>{
      const data = await getCateogriesApi();
      setCategories(data)
    }
    getCat();
  },[])

  const handleCheckboxChange = (id) => {
    if (!selectedOptions.includes(id)) {
      setSelectedOptions((prevOptions) => [...prevOptions, id]);
    } else {
      setSelectedOptions((prevOptions) => prevOptions.filter((option) => option !== id));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // await axios.post('/api/submit-data', { selectedOptions });
      const data ={preferedCategories: selectedOptions}
      const updated = await updateUserAccount(data);
      navigate('/')
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
        Check your preference?
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
        {cateogries?.map((report) => (
<Accordion key={report._id}>
<AccordionSummary expandIcon={<ExpandCircleDown />}>
<FormControlLabel
control={
<Checkbox

color="secondary"
checked={selectedOptions.includes(report._id)}
onChange={() => handleCheckboxChange(report._id)}
/>
}
label={report.name}
/>
</AccordionSummary>
<AccordionDetails>
<Typography width='300px' >{report.description}</Typography>
</AccordionDetails>
</Accordion>
))}
        <MyButton type="submit" variant="contained" color="primary" onClick={handleSubmit}>
          To My Feed
        </MyButton>
      </Box>
    </Box>
  );
};

export default CategoryChoice;