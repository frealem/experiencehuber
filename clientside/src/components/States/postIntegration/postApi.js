import axios from 'axios';
import axiosInstance from '../interceptor';
import {toast} from 'react-toastify';

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
    const response = await axiosInstance.delete(`/post/${postId}`);
    console.log(response)
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete post.');
  }
};

export const editPostApi = async (postData) => {
  try {
    const response = await axiosInstance.put(`/posts/${postData.id}`, postData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to edit post.');
  }
};

export const getPostApi = async (postId) => {
  try {
    const response = await axiosInstance.get(`/post/${postId}`);
    return response.data;
  } catch (error) {
    //throw new Error('Failed to get post.');
    toast.error("post not found")
  }
};

export const getLatestPostApi = async ()=>{
  try{
    const data = {page: 1, pageSize: 20}
    const response = await axiosInstance.get(`/additional/latest?page=${data.page}&pageSize=${data.pageSize}`);
    return response.data;
  }catch(error){
    throw new Error('failed to fetch latest post')
  }
}

export const getAllPosts = async () =>{
  try{
    const response = await axiosInstance.get('/additional/all');
    console.log(response.data);
    return response.data;
  }catch(error){
    throw new Error('failed to fetch all posts')
  }
}

export const getPostComments = async(postId) => {
  try{
    const response = await axios.get(`/api/comment/${postId}`);
    console.log(response.data);
    return response.data;
  }catch(error){
    throw new Error('failed to fetch all comments')
  }
}
export const createComment = async(comment) => {
  try{
    const response = await axiosInstance.post(`/comment`, comment);
    console.log(response.data);
    return response.data;
  }catch(error){
    throw new Error('failed to create comment')
  }
}
export const isLiked = async(postId) => {
  try{
    const response = await axiosInstance.get(`/account/isliked/${postId}`)
    return response.data;
  }catch(e){
    throw new Error('failed to check liked')
  }
}

export const getPostByCurrentUser = async() => {
  try{
    const response = await axiosInstance.get(`/additional/current`);
    console.log(response.data)
    return response.data;
  }catch(e){
    throw new Error('failed to fetch posts')
  }
}

export const getLikedPostsApi = async() => {
  try{
    const response = await axiosInstance.get(`/account/getliked`);
    console.log(response.data)
    return response.data;
  }catch(e){
    throw new Error('failed to fetch posts')
  }
}
export const likeApi = async(postId) =>{
  try{
    const response = await axiosInstance.post(`/account/like/${postId}`);
    if(response.status !== 200){
      throw new Error()
    }
    return response.data;
  }catch(error){
    toast.error("Please login first")
    //throw new Error("failed to like post");
  }
}

export const getSpecialPostsApi = async() =>{
  try{
    const response = await axiosInstance.get(`/additional/special?page=1&pageSize=20`);
    console.log(response.data)
    return response.data.results;
  }catch(error){
    throw new Error("failed to fetch special posts");
  }
}

export const searchPosts = async (query, page, pageSize) => {
  try {
    const response = await axiosInstance.get(`/additional/query?search=${query}&page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPostByUserApi = async(userId) => {
  try{
    const response = await axiosInstance.get(`/additional/owner/${userId}`);
    console.log(response.data)
    return response.data;
  }catch(e){
    throw new Error('failed to fetch posts')
  }
}

export const createPostPreview = async(data) =>{
  try{
    const response = await axiosInstance.post(`/postpreview`, data);
    return response.data; 
  }catch(error){
    throw new Error('failed to create posts preview')
  }
}

export const getPostPreviewByCurrentUser = async() => {
  try{
    const response = await axiosInstance.get(`/postpreview`);
    return response.data;
  }catch(e){
    throw new Error('failed to fetch posts')
  }
}

export const getPostsByPreference = async() => {
  try {
    const response = await axiosInstance.get("/additional/preference")
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error('couldnnot fecth post ')
  }
}

export const deletePostPreview = async(id) =>{
  try {
    const response = await axiosInstance.delete( `/postpreview/${id}`)
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error('couldnnot delete post preview')
  }
}