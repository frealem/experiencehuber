import axios from 'axios';

const authMiddleware = ({ getState }) => (next) => (action) => {
  const { auth } = getState();
  const { accessToken } = auth;

  if (accessToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  return next(action);
};
export default authMiddleware;