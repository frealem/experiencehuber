import React, { useEffect, useState } from "react";
import { Button, Grid, Input, Typography, Dialog, DialogTitle, DialogContent, DialogActions,IconButton } from "@mui/material";
import Webcam from "react-webcam";
import axios from "axios";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


const ImageUploaderComponent = ({setCapturedImages}) => {
  const [images, setImages] = useState([]);
  const [openCaptureDialog, setOpenCaptureDialog] = useState(false);
  const [openBrowseDialog, setOpenBrowseDialog] = useState(false);

  const webcamRef = React.useRef(null);

  const openCaptureDialogHandler = () => {
    setOpenCaptureDialog(true);
  };

  const closeCaptureDialogHandler = () => {
    setOpenCaptureDialog(false);
  };
 
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImages((prevImages) => [...prevImages, imageSrc]);
    setCapturedImages((prevImages) => [...prevImages, imageSrc]); 
  };

  

  // const handleFileInputChange = async (event) => {
  //   const files = Array.from(event.target.files);
  //   const fileUrls = [];

  //   for (const file of files) {
  //     const imageUrl = await readFileAsDataURL(file);
  //     fileUrls.push(imageUrl);
  //   }

  //   setImages((prevImages) => [...prevImages, ...fileUrls]);
  //   setCapturedImages((prevImages) => [...prevImages, ...fileUrls]);
  // };
  const handleFileInputChange = async (event) => {
    const files = Array.from(event.target.files);
      const fileUrls = [];
  
      for (const file of files) {
        const imageUrl = await readFileAsDataURL(file);
        fileUrls.push(imageUrl);
      }
  
      setImages((prevImages) => [...prevImages, ...fileUrls]);
    setCapturedImages(event.target.files);
  }

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };
  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setCapturedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={openCaptureDialogHandler}>
        Capture Image
      </Button>
      <Button variant="contained" component="label">
            Browse
            <input type="file" multiple style={{ display: "none" }} accept="image/jpeg" onChange={handleFileInputChange} />
          </Button>

      <Dialog open={openCaptureDialog} onClose={closeCaptureDialogHandler}>
        <DialogTitle>Capture Image</DialogTitle>
        <DialogContent>
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" capture="environment"/>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={capture}>
            Capture
          </Button>
          <Button variant="contained" onClick={closeCaptureDialogHandler}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {images.length > 0 ? (
  <div>
    <Grid container spacing={2} style={{ marginTop: 20 }}>
      {images.map((image, index) => (
        <Grid item key={index} style={{ position: "relative" }}>
          <img
            src={image}
            alt={`Captured Image ${index}`}
            style={{ width: 200, height: 150, objectFit: "cover",borderRaduis:"8px" }}
          />
          <IconButton
            style={{ position: "absolute", top: 10, right: 0 }}
            onClick={() => removeImage(index)}
            color="secondary"
          >
            <CloseRoundedIcon/>
          </IconButton>
        </Grid>
      ))}
    </Grid>
  </div>
) : (
  <Typography variant="subtitle1" color="textSecondary" style={{ marginTop: 20 }}>
    No images captured
  </Typography>
)}
    </div>
  );
};

export default ImageUploaderComponent;