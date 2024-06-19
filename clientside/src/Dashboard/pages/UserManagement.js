import { Box, Grid, Typography, useMediaQuery, useTheme, TextField } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react'
import { posts } from '../../fakeData';
import UserListComponent from '../component/usersList';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersApi, searchUserApi } from '../../components/States/userIntegration/userApi';
import SearchUser from '../../pages/HomePage/searchUser';
import { Input, Search } from '@mui/icons-material';
import axiosInstance from '../../components/States/interceptor';
import ConfirmationDialog from '../../components/confirmationBox';

function UserManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const token = localStorage.getItem("accessToken");
  const [isOpenConfirm, setOpenConfirm] = useState(false);
  const [selectedId, SetSeleletedId] = useState('');

  const allUsers = async() => {
    const user = await getAllUsersApi();
    setUsers(user);
  };

  useEffect(() => {
    allUsers();
  }, [token]);


  const deleteAdmin = async() => {
    try {
      setUsers((prev)=>{
        const a = [...prev];
        return a.filter((item)=> item._id !== selectedId)
      })
      setOpenConfirm(false)
    } catch (error) {
      console.log("error")
    }
  }

  const handleDelete = (userId)=>{
    setOpenConfirm(true)
    SetSeleletedId(userId)
    console.log("hello")
  }

  const debouncedSearchUser = useCallback(
    debounce(async (query) => {
      if (query) {
        const page = 1;
        const pageSize = 20;
        const usersData = await searchUserApi(query, page, pageSize);
        console.log(usersData)
        setUsers(usersData.results);
      } else {
        allUsers();
      }
    }, 500),
    []
  );

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    debouncedSearchUser(e.target.value);
  };

  return (
    <>
      <Box mt={10}
        marginLeft={!isMobile ? "300px" : "10px"}
        marginRight={isMobile ? "10px" : null}>
        <TextField
          value={query}
          onChange={handleQueryChange}
          placeholder="Search users..."
          InputProps={{
            startAdornment: <Search />,
          }}
        />
        <Typography color={theme.palette.secondary.main} fontSize={18} mb={2}>User Management</Typography>
        {users ? users.map(
          (user) => (
            <Box key={user.id}>
              <UserListComponent user={user} onDelete={()=>handleDelete(user._id)}/>
            </Box>
          )
        ) : ('loading...')}
      <ConfirmationDialog open={isOpenConfirm} onCancel={()=> setOpenConfirm(false)} title="Delete admin" message="This action will permanently delete a user permanently are you sure to continue?" onConfirm={deleteAdmin}/>
      </Box>
    </>
  );
}

export default UserManagement;

function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}