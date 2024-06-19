import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, {useState} from 'react'
import { deleteCateogryApi } from '../../components/States/adminIntegration/categoryApi';
import UpdateCategory from '../pages/updateCategories';

const CategoryListComponent = ({category, setCategories}) => {
    const theme=useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async() => {
        const deleted = await deleteCateogryApi(category._id);
        setCategories((prev)=>{
            const a = [...prev];
            return a.filter((item)=> item._id !== deleted._id);
        })
    }

    const handleClose = () =>{
        setIsOpen(false);
    }

    const handleUpdate = () => {
        setIsOpen(true);
    }

    return (
        <Box mb={1}>
            {isMobile ? (
                <Box
                    sx={{
                        backgroundColor: theme.palette.secondary[100],
                        borderRadius: 4,
                        padding: 2,
                        width: '90%',
                    }}
                >
                    <Box mr={1} gap={5} display="flex">
                        <Typography>{category.name}</Typography>
                        <Typography>id: {category?._id}</Typography>
                        <Typography>Role: {category?.description}</Typography>
                    </Box>
                    <Box display="flex" gap={3}>
                        <Typography onClick={handleUpdate}>update</Typography>
                        <Typography onClick={handleDelete}>delete</Typography>
                        <UpdateCategory category={category} open={isOpen} onClose={handleClose} setIsOpen={setIsOpen} setCategories={setCategories} />
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        backgroundColor: theme.palette.secondary[100],
                        borderRadius: 4,
                        padding: 2,
                        width: '900px',
                        color: theme.palette.secondary[900],
                    }}
                >
                    <Box mr={1} display="flex" justifyContent="space-between">
                        <Box display="flex" gap={2}>
                            <Typography>{category?.name}</Typography>
                            <Typography>id: {category?._id}</Typography>
                            <Typography>Role: {category?.description}</Typography>
                        </Box>
                        <Box display="flex" gap={1}>
                            <Typography onClick={handleUpdate}>update</Typography>
                            <Typography onClick={handleDelete}>delete</Typography>
                            <UpdateCategory category={category} open={isOpen} onClose={handleClose} setIsOpen={setIsOpen} setCategories={setCategories} />
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default CategoryListComponent