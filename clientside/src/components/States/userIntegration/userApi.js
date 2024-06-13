import axios from 'axios';
import axiosInstance from '../interceptor';

export const deleteUserApi = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete user.');
  }
};

export const editUserApi = async (userData) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/user/${userData.id}`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to edit user.');
  }
};

export const getCurrentUserApi = async () => {
  try {
    const response = await axiosInstance.get('/user');
    return response.data;
  } catch (error) {
    throw new Error('Failed to get current user.');
  }
}

export const getOneUserApi = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get user.');
  }
}

export const getAllUsersApi = async () => { 
  try { 
    const response = await axiosInstance.get(`/admin/users`); 
    return response.data; 
  } catch (error) { 
    throw new Error('Failed to get all users.'); 
  } 
};