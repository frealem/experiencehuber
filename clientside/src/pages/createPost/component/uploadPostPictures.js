import React, { useState } from "react";
import { Button, Grid, Input, Typography, Dialog, DialogTitle, DialogContent, DialogActions,IconButton } from "@mui/material";
import Webcam from "react-webcam";
import axios from "axios";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
const ImageUploaderComponent = () => {
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
  };

  const uploadImages = async () => {
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      setImages([]); // Clear the captured images after successful upload
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileInputChange = async (event) => {
    const files = Array.from(event.target.files);
    const fileUrls = [];

    for (const file of files) {
      const imageUrl = await readFileAsDataURL(file);
      fileUrls.push(imageUrl);
    }

    setImages((prevImages) => [...prevImages, ...fileUrls]);
  };

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
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
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
    <Button variant="contained" color="primary" onClick={uploadImages} style={{ marginTop: 20 }}>
      Upload Images
    </Button>
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