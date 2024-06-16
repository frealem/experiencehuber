import axiosInstance from "../interceptor";


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
      console.log(response.data)
      return response.data;
    } catch(error){
      throw new Error('Failed to get system summary');
    }
  }