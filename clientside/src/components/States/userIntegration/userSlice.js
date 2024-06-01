import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import { deleteUserApi, editUserApi, getAllUsersApi, getCurrentUserApi, getOneUserApi } from "./userApi"; 
 
 
export const deleteUser = createAsyncThunk( 
  "user/deleteUser", 
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
  "user/editUser", 
  async (userData, { rejectWithValue }) => { 
    try { 
      const response = await editUserApi(userData); 
      return response.data; 
    } catch (error) { 
      return rejectWithValue(error.message); 
    } 
  } 
); 
 
export const getUser = createAsyncThunk("user/getUser", async (_, { rejectWithValue }) => {
  try {
    const response = await getCurrentUserApi();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
export const getOneUser = createAsyncThunk( 
  "user/getOneUser", 
  async (userId, { rejectWithValue }) => { 
    try { 
      const response = await getOneUserApi(userId); 
      return response.data; 
    } catch (error) { 
      return rejectWithValue(error.message); 
    } 
  } 
); 
export const getAllUsers = createAsyncThunk( 
    "user/getAllUsers", 
    async ( _, { rejectWithValue }) => { 
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
    user:null,
    oneUser:null 
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
        state.users = action.payload; 
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
        state.users = state.users.filter((user) => user.id !== action.payload.id); 
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
          state.users[index] = editUser; 
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
        state.user = action.payload; // Update the 'user' property directly
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      }) 
      .addCase(getOneUser.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      }) 
      .addCase(getOneUser.fulfilled, (state, action) => { 
        state.loading = false; 
        state.oneUser=action.payload; 
        state.error = null; 
      }) 
      .addCase(getOneUser.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      }); 
  }, 
}); 
 
export default userSlice.reducer;