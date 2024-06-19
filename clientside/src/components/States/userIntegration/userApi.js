import axios from 'axios';
import axiosInstance from '../interceptor';
import { toast } from 'react-toastify';

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
    const response = await axiosInstance.get('/user/current');
    return response.data;
  } catch (error) {
    throw new Error('Failed to get current user.');
  }
}

export const getOneUserApi = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user/one/${userId}`);
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

export const getAllAdminsApi = async () => {
  try {
    const response = await axiosInstance.get(`/superadmin/admin/`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get all users.');
  }
};

export const changePasswordApi = async(data) =>{
  try{
    const response = await axiosInstance.post('/user/changepassword', data);
    console.log(Response.data)
    return response.data;
  }catch(error){
    throw new Error('Failed to change password')
  }
}

export const createAdminApi = async(data) => {
  try{
    const response = await axiosInstance.post('/superadmin/admin',data);
    console.log(response.data);
    return response.data;
  }catch(error){
    throw new Error('failed to create admin');
  }
}

export const getNotificationsApi = async() => {
  try{
    const response = await axiosInstance.get('/notification');
    return response.data;
  }catch(error){
    throw new Error('failed to fetch notifications');
  }
}
export const searchUserApi = async(query, page, pageSize)=>{
  try {
    const page = 1;
    const pageSize = 20;
    const usersData = await axiosInstance.get(`/user/search?query=${query}&page=${page}&pageSize=${pageSize}`);
    console.log("hello")
  return usersData.data;
  } catch (error) {
    throw new Error('failed to fetch users');
  }
  
}


export const updateUserAccount = async(data) =>{
  try{
    const response = await axiosInstance.put(`/account/update`, data)
    return response.data;
  }catch(error){
    toast.error("Couldn't update account")
  }
}