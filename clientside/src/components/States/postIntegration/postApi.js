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
    const response = await axiosInstance.delete(`/posts/${postId}`);
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
    throw new Error('Failed to get post.');
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

export const getPostByCurrentUser = async(postId) => {
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
    console.log(response.data)
    return response.data;
  }catch(error){
    throw new Error("failed to like post");
  }
}