import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rooReducer';


const persistConfig = {
key: 'root',
storage,
whitelist: ['theme','user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
reducer: persistedReducer,
// middleware: (getDefaultMiddleware) => [
// ...getDefaultMiddleware(),
// authMiddleware,
// ],
});

export const persistor = persistStore(store);