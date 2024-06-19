import { Box, Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, {useState, useEffect } from 'react'
import { posts } from '../../fakeData';
import AdminListComponent from '../component/AdminListComponent';
import AddIcon from '@mui/icons-material/Add';
import { getAllAdminsApi } from '../../components/States/userIntegration/userApi';
import { useNavigate } from "react-router-dom";
import CreateAdmin from './createAdmin';
import ConfirmationDialog from '../../components/confirmationBox';
function AdminManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isOpenConfirm, setOpenConfirm] = useState(false);
  const [selectedId, SetSeleletedId] = useState('');

  useEffect(()=>{
    const getAdmin = async() =>{
      const admins = await getAllAdminsApi();
      console.log(admins);
      setUsers(admins);
    }
    getAdmin();
  },[])

  const handleClose = () =>{
    setIsOpen(false);
  }
  const handleCreateAdmin = () => {
    setIsOpen(true);
  }

  const deleteAdmin = async() => {
    try {
      
      setUsers((prev)=>{
        const a = [...prev];
        return a.filter((item)=> item._id !== selectedId)
      })
    } catch (error) {
      console.log("error")
    }
  }

  const handleDelete = (userId)=>{
    setOpenConfirm(true)
    SetSeleletedId(userId)
    console.log("hello")
  }


  useEffect(()=>{
    const change =() =>
    change()
  },[users])
  return (
    <>
    <Box mt={10}
      marginLeft={!isMobile ? "300px" : "10px"}
      marginRight={isMobile ? "10px" : null}><Box display="flex" justifyContent="space-between" mb={5}>
      <Typography  color={theme.palette.secondary.main} fontSize={18} mb={2}>Admin Management</Typography>
      <IconButton 
      onClick={handleCreateAdmin}
      sx={{
        color:theme.palette.secondary[900],
        backgroundColor:theme.palette.secondary[100],
        height:"40px",
        width:"40px",
      }}><AddIcon/>
      </IconButton>
      <CreateAdmin open={isOpen} onClose={handleClose} setIsOpen = {setIsOpen} setUsers={setUsers}/>
      </Box>
        {users.map(
        (user) => (<Box>
          <AdminListComponent user={user} setUsers={setUsers} onDelete={()=> handleDelete(user._id)}/> 
          </Box>
        )
      )}
     <ConfirmationDialog open={isOpenConfirm} onCancel={()=> setOpenConfirm(false)} title="Delete admin" message="This action will permanently delete an admin are you sure to continue?" onConfirm={deleteAdmin}/>
     </Box>
    </>
  )
}

export default AdminManagement