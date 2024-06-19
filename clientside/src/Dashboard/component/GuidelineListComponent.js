import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, useTheme, useMediaQuery, IconButton } from "@mui/material";
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from "@mui/icons-material";
import TitleTwoLine from '../../components/titleTwoLine';
import { getNotificationsApi } from '../../components/States/userIntegration/userApi';
import {format} from 'date-fns'
import { deleteCommunityGuidlineApi } from '../../components/States/adminIntegration/guidlineApi';
import UpdateGuideline from '../pages/updateGuideline';

const GuidelineListComponent = ({guideline, setGuidelines}) => {
    const theme=useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [expanded, setExpanded] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

    console.log(guideline)
    const handleDelete = async() => {
      const deleted = await deleteCommunityGuidlineApi(guideline._id);
      console.log(deleted)
      setGuidelines((prev)=>{
        const a = [...prev];
        const b = a.filter((item)=> item._id !== deleted._id)
        return b;
      })
    }
    const handleExpand = () => {
        setExpanded(!expanded);
    };
    const handleClose = () =>{
      setIsOpen(false)
    }
    return(
    <Box width="100%" margin={2} borderRadius={10} border={1} borderColor={theme.palette.secondary.main} p={2} marginRight={isMobile ? "10px":undefined}>
    <TitleTwoLine variant="h6" component="h2" fontWeight="bold"  color={theme.palette.secondary.main}>
      {guideline.name}
    </TitleTwoLine>
    <Typography variant="body1" component="p" style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', '-webkit-line-clamp': expanded ? 'unset' : '2', '-webkit-box-orient': 'vertical' }}>
      {guideline.description}
    </Typography>
    {guideline.description.toString().length > 50 && (
      <IconButton onClick={handleExpand} size="small">
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
    )}
    <Typography variant="body2" component="p" align="right">
      {format(guideline.createdAt,  'MMM d yyyy')}
    </Typography>
    <Box display='flex' justifyContent='flex-end'>
    <Typography marginRight='10px' variant="body2" component="p" align="right" style={{color: 'green', fontSize: 15, fontWeight: 'bold'}} onClick={()=>setIsOpen(true)}>
      Update
    </Typography>
    <Typography variant="body2" component="p" align="right" style={{color: 'red', fontSize: 15, fontWeight: 'bold'}} onClick={handleDelete}>
      Delete
    </Typography>
    </Box>
    <UpdateGuideline guideline={guideline} open={isOpen} onClose={handleClose} setIsOpen = {setIsOpen} setGuidelines={setGuidelines}/>
    </Box>
  )
}

export default GuidelineListComponent