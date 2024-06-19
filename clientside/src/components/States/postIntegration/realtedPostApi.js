import axiosInstance from "../interceptor";
import {toast} from "react-toastify"

export const getRelatedPostApi = async(postId) =>{
    try{
      const response = await axiosInstance.get(`/postreview/post/${postId}`);
      console.log('hello')
      console.log(response.data)
      if(response.status !== 200){
        throw new Error(response.data.title)
      }
      return response.data;
    }catch(error){
      toast.error('failed to fecth related posts')
      //throw new Error("failed to like post");
    }
  }


export const createRelatedPostApi = async(data) =>{
    try{
      const response = await axiosInstance.post(`/postreview`, data);
      if(response.status !== 200){
        throw new Error()
      }
      return response.data;
    }catch(error){
      toast.error("Please login first")
      //throw new Error("failed to like post");
    }
}