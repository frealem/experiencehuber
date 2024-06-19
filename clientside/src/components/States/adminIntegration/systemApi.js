import axiosInstance from "../interceptor";
import {toast} from "react-toastify";


export const getSystemsummaryApi = async() => {
    try{
      const response = await axiosInstance.get(`/system/${0}`);
      return response.data;
    } catch(error){
      throw new Error('Failed to get system summary');
    }
  }


export const getReportApi = async() => {
    try{
      const response = await axiosInstance.get(`/report`);
      console.log(response.status)
      if(response.status !== 200){
        throw new Error();
      }
      return response.data;
    } catch(error){
      toast.error("User not authorized")
    }
  }

  export const createReportApi = async(data) => {
    try{
      console.log(data)
      const response = await axiosInstance.post(`/report`, data);
      console.log(response.status)
      if(response.status !== 200){
        throw new Error();
      }
      return response.data;
    } catch(error){
      //console.log(error)
      toast.error("error while creating report")
    }
  }