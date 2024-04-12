import React, { useState } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MapComponent = ({ onSelectLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (event) => {
    const { latLng } = event;
    const latitude = latLng.lat();
    const longitude = latLng.lng();
    setSelectedLocation({ latitude, longitude });
  };

  const handleConfirmLocation = () => {
    onSelectLocation(selectedLocation);
  };

  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 0, lng: 0 }}
      onClick={handleMapClick}
    >
      {selectedLocation && (
        <Marker
          position={{
            lat: selectedLocation.latitude,
            lng: selectedLocation.longitude,
          }}
        />
      )}
      <button onClick={handleConfirmLocation}>Confirm Location</button>
    </GoogleMap>
  );
};

export default withGoogleMap(MapComponent);