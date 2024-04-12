import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
// import ImageUploader from "./ImageUploader";

const LocationField = () => {
    const [openMap, setOpenMap] = useState(false);
    const [location, setLocation] = useState("");
  
    const handleOpenMap = () => {
      setOpenMap(true);
    };
  
    const handleCloseMap = () => {
      setOpenMap(false);
    };
  
    const handleSelectLocation = (selectedLocation) => {
      setLocation(selectedLocation);
      handleCloseMap();
    };
  
    return (
      <div>
        <TextField
          label="Location"
          value={location}
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <Button variant="text" color="primary" onClick={handleOpenMap}>
                <MapIcon />
              </Button>
            ),
          }}
        />
  
        <Dialog open={openMap} onClose={handleCloseMap}>
          <DialogTitle>Select Location</DialogTitle>
          <DialogContent>
            {/* Implement your Google Maps component here */}
            {/* When a location is selected, call handleSelectLocation with the selected location */}
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
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission logic here
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <TextField label="Name" variant="outlined" fullWidth margin="normal" />
        <LocationField />
        {/* <ImageField /> */}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    );
  };
  
  export default CreatePost;