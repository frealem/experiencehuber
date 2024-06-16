export const getCateogriesApi = async() => {
    try{
      const response = await axiosInstance.get(`/report`);
      console.log(response.data)
      return response.data;
    } catch(error){
      throw new Error('Failed to get system summary');
    }
}

export const getCateogryApi = async() => {
    try{
      const response = await axiosInstance.get(`/report`);
      console.log(response.data)
      return response.data;
    } catch(error){
      throw new Error('Failed to get system summary');
    }
}

export const createCateogryApi = async(data) => {
    try{
      const response = await axiosInstance.get(`/report`);
      console.log(response.data)
      return response.data;
    } catch(error){
      throw new Error('Failed to get system summary');
    }
}