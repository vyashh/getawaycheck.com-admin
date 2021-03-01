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
import { Form, Button, Col, Row } from "react-bootstrap";

const style = {
  width: "100%",
};

export default function Search({
  panTo,
  setMarker,
  setAddress,
  setLatLng,
  showMap,
  setShowMap,
  address,
}) {
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

  const onClickHandler = () => {
    setShowMap(!showMap);
  };
  return (
    // when a user selects a suggestion. The map will zoom in and add a marker to the selected address.
    // these functions are passed form the map component.

    <Combobox
      onSelect={async (address) => {
        setValue(address, false);
        setAddress(address);

        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          panTo({ lat, lng });
          setMarker({ lat, lng });
          setLatLng({ lat, lng });
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <Form.Group id="location">
        <Row>
          <Col xl={10} lg={10} md={8} sm={12} xs={12}>
            <ComboboxInput
              style={style}
              className="form-control"
              value={address ? address : null}
              onChange={(event) => {
                setValue(event.target.value);
                if (address) {
                  setAddress(event.target.value);
                }
              }}
              disabled={!ready}
              placeholder="Enter address"
            />
          </Col>
          <Col xl={2} lg={2} md={4} sm={12} xs={12}>
            {showMap ? (
              <Button
                className="btn btn-secondary w-100"
                onClick={onClickHandler}
              >
                Done
              </Button>
            ) : (
              <Button className="btn btn-light w-100" onClick={onClickHandler}>
                Edit
              </Button>
            )}
          </Col>
        </Row>
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
