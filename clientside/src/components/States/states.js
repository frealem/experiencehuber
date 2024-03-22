import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  userId: "63701cc1f03239b7f700000e",
  token:"null"
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin:(state,action)=>{
      state.user=action.payload.user;
      state.token=action.payload.token;
    },
    setLogout:(state)=>{
      state.user=null;
      state.token=null;
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;