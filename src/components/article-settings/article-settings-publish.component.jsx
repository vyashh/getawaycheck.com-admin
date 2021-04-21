import React from "react";
import { Form } from "react-bootstrap";

export default function ArticleSettingsPublish({
  isEdit,
  setIsPublic,
  isPublic,
}) {
  return (
    <div>
      <Form.Control as="select" onChange={() => setIsPublic(!isPublic)}>
        <option>True</option>
        <option selected="selected">False</option>
      </Form.Control>
    </div>
  );
}
