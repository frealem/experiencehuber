import axios from "axios";

export const registerApi = async (formData) => {
  try {
    const response = await axios.post("http://localhost:5000/api/user/register", formData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error("An error occurred during registration.");
    }
  }
};

export const loginApi = async (credentials) => {
  try {
    const response = await axios.post("http://localhost:5000/api/user/login", credentials);
    return response.data; 
  } catch (error) {
    throw new Error(error.response.data);
  }
};


