import React, { useRef, useState, useCallback } from "react";
import { Form, Button, Row, Col, Card, Input } from "react-bootstrap";
import Map from "../map_search/map/map.component";
import TextEditor from "../text-editor/text-editor.component";
import "./articles-create.styles.scss";

export default function ArticleCreate() {
  const titleRef = useRef();
  const locationRef = useRef();

  const [title, setTitle] = useState(null);
  const [address, setAddress] = useState(null);
  const [latLng, setLatLng] = useState({});

  return (
    <div>
      <Row>
        <Col xl={9} lg={9} md={8} sm={12} xs={12}>
          <Form>
            <Form.Group id="title">
              <Form.Label>Titel</Form.Label>
              <Form.Control
                className="form-control form-control-lg no-border"
                type="text"
                onChange={(value) => setTitle(value.target.value)}
                required
                placeholder="Enter a title"
              />
            </Form.Group>
            <Form.Group id="location">
              <Map
                setAddress={setAddress}
                setLatLng={setLatLng}
                address={address}
              />
            </Form.Group>
            <Form.Group id="text-editor">
              {/* <TextEditor setContent={setContent} contentState={content} /> */}
            </Form.Group>
            <a
              className="btn btn-danger"
              onClick={() => console.log(title, address, latLng)}
            >
              See stuff
            </a>
          </Form>
        </Col>
        <Col xl={3} lg={3} md={4} sm={12} xs={12}>
          <Card>
            <Card.Header className="text-center">Article Settings</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Publish</Form.Label>
                  <Form.Control as="select">
                    <option>True</option>
                    <option>False</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className=" d-flex justify-content-center">
                  <Button type="submit" className="btn btn-danger">
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
