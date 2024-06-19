import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, {useState, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { getCateogriesApi } from '../../components/States/adminIntegration/categoryApi';
import CategoryListComponent from '../component/CategroyListComponent';
import CreateCategory from './createCategory';
import updateCategory from './updateCategories';
function CategoryManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    const getCategories = async() =>{
      const categoriesData = await getCateogriesApi();
      setCategories(categoriesData);
    }
    getCategories();
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
      < CreateCategory open={isOpen} onClose={handleClose} setIsOpen = {setIsOpen} setCategories={setCategories}/>
      
      </Box>
        {categories.map(
        (category) => (<Box>
          < CategoryListComponent category={category} setCategories={setCategories} /> 
          </Box>
        )
      )}
     
     </Box>
    </>
  )
}

export default CategoryManagement