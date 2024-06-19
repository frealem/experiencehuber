import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  useTheme,
  Divider,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from '@mui/material';
import PostsWidget from '../widgets/postsWidget';
import { getCateogriesApi } from '../../components/States/adminIntegration/categoryApi';

// Sample data
const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror'];
const tags = ['Thriller', 'Romance', 'Adventure', 'Suspense', 'Documentary'];
const releaseTimes = ['Last 7 Days', 'Last 30 Days', 'Last 6 Months', 'Last Year', 'All Time'];

const FilteringPage = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedReleaseTimes, setSelectedReleaseTimes] = useState([]);
  const [sortByLatest, setSortByLatest] = useState(true);
  const [categories, setCategories] = useState([]);

  const handleGenreChange = (genre) => {
    const index = selectedGenres.indexOf(genre._id);
    if (index === -1) {
      setSelectedGenres([...selectedGenres, genre._id]);
    } else {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre._id));
    }
  };

  const handleTagChange = (tag) => {
    const index = selectedTags.indexOf(tag);
    if (index === -1) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    }
  };
  
  const handleReleaseTimeChange = (time) => {
    const index = selectedReleaseTimes.indexOf(time);
    if (index === -1) {
      setSelectedReleaseTimes([...selectedReleaseTimes, time]);
    } else {
      setSelectedReleaseTimes(selectedReleaseTimes.filter((t) => t !== time));
    }
  };
  const handleSortByChange = (event) => {
    setSortByLatest(event.target.checked);
  };

  const theme = useTheme();

  useEffect(()=>{
    const initialize = async()=>{
      const categoryData = await getCateogriesApi();
      console.log(categoryData);
      setCategories(categoryData)
    }
    initialize()
  },[])

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={5} mt={3}>
        <Typography
          variant="h3"
          style={{ margin: "0 10px" }}
          fontSize={24}
          fontWeight={600}
          color={theme.palette.secondary[100]}
        >
          {sortByLatest ? "LATEST POST" : "HIGH RATED POST"}
        </Typography>
        <Divider style={{ flexGrow: 1 }} />
      </Box>
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
          mx: 'auto',
          my: 4,
          px: 2,
        }}
      >
        
        <Grid container spacing={2} alignItems="center" sx={{backgroundColor: 'lightgray'}}>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container spacing={1}>
              {categories?.map((genre) => (
                <Grid item key={genre._id} xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedGenres.includes(genre)}
                        onChange={() => handleGenreChange(genre)}
                        color="secondary"
                      />
                    }
                    label={genre?.name}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
         <Grid item xs={12} sm={6} md={3}>
           <FormControl fullWidth>
           <InputLabel id="genre-select-label">Time line</InputLabel>
           <Select
            labelId="genre-select-label"
            id="genre-select"
            value={releaseTimes}
            onChange={handleGenreChange}
           >
           <MenuItem value="">Time line</MenuItem>
            {releaseTimes.map((genre) => (
            <MenuItem key={genre} value={genre._id}>
                {genre}
            </MenuItem>
            ))}
            </Select>
            </FormControl>
         </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={sortByLatest}
                  onChange={handleSortByChange}
                  color="secondary"
                />
              }
              label={sortByLatest ? 'Latest' : 'Highest Rated'}
              labelPlacement="start"
              sx={{
                float: 'right',
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Divider style={{ flexGrow: 1 }} />
      <Box display="flex" maxWidth="1000px" width="100%" gap={2}>
        <PostsWidget
          selectedGenres={selectedGenres}
          selectedTags={selectedTags}
          selectedReleaseTimes={selectedReleaseTimes}
          sortByLatest={sortByLatest}
        />
      </Box>
    </Box>
  );
};

export default FilteringPage;