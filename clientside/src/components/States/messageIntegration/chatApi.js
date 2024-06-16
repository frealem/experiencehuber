import axios from 'axios';
import axiosInstance from '../interceptor';

export const createNewChatApi = async () => {
  try {
    const response = await axios.post(`http://localhost:5000/api/chat`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create chat.');
  }
};

export const userChatsApi = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/chat/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get all chats of currentUser');
  }
};

export const getOneChatApi = async (firstId, secondId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/chat/find/${firstId}/${secondId}`,firstId,secondId);
      return response.data;
    } catch (error) {
      throw new Error('Failed to get all chats of currentUser');
    }
  };

  export const createNewMessageApi = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/message`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create message.');
    }
  };

  export const getOneMessageApi = async (chatId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/chat/${chatId}`,chatId);
      return response.data;
    } catch (error) {
      throw new Error('Failed to get all chats of currentUser');
    }
  }; 

  export const getChatFreinds = async() => {
    try{
      const response = await axiosInstance.get(`/chatfreind`);
      console.log(response.data);
      return response.data;
    } catch(error){
      throw new Error('Failed to get user freinds');
    }
  }

  export const getMessages = async(userId) => {
    try{
      const response = await axiosInstance.get(`/message/messages/${userId}`);
      return response.data;
    }catch(error){
      throw new Error('Failed to fetch messages');
    }
  }

  export const sendMessage = async(message) =>{
    try{
      const response = await axiosInstance.post('/message', {body: message});
      return response.data;
    }catch(error){
      throw new Error(error);
    }
  }

  export const createChatFreindApi = async(data) => {
    try{
      const response = await axiosInstance.post('/chatfreind',data)
      console.log(response.data);
      return response.data;
    }catch(error){
      throw new Error("failed to create chat freind")
    }
  }