import React from "react";
import { Form } from "react-bootstrap";

export default function ArticleSettingsCategory({ isEdit, setCategory }) {
  return (
    <div>
      <Form.Control
        as="select"
        onChange={(event) => setCategory(event.target.value.toLowerCase())}
      >
        <option selected="selected"></option>
        <option>Drinks</option>
        <option>Food</option>
        <option>Hotel</option>
      </Form.Control>
    </div>
  );
}
