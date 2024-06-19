import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { persistor, store } from './components/States/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
        <ToastContainer
      position='bottom-right'
      autoClose={5000}
      hideProgress={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// const submitLogin = async (values) => {
//     toast.success('Login');
//     setIsLoading(true);
//       try {
//         await new Promise((resolve) => {
//           setTimeout(() => {
//             const { email, password } = values;
//             const formData = { email, password };
//             dispatch(loginUser(formData));
//             console.log('Performing login or registration...');
//             resolve();
//           }, 2000);
//         });
//       } 
//       catch (error) {
//         console.error(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };