import axios from 'axios';

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

export const getOneChatApi = async (firstId,secondId) => {
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