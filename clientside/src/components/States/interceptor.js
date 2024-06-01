// import axios from 'axios';
// import { store } from './store';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:5000/api/',
// });

// axiosInstance.interceptors.request.use((config) => {
//   const state = store.getState();
//   const accessToken = state.auth.accessToken;

//   // Add the access token to the request headers
//   config.headers = {
//     ...config.headers,
//     Authorization: `Bearer ${accessToken}`,
//   };
// console.log(config)
//   return config;
// });

// export default axiosInstance;


import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});


export default axiosInstance;