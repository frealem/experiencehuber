import { Box, Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, {useState, useEffect } from 'react'
import { posts } from '../../fakeData';
import AdminListComponent from '../component/AdminListComponent';
import AddIcon from '@mui/icons-material/Add';
import { getAllAdminsApi } from '../../components/States/userIntegration/userApi';
import { useNavigate } from "react-router-dom";
import CreateAdmin from './createAdmin';
function CategoryManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
          <AdminListComponent user={user}/> 
          </Box>
        )
      )}
     
     </Box>
    </>
  )
}

export default AdminManagement