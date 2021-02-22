import React, { useState, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"]; // prevent rerender

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 52.377956,
  lng: 4.89707,
};

const options = {
  disableDefaultUI: true,
};

export default function LocationSearch() {
  const [markers, setMarkers] = useState([]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries, // use places libraries
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map; // by doing this the map can be used anywhere in the code and not be rerendered
  }, []);

  // when function variables do not change do this instead of recreating the function everytime
  const onMapClick = useCallback((event) => {
    setMarkers(() => [
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
    ]);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.lat}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}
