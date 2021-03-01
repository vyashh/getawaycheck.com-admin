import React, { useState, useCallback, useRef, useEffect } from "react";
import Search from "../search/search.component";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Form } from "react-bootstrap";

const libraries = ["places"]; // prevent rerender

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const options = {
  disableDefaultUI: true,
};

export default function Map({ setAddress, setLatLng, latLng, address }) {
  const [marker, setMarker] = useState(
    latLng ? { lat: latLng.lat, lng: latLng.lng } : null
  );
  const [showMap, setShowMap] = useState(true); // close map view
  const [addressToUpdate, setAddressToUpdate] = useState(
    address ? address : null
  );
  const [latLngToUpdate, setLatLngToUpdate] = useState(latLng ? latLng : null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries, // use places libraries
  });
  const [center, setCenter] = useState(
    addressToUpdate
      ? { lat: latLng.lat, lng: latLng.lng }
      : { lat: 52.377956, lng: 4.89707 }
  );

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
      <Form.Label>Location</Form.Label>
      <Search
        panTo={panTo}
        setMarker={setMarker}
        setAddress={setAddress}
        setLatLng={setLatLng}
        showMap={showMap}
        setShowMap={setShowMap}
        address={address}
      />
      <div style={{ display: showMap ? "block" : "none" }}>
        {addressToUpdate ? (
          // map with data to edit
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={18}
            center={center}
            options={options}
            onLoad={onMapLoad}
          >
            <Marker key={0} position={marker} />
          </GoogleMap>
        ) : (
          // map with no data to create
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={center}
            options={options}
            onLoad={onMapLoad}
          >
            <p>edit</p>
            <Marker key={0} position={marker} />
          </GoogleMap>
        )}
      </div>
    </div>
  );
}
