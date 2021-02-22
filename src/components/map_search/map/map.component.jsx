import React, { useState, useCallback, useRef } from "react";
import Search from "../search/search.component";
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

export default function Map() {
  const [marker, setMarker] = useState([]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries, // use places libraries
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    // use callback when function doesn't change
    mapRef.current = map; // by doing this the map can be used anywhere in the code and not be rerendered
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div>
      <Search panTo={panTo} setMarker={setMarker} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        <Marker
          key={marker.lat}
          position={{ lat: marker.lat, lng: marker.lng }}
        />
      </GoogleMap>
    </div>
  );
}
