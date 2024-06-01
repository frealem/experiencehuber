import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createPostApi, deletePostApi, editPostApi, getPostApi } from "./postApi";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await createPostApi(postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await deletePostApi(postId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editPost = createAsyncThunk(
  "post/editPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await editPostApi(postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPost = createAsyncThunk(
  "post/getPost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await getPostApi(postId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload.id);
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.loading = false;
        const editedPost = action.payload;
        const index = state.posts.findIndex((post) => post.id === editedPost.id);
        if (index !== -1) {
          state.posts[index] = editedPost;
        }
        state.error = null;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
        state.error = null;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;