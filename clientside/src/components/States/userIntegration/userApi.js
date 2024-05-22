import axios from 'axios';

export const deleteUserApi = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete post.');
  }
};

export const editUserApi = async (userData) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/user/${userData.id}`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to edit user.');
  }
};

// export const getUserApi = async (userId) => {
//   try {
//     const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
//     return response.data;
//   } catch (error) {
//     throw new Error('Failed to get user.');
//   }
// };
export const getCurrentUserApi = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/user');
    return response;
  }catch (error) {
    throw new Error('Current user non existent!');
  }
}

export const getAllUsersApi = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/users`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to get All user.');
    }
  };