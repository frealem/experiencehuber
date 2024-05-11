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
// import ImageUploader from "./ImageUploader";

const LocationField = () => {
  const [openMap, setOpenMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleOpenMap = () => {
    setOpenMap(true);
  };

  const handleCloseMap = () => {
    setOpenMap(false);
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    handleCloseMap();
  };

  const { register, handleSubmit, control } = useForm();

  return (
    <div>
      <StyledInputWithValidation
        placeholder="Location"
        value={selectedLocation.placeName}
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
    </div>
  );
};

const CreatePost = () => {
  const [capturedImages, setCapturedImages] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  const onSubmit = async (data) => {
    try {
      const location = selectedLocation; // Get the selected location from the state of the LocationField component
      const images = capturedImages; // Get the captured images from the state of the ImageUploaderComponent component

      // Add location and images data to the form data
      const postData = { ...data, location, images };

      // Call the createPostApi function from postApi.js to create the post
      const createdPost = await createPostApi(postData);
      console.log('Created post:', createdPost);

    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleLocationSelect = (location) => {
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
          <LocationField onLocationSelect={handleLocationSelect} style={{ display: 'block' }} />
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
