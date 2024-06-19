// Client-side (React.js with Material UI)
import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';
import axios from 'axios';

const SearchUser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/additional/query?search=${searchQuery}&page=${1}&pageSize=${20}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 500,
        bgcolor: 'background.paper',
        boxShadow: 3,
        borderRadius: 2,
        p: 2,
      }}
    >
      <Autocomplete
        freeSolo
        id="search-input"
        options={searchResults}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <ListItem {...props}>
            <ListItemAvatar>
              <Avatar alt={option.name} src={option.image} />
            </ListItemAvatar>
            <ListItemText
              primary={option.name}
              secondary={
                <Typography variant="body2" color="text.secondary">
                  {option.description}
                </Typography>
              }
            />
          </ListItem>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <Box sx={{ mr: 1 }}>
                  <Avatar alt="Search" src="/search-icon.png" />
                </Box>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};

export default SearchUser;