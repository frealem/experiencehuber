import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box } from '@mui/system';
import { styled } from '@mui/system';

const MapContainerStyled = styled(MapContainer)`
  height: 400px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Map = ({ readonly, location }) => {
  console.log(location)
  return (
    <Box>
      {location.name? (
      <MapContainerStyled
        center={[ location.latitude,location.longitude]}
        zoom={1}
        dragging={!readonly}
        touchZoom={!readonly}
        doubleClickZoom={!readonly}
        scrollWheelZoom={!readonly}
        boxZoom={!readonly}
        keyboard={!readonly}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[location.latitude, location.longitude]}>
          <Popup>
            {location.name}
          </Popup>
        </Marker>
      </MapContainerStyled>): "Location not povided"}
    </Box>
  );
};

export default Map;