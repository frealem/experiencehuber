import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import MapComponent from './component/mapPost'
// import ImageUploader from "./ImageUploader";

const LocationField = () => {
    const [openMap, setOpenMap] = useState(false);
   const [selectedLocation,setSelectedLocation]=useState("");
  
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
  
    return (
      <div>
        <TextField
          placeholder="Location"
          value={selectedLocation.placeName}
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <Button variant="text" color="secondary" onClick={handleOpenMap}>
                <MapIcon />
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