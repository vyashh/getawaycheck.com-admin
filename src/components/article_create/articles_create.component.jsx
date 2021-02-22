import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import LocationSearch from "../location_search/location_search.component";

export default function ArticleCreate() {
  const titleRef = useRef();
  const locationRef = useRef();

  return (
    <div>
      <Form>
        <Form.Group id="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" ref={titleRef} required />
        </Form.Group>
        <Form.Group id="location">
          <LocationSearch />
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" ref={locationRef} required />
        </Form.Group>
        <Button type="submit" className="w-100">
          Add
        </Button>
      </Form>
    </div>
  );
}
