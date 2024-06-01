import { combineReducers } from 'redux';
import themeReducer from './themeSlice';
import authReducer from '../States/authIntegration/authSlice';
import usersReducer from '../States/userIntegration/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  user: usersReducer,
});

export default rootReducer;