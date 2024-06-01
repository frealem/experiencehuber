import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Box } from '@mui/system';
import { styled } from '@mui/system';

const MapContainerStyled = styled(MapContainer)`
  height: 400px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Map = ({ readonly, location }) => {
  return (
    <Box>
      <MapContainerStyled
        center={[0, 0]}
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
      </MapContainerStyled>
    </Box>
  );
};

export default Map;