import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import Map from "../map_search/map/map.component";

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
          <Map />
        </Form.Group>
        <Button type="submit" className="w-100">
          Add
        </Button>
      </Form>
    </div>
  );
}
