import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './themeSlice';
import authReducer from "./authIntegration/authSlice";
import postReducer from "./postIntegration/postSlice";

export const store=configureStore({
    reducer:{
        theme:themeReducer,
        auth: authReducer,
        post: postReducer,
    },
})