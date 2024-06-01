import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { posts } from '../../fakeData';
import UserListComponent from '../component/usersList';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersApi } from '../../components/States/userIntegration/userApi';

function UserManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
const dispatch = useDispatch();
const [users,setUsers]=useState([])
const token=localStorage.getItem("accessToken");
// // Delete a user
// const handleDeleteUser = (userId) => {
//   dispatch(deleteUser(userId));
// };

// // Edit a user
// const handleEditUser = (userData) => {
//   dispatch(editUser(userData));
// };


// // Get all users
const allUsers=async()=>{
  setUsers(await getAllUsersApi());
}
useEffect(() => {
  allUsers()
  console.log(allUsers);

}, [token]);

// users.map(({
//   _id,name,createdAt
// })=>(<UserListComponent 
// key={_id}
// id={_id}
// name={fullName}
// createDate={createdAt}
// />))

  return (
    <>
    <Box mt={10}
      marginLeft={!isMobile ? "300px" : "10px"}
      marginRight={isMobile ? "10px" : null}>
      <Typography  color={theme.palette.secondary.main} fontSize={18} mb={2}>User Management</Typography>
        {posts.map(
        () => (<Box>
          <UserListComponent/> 
          </Box>
        )
      )}
     </Box>
    </>
  )
}

export default UserManagement