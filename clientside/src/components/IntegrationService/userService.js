import axios from 'axios';

export const getUser=()=>localStorage.getItem('user')?
JSON.parse(localStorage.getItem('user')):null;

export const login =async(email,password)=>{
    const{data}=await axios.post('http://localhost:3001/api/user/login',{email,password});
    localStorage.setItem('user',JSON.stringify(data));
    return data;
} 
export const register=async registerData=>{
    const {data}=await axios.post('http://localhost:3001/api/user/register',registerData)
    localStorage.setItem('user',JSON.stringify(data));
    return data;
};

export const logout=()=>{
    localStorage.removeItem('user');
}
export const updateProfile = async user => {
    const { data } = await axios.put('http://localhost:3001/api/users/updateProfile', user);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  };
 // change password request
  export const changePassword = async passwords => {
    await axios.put('http://localhost:3001/api/users/changePassword', passwords);
  }