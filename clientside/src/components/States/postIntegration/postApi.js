import axios from 'axios';
import axiosInstance from '../interceptor';

export const createPostApi = async (postData) => {
    try {
      const response = await axiosInstance.post('/post', postData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create post.');
    }
  };

  export const uploadApi = async (file) => {
    try {
      const formdata = FormData();
      formdata.append(file)
      const response = await axiosInstance.post('/post/uploadimages', formdata);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create post.');
    }
  };
export const deletePostApi = async (postId) => {
  try {
    const response = await axios.delete(`/api/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete post.');
  }
};

export const editPostApi = async (postData) => {
  try {
    const response = await axios.put(`/api/posts/${postData.id}`, postData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to edit post.');
  }
};

export const getPostApi = async (postId) => {
  try {
    const response = await axios.get(`/api/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get post.');
  }
};