import axios from "axios";

export const registerApi = async (userData) => {
  try {
    const response = await axios.post("/api/auth/register", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const loginApi = async (userData) => {
  try {
    const response = await axios.post("/api/auth/login", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};