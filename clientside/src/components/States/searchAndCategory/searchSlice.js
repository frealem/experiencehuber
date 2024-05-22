// searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk(
  'search/fetchPosts',
  async (_, { getState }) => {
    const { searchTerm, selectedCategory } = getState().search;
    const response = await axios.get('/api/posts', {
      params: {
        searchTerm,
        category: selectedCategory,
      },
    });
    return response.data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTerm: '',
    selectedCategory: null,
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm, setSelectedCategory } = searchSlice.actions;
export default searchSlice.reducer;