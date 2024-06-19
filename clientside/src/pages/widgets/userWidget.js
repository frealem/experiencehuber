import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  Person2Outlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FlexBetween from "../../components/Flexbetween";
import UserImage from "../../components/userImage";
import { getAllUsersApi, getCurrentUserApi, getOneUserApi } from "../../components/States/userIntegration/userApi";
import { setLogout } from "../../components/States/authIntegration/authSlice";

const UserWidget = ({ userId, picturePath }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  // const {type,accessToken} = useSelector((state) => state.auth);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;  

  
  const[usered,setUsered]=useState({})
  const token=localStorage.getItem("accessToken")
  const current=async()=>{
    setUsered(await getCurrentUserApi())
  }

  useEffect(()=>{
    try {
      if(token){
        current()
        //findOneUser()
        //findUsers()
        }
        else{navigate('/')}
    } catch (error) {
      
    }
    
    
  },[token, navigate])

  return (
    <Box>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/editprofile/${userId}`)}
      >
        <FlexBetween gap="1rem">
         <Link to='/editProfile'>{<Avatar/>||<UserImage size={50} usered={usered} />}</Link> 
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
            {usered?.fullName}
            </Typography>
            <Typography color={medium}>100 friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined onClick={setLogout}/>
      </FlexBetween>

      {/* SECOND ROW */}
      <Box p="0.5rem 0">
        <Box display="flex" alignItems="center" gap="1rem">
          <Person2Outlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{usered?.userName}</Typography>
        </Box>
      </Box>

    </Box>
  );
};

export default UserWidget;