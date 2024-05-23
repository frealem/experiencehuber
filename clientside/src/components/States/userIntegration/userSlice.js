import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteUserApi, editUserApi, getAllUsersApi, getUserApi } from "./userApi";


export const deleteUser = createAsyncThunk(
  "user/deletePost",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await deleteUserApi(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editUser = createAsyncThunk(
  "post/editPost",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await editUserApi(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "post/getuser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getUserApi(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getAllUsers = createAsyncThunk(
    "post/getalluser",
    async ( { rejectWithValue }) => {
      try {
        const response = await getAllUsersApi();
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.posts.filter((user) => user.id !== action.payload.id);
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        const editUser = action.payload;
        const index = state.users.findIndex((user) => user.id === editUser.id);
        if (index !== -1) {
          state.posts[index] = editUser;
        }
        state.error = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users[action.payload.id] = action.payload;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;