import React, { useState } from "react";
import { Button, Card, CardContent, Grid }  from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";

const MapComponent = ({ onSelectLocation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [placeName, setPlaceName] = useState("");

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCurrentLocation({ latitude, longitude });
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
          .then((response) => response.json())
          .then((data) => setPlaceName(data.display_name));
      }, (error) => {
        console.error(error);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleConfirmLocation = () => {
    onSelectLocation({ ...currentLocation, placeName });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Button variant="contained" color="primary" onClick={handleGetCurrentLocation}>
              Get Current Location
            </Button>
          </CardContent>
        </Card>
      </Grid>
      {currentLocation && (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <MapContainer center={[currentLocation.latitude, currentLocation.longitude]} zoom={15} style={{ height: "300px", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </MapContainer>
              <Button variant="contained" color="primary" onClick={handleConfirmLocation}>
                Confirm Location
              </Button>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default MapComponent;
