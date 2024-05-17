import React, { useState } from "react";
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
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import MapComponent from "./component/mapPost";
import ImageUploaderComponent from "./component/uploadPostPictures";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import AddLocationAlt from "@mui/icons-material/AddLocationAlt";
import StyledInputWithValidation from "../../components/input";
import MyButton from "../../components/myButton";
import { useForm } from "react-hook-form";
import { createPostApi } from "../../components/States/postIntegration/postApi";

const LocationField = ({ onLocationChange }) => {
  const [openMap, setOpenMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({ lat: "", lng: "", placeName: "" });

  const handleOpenMap = () => {
    setOpenMap(true);
  };

  const handleCloseMap = () => {
    setOpenMap(false);
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation({
      lat: location.lat,
      lng: location.lng,
      placeName: location.placeName // Set the placeName property
    });
    onLocationChange(`${location.lat},${location.lng}`); // Pass the combined lat and lng as a string to the parent component
    handleCloseMap();
  };

  const { register, handleSubmit, control } = useForm();

  return (
    <div>
     <StyledInputWithValidation
  placeholder="Location"
  value={selectedLocation.placeName} // Display the placeName
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
  const [capturedImages, setCapturedImages] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({lat:"",lng:"",placeName:""});

  const onSubmit = async (data) => {
    try {
      const location = {
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        placeName: selectedLocation.placeName,
      };

      const postData = {
        ...data,
        location: location,
        images: capturedImages,
      };

      console.log(postData);
      const createdPost = await createPostApi(postData);
      console.log('Created post:', createdPost);
    
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const { handleSubmit, control, setValue, watch } = useForm();
  const theme = useTheme();
  const [inputHeight, setInputHeight] = useState('auto');

  const handleInputChange = (event) => {
    setValue('description', event.target.value);
    setInputHeight(`${event.target.scrollHeight}px`);
  };

  const descriptionValue = watch('description', '');
  return (<Box >
  <Box>
  <Typography
              variant="h4"
              align="center"
              fontWeight="400"
              color={theme.palette.secondary.main}
              marginBottom={3}
            >
              Create Post
            </Typography>
  </Box>
  <Box display="flex" justifyContent="center" marginBottom="16px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box marginBottom="16px">
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
          <StyledInputWithValidation
            placeholder="Give rate for your experience"
            type="number"
            variant="outlined"
            margin="normal"
            control={control}
            name="rate"
            required
            style={{ display: 'block' }}
          />
        </Box>
        <Box marginBottom="16px">
          <LocationField onLocationChange={handleLocationChange}  style={{ display: 'block' }} />
        </Box>
        <Box marginBottom="16px">
          <ImageUploaderComponent style={{ display: 'block' }} setCapturedImages={setCapturedImages}/>
        </Box>
        <Box>
          <MyButton type="submit" variant="contained" color="primary">
            Create Post
          </MyButton>
        </Box>
      </form>
    </Box>
    </Box>
  );
};

export default CreatePost;
