import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from './components/States/store'
import { Provider } from 'react-redux';
import { AuthProvider } from './hooks/useAuth';
import './hooks/authInterceptor'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
  <AuthProvider>
    <App />
    </AuthProvider>
    </Provider>
  </React.StrictMode>
);

