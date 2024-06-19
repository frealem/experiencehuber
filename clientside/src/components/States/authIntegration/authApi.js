import axios from "axios";
import {toast} from 'react-toastify'

export const registerApi = async (formData) => {
  try {
    const response = await axios.post("http://localhost:5000/api/user/register", formData);
    if(response.status!==200){
      throw new Error();
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error("Registration failed");
      throw new Error(error.response.data);
    } else {
      toast.error("Registration failed");
      throw new Error("An error occurred during registration.");
    }
  }
};

export const loginApi = async (credentials) => {
  try {
    const {status , data} = await axios.post("http://localhost:5000/api/user/login", credentials);
    console.log(status)
    if(status !== 200){
      throw new Error()
    }else{
      return data; 
    }  
  } catch (error) {
    toast.error("Passwoord or email incorrect");
    throw new Error()
  }
};


