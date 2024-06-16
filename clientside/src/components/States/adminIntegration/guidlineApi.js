import axios from "axios";
import axiosInstance from "../interceptor"


export const getCommunityGuidLineApi = async() => {
    try{
      const response = await axiosInstance.get(`/guideline`);
      return response.data;
    } catch(error){
      throw new Error('Failed to create guidline');
    }
  }

  export const getOneCommunityGuidLineApi = async(id) => {
    try{
      const response = await axiosInstance.get(`/guideline/${id}`);
      return response.data;
    } catch(error){
      throw new Error('Failed to create guidline');
    }
  }

export const createCommunityGuidlineApi = async(data) => {
    try{
        const response = await axiosInstance.post('/guideline', data);
        return response.data;
    }catch(error){
        throw new Error('failed to create guidline')
    }
}

export const deleteCommunityGuidlineApi = async(id) => {
    try{
        const response = await axiosInstance.delete(`/guideline/${id}`);
        return response.data;
    }catch(error){
        throw new Error('failed to create guidline')
    }
}