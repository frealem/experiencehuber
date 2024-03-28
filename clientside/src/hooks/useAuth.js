import { useState, createContext, useContext } from 'react';
import * as userService from '../components/IntegrationService/userService';//check here

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser(''));
  const login = async (email, password) => {
    try {
      const user = await userService.login(email, password);
      setUser({ ...user, id: user.id }); // Include the user ID
      console.log("successful login!")
    } catch (err) {
      console.log("unsuccessful login")
    }
  };

 const register = async data => {
    try {
      const user = await userService.register(data);
      console.log(user)
      setUser(user);
     
    } catch (err) {   
         console.log("error while register!")
    }
  };

  const logout = () => {
    userService.logout();
    setUser(null);

  };

  const updateProfile = async user => {
    const updatedUser = await userService.updateProfile(user);
    if (updatedUser) setUser(updatedUser);
  };

 const changePassword = async passwords => {
  await userService.changePassword(passwords);
   logout();
    
  };/* */

  return (
    <AuthContext.Provider value={{ user, login, logout,register ,updateProfile,changePassword}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);




//, register, updateProfile, changePassword