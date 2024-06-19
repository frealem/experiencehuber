import axiosInstance from "../interceptor";

export const getCateogriesApi = async() => {
    try{
      const response = await axiosInstance.get(`/category`);
      return response.data;
    } catch(error){
      throw new Error('Failed to get system summary');
    }
}

export const getCateogryApi = async(id) => {
    try{
      const response = await axiosInstance.get(`/category/${id}`);
      console.log(response.data)
      return response.data;
    } catch(error){
      throw new Error('Failed to get system summary');
    }
}

export const createCateogryApi = async(data) => {
    try{
      const response = await axiosInstance.post(`/category`, data);
      console.log(response.data)
      return response.data;
    } catch(error){
      throw new Error('Failed to get system summary');
    }
}

export const deleteCateogryApi = async(id) => {
    try{
      const response = await axiosInstance.delete(`/category/${id}`);
      console.log(response.data)
      return response.data;
    } catch(error){
      throw new Error('Failed to get system summary');
    }
}

export const updateCateogryApi = async(id, data) => {
    try{
      const response = await axiosInstance.put(`/category/${id}`, data);
      console.log(response.data)
      return response.data;
    } catch(error){
      throw new Error('Failed to get system summary');
    }
}