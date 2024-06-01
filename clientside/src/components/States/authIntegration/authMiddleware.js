// import axios from 'axios';

// const authMiddleware = (store) => {
//   // Set up the Axios interceptor
//   axios.interceptors.request.use((config) => {
//     const state = store.getState();
//     const token = state.auth.accessToken; // the token is stored in the 'auth' slice

//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }

//     return config;
//   });

//   return (next) => (action) => {
//     return next(action);
//   };
// };

// export default authMiddleware;