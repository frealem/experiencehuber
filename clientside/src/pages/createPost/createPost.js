import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
  Grid,
} from "@mui/material";
import MapComponent from "./component/mapPost";
import ImageUploaderComponent from "./component/uploadPostPictures";
import AddLocationAlt from "@mui/icons-material/AddLocationAlt";
import StyledInputWithValidation from "../../components/input";
import MyButton from "../../components/myButton";
import { useForm } from "react-hook-form";
import { createPostApi, createPostPreview, uploadApi } from "../../components/States/postIntegration/postApi";
import { useDispatch, useSelector } from "react-redux";
import { getUser} from "../../components/States/userIntegration/userSlice";
import axiosInstance from "../../components/States/interceptor";
import { useNavigate, useLocation } from 'react-router-dom'
import { getCateogriesApi } from "../../components/States/adminIntegration/categoryApi";
import EditableRatingComponent from "../../components/Rating2";


const LocationField = ({ selectedLocation, setSelectedLocation }) => {
  const [openMap, setOpenMap] = useState(false);
 

  const handleOpenMap = () => {
    setOpenMap(true);
  };

  const handleCloseMap = () => {
    setOpenMap(false);
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation({
      latitude: location.lat,
      longitude: location.lng,
      name: location.placeName // Set the placeName property
    });
    //onLocationChange(`${location.lat},${location.lng}`); // Pass the combined lat and lng as a string to the parent component
    handleCloseMap();
  };

  const { register, handleSubmit, control } = useForm();

  return (
    <div>
     <StyledInputWithValidation
  placeholder="Location"
  value={selectedLocation.name} // Display the placeName
  variant="outlined"
  control={control}
  name="location"
  margin="normal"
  InputProps={{
    endAdornment: (
      <Button variant="text" color="secondary" onClick={handleOpenMap}>
        <AddLocationAlt />
      </Button>
    ),
  }}
/>

      <Dialog open={openMap} onClose={handleCloseMap}>
        <DialogTitle>Select Location</DialogTitle>
        <DialogContent>
          <MapComponent onSelectLocation={handleSelectLocation} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMap} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Hidden input fields to store lat and lng values */}
      <input type="hidden" {...register("location.lat", { value: selectedLocation.lat })} />
      <input type="hidden" {...register("location.lng", { value: selectedLocation.lng })} />
    </div>
  );
};


const CreatePost = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [capturedImages, setCapturedImages] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({ latitude: "", longitude: "", name: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const special = location.state;
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [rate , setRate] = useState(0);

  const handleRate = (e) =>{
    console.log(e.target.value)
    setRate(e.target.value)
  }

  useEffect(()=>{
    const getCategories = async() =>{
      const categoryData = await getCateogriesApi();
      setCategories(categoryData);
    }
    getCategories()
  },[])

  const arrangePostData = async(data)=>{
    const location = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      name: selectedLocation.name,
    };

    console.log(location)
    let responses = [];
    
    for(var i = 0; i<capturedImages.length; i++ ){
      console.log(capturedImages[i])
      const formdata = new FormData();
      formdata.append("file", capturedImages[i]);
      //console.log(formdata.files)
      //console.log(capturedImages)
      console.log("hello befor")
      const response = await axiosInstance.post('/post/uploadimages', formdata);
      responses.push(response.data)
    }
    console.log(responses)
    const postData = {
      ...data,
      rating: rate,
      location: location,
      special: special? special: false,
      categoryId: selectedCategory,
      imageURL: [...responses]
    };
    return postData
  }
  const onSubmit = async (data) => {
    try {
      const postData = await arrangePostData(data);
      const createdPost = await createPostApi(postData);
      console.log(`created post: ${createdPost}`)
      if(special){
        navigate('/specialposemanagment')
      }else{
        navigate('/myposts');
      }     
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const { handleSubmit, control, setValue, watch , getValues} = useForm();

  const [inputHeight, setInputHeight] = useState('auto');

  const handleInputChange = (event) => {
    setValue('description', event.target.value);
    setInputHeight(`${event.target.scrollHeight}px`);
  };

  const descriptionValue = watch('description', '');

  const handleSelect = (e) => {
    setSelectedCategory(e.target.value);
  }
  const handleCreatePreview = async() =>{
    try{
      const postData = await arrangePostData(getValues());
      const preview = await createPostPreview(postData);
      console.log(postData);
      navigate('/mydrafts');
    }catch(error){
    }
  }
 
  return (<Box >
    <Box display='flex' gap={isMobile?10:40} sx={{backgroundColor:theme.palette.secondary.main}}>
    {/* <Typography onClick={()=>navigate('/')} fontWeight="900"
              color="white"
              fontSize={32} fontFamily='monospace' variant="h3"
              mb={3}
              mt={3}
              ml={2}
             >{isMobile?<HomeOutlined/>:'ExperienceHub'}</Typography> */}
  <Typography
              variant="h3"
              align="center"
              fontWeight="600"
              color="white"
              marginBottom={3}
              mt={3}
            >
            Create Post
            </Typography>
  </Box>
  <Box display="flex" justifyContent="center" marginBottom="16px">
      <form onSubmit={handleSubmit(onSubmit)}>
      {isMobile ? (<><Box marginBottom="16px">
          <StyledInputWithValidation
            placeholder="Title of your experience ..."
            variant="outlined"
            margin="normal"
            control={control}
            name="title"
            required
            style={{ display: 'block'}}
          />
        </Box>
        <Box marginBottom="16px">
        <StyledInputWithValidation
        placeholder="Detail about your Experience ..."
        multiline
        inputProps={{ maxLength: 1000 }}
        control={control}
        name="description"
        required
        style={{ display: 'block', height: inputHeight }}
        onChange={handleInputChange}
        value={descriptionValue}
      />
        </Box>
        <Box marginBottom="16px">
          <StyledInputWithValidation
            placeholder="Website link of your experience http://exampleexperience.com "
            variant="outlined"
            margin="normal"
            control={control}
            name="link"
            required
            style={{ display: 'block' }}
          />
        </Box>
        <Box marginBottom="16px">
        {/* <StyledInputWithValidation
  placeholder="Give rate for your experience"
  type="number"
  variant="outlined"
  margin="normal"
  control={control}
  name="rating"
  required
  style={{ display: 'block' }}
  InputProps={{
    inputProps: {
      max: 5,
    },
  }}
/> */}
<EditableRatingComponent value={rate} onChange={(e)=>handleRate(e)}/>
        </Box>
        <FormControl fullWidth>
        < InputLabel id="release-time-select-label">Release Time</InputLabel>
          <Select
            labelId="release-time-select-label"
            id="release-time-select"
            value={selectedCategory?.name}
            onChange={handleSelect}
           >
          <MenuItem value="">All Cateories</MenuItem>
             {categories?.map((time) => (
               <MenuItem key={time?._id} value={time?._id}>
                 {time?.name}
               </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Box marginBottom="16px">
          <LocationField selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}  style={{ display: 'block' }} />
        </Box>
        <Box marginBottom="16px">
          <ImageUploaderComponent style={{ display: 'block' }} setCapturedImages={setCapturedImages}/>
        </Box>
        <Box>
          <MyButton type="submit" variant="contained" color="primary">
            Create Post
          </MyButton>
        </Box>
        {!special? (<Box marginTop="5px">
          <MyButton variant="contained" color="primary" onClick={handleCreatePreview}>
            Create Preview
          </MyButton>
        </Box>):(<></>)}
        </>):(<>
          <Box marginBottom="16px">
  <Grid container spacing={2}>
    <Grid item xs={4}>
      <StyledInputWithValidation
        placeholder="Title of your experience ..."
        variant="outlined"
        margin="normal"
        control={control}
        name="title"
        required
      />
    </Grid>
    <Grid item xs={4} mt={2}>
      <StyledInputWithValidation
        placeholder="Detail about your Experience ..."
        multiline
        inputProps={{ maxLength: 1000 }}
        control={control}
        name="description"
        required
        onChange={handleInputChange}
        value={descriptionValue}
      />
    </Grid>
    <Grid item xs={4}>
      <StyledInputWithValidation
        placeholder="Website link of your experience http://exampleexperience.com "
        variant="outlined"
        margin="normal"
        control={control}
        name="link"
        required
      />
    </Grid>
  </Grid>
</Box>

<Box marginBottom="16px">
  <Grid container spacing={2}>
    <Grid item xs={4}>
    {/* <StyledInputWithValidation
  placeholder="Give rate for your experience"
  type="number"
  variant="outlined"
  margin="normal"
  control={control}
  name="rating"
  required
  style={{ display: 'block' }}
  InputProps={{
    inputProps: {
      max: 5,
    },
  }}
/> */}
    <EditableRatingComponent value={rate} onChange={(e)=>handleRate(e)}/>
    </Grid>
    <Grid item xs={4}>
      <LocationField selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
    </Grid>
  </Grid>
  <Box margin="20px">
      <ImageUploaderComponent setCapturedImages={setCapturedImages} />
    </Box>
</Box>

<Box>
  <Grid container justifyContent="center">
    <Grid item>
    <Box>
          <MyButton type="submit" variant="contained" color="primary">
            Create Post
          </MyButton>
        </Box>
        {!special? (<Box marginTop="5px">
          <MyButton variant="contained" color="primary" onClick={handleCreatePreview}>
            Create Preview
          </MyButton>
        </Box>):(<></>)}
    </Grid>
  </Grid>
</Box></>)}
      </form>
    </Box>
    </Box>
  );
};

export default CreatePost;
