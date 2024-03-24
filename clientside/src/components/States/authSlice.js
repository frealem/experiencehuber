import { createSlice } from "@reduxjs/toolkit";

 const  authSlice=createSlice({
    name:'auth',
    initialState:{
        email:null,
        token:null
    },
    reducers:{
        setLogin:(state,action)=>{

            const{email,accesssToken}=action.payload
            state.email=email
            state.token=accesssToken
        },
        setLogout:(state,action)=>{
            state.email=null
            state.token=null
        },
    }
 })

 export const {setLogin,setLogout}=authSlice.actions
 export default authSlice.reducer;

 export const selectCurrentUser=(state)=>state.auth.user
 export const selectCurrentToken=(state)=>state.auth.token
