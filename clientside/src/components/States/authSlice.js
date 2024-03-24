import { createSlice } from "@reduxjs/toolkit";

 const  authSlice=createSlice({
    name:'auth',
    initialState:{
        user:null,
        token:null
    },
    reducers:{
        setLogin:(state,action)=>{

            const{user,accesssToken}=action.payload
            state.user=user
            state.token=accesssToken
        },
        setLogout:(state,action)=>{
            state.user=null
            state.user=null
        },
    }
 })

 export const {setLogin,setLogout}=authSlice.actions
 export default authSlice.reducer;

 export const selectCurrentUser=(state)=>state.auth.user
 export const selectCurrentToken=(state)=>state.auth.token
