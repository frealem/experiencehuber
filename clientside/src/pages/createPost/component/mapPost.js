// import React, { useState } from "react";
// import { Button, Card, CardContent, Grid }  from "@mui/material";
// import { MapContainer, TileLayer } from "react-leaflet";

// const MapComponent = ({ onSelectLocation }) => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [placeName, setPlaceName] = useState("");

//   const handleGetCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;
//         setCurrentLocation({ latitude, longitude });
//         fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
//           .then((response) => response.json())
//           .then((data) => setPlaceName(data.display_name));
//       }, (error) => {
//         console.error(error);
//       });
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   // const handleConfirmLocation = () => {
//   //   onSelectLocation({ ...currentLocation, placeName });
//   // };

//   const handleConfirmLocation = () => {
//     const locationString = `${currentLocation.latitude},${currentLocation.longitude}`;
//     onSelectLocation(locationString,placeName);
//   };
//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={12}>
//         <Card>
//           <CardContent>
//             <Button variant="contained" color="primary" onClick={handleGetCurrentLocation}>
//               Get Current Location
//             </Button>
//           </CardContent>
//         </Card>
//       </Grid>
//       {currentLocation && (
//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <MapContainer center={[currentLocation.latitude, currentLocation.longitude]} zoom={15} style={{ height: "300px", width: "100%" }}>
//                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//               </MapContainer>
//               <Button variant="contained" color="primary" onClick={handleConfirmLocation}>
//                 Confirm Location
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>
//       )}
//     </Grid>
//   );
// };

// export default MapComponent;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, CardContent, Grid } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";

const MapComponent = ({ onSelectLocation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [savedLocation, setSavedLocation] = useState({
    lat: null,
    lng: null,
    placeName: ""
  });

  useEffect(() => {
    retrieveLocationFromDatabase();
  }, []);

  const retrieveLocationFromDatabase = () => {
    // Simulating retrieval of location from the database
    // Replace this with your actual database retrieval logic
    const storedLocation = {
      latitude: 37.7749,
      longitude: -122.4194,
    };
    setSavedLocation(storedLocation);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSaveLocation = async () => {
    try {
      // Simulating saving location to the database
      // Replace this with your actual database saving logic
      const { latitude, longitude } = currentLocation;
  
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
  
      const placeName = response.data.display_name;
      const locationToSave = { lat: latitude, lng: longitude, placeName };
      setSavedLocation(locationToSave);
      onSelectLocation(locationToSave); // Pass the selected location to the parent component
      console.log("Location saved:", locationToSave);
    } catch (error) {
      console.error("Failed to retrieve place name:", error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGetCurrentLocation}
            >
              Get Current Location
            </Button>
          </CardContent>
        </Card>
      </Grid>
      {currentLocation && (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <MapContainer
                center={[currentLocation.latitude, currentLocation.longitude]}
                zoom={15}
                style={{ height: "300px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </MapContainer>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveLocation}
              >
                Save Location
              </Button>
            </CardContent>
          </Card>
        </Grid>
      )}
      {savedLocation && (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <p>Saved Location:</p>
              <p>Latitude: {savedLocation.latitude}</p>
              <p>Longitude: {savedLocation.longitude}</p>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default MapComponent;