import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import { createNewChatApi, userChatsApi } from "./chatApi";
 
export const createNewChat = createAsyncThunk( 
  "chat/createNewChat", 
  async (id, { rejectWithValue }) => { 
    try { 
      const response = await createNewChatApi(id); 
      return response.data; 
    } catch (error) { 
      return rejectWithValue(error.message); 
    } 
  } 
); 

export const userChats = createAsyncThunk( 
    "chat/createNewChat", 
    async (id, { rejectWithValue }) => { 
      try { 
        const response = await userChatsApi(id); 
        return response.data; 
      } catch (error) { 
        return rejectWithValue(error.message); 
      } 
    } 
  ); 
 
const chatSlice = createSlice({ 
  name: "chat", 
  initialState: { 
    chats: [], 
    loading: false, 
    error: null, 
    chat:null 
  }, 
  reducers: {}, 
  extraReducers: (builder) => { 
    builder 
      .addCase(createNewChat.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      }) 
      .addCase(createNewChat.fulfilled, (state, action) => { 
        state.loading = false; 
        state.posts.push(action.payload); 
        state.error = null; 
      }) 
      .addCase(createNewChat.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      }) 

      .addCase(userChats.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      }) 
      .addCase(userChats.fulfilled, (state, action) => { 
        state.loading = false; 
        state.posts.push(action.payload); 
        state.error = null; 
      }) 
      .addCase(userChats.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      }) 
      
  }, 
}); 
 
export default chatSlice.reducer;