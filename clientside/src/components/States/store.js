// store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './themeSlice';
import authReducer from '../States/authIntegration/authSlice';
import usersReducer from '../States/userIntegration/userSlice';
import authMiddleware from '../States/authIntegration/authMiddleware';

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  user: usersReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme', 'auth', 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    authMiddleware,
  ],
});

export const persistor = persistStore(store);
