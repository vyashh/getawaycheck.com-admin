import React from "react";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { Form, Button } from "react-bootstrap";

const style = {
  width: "100%",
};

export default function Search({ panTo, setMarker }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      location: { lat: () => 52.377956, lng: () => 4.89707 },
      radius: 200 * 1000, // meters
    },
  });
  return (
    // when a user selects a suggestion. The map will zoom in and add a marker to the selected address.
    // these functions are passed form the map component.
    <Combobox
      onSelect={async (address) => {
        setValue(address, false);

        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          panTo({ lat, lng });
          setMarker({ lat, lng });
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <Form.Group id="location">
        <Form.Label>Location</Form.Label>
        <ComboboxInput
          style={style}
          className="form-control"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an address"
        />
      </Form.Group>
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}
