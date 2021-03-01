import React, { useRef, useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import Map from "../map_search/map/map.component";
import TextEditor from "../text-editor/text-editor.component";
import dayjs from "dayjs";
import "./articles-create.styles.scss";
import { addArticle } from "../../services/firestore";
import history from "../../services/history";

export default function ArticleCreate() {
  const [title, setTitle] = useState(null);
  const [address, setAddress] = useState(null);
  const [latLng, setLatLng] = useState({});
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [category, setCategory] = useState();

  const onSubmit = async (event) => {
    event.preventDefault();

    const data = {
      title: title,
      category: category,
      address: address,
      latLng: latLng,
      content: content,
      isPublic: isPublic,
      dateTime: dayjs().format(),
    };

    await addArticle(data);
    history.push("/article/all");
    window.location.reload();
  };

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
              <TextEditor content={content} setContent={setContent} />
            </Form.Group>
          </Form>
        </Col>
        <Col xl={3} lg={3} md={4} sm={12} xs={12}>
          <Card>
            <Card.Header className="text-center">Article Settings</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(event) =>
                      setCategory(event.target.value.toLowerCase())
                    }
                  >
                    <option selected="selected"></option>
                    <option>Bar</option>
                    <option>Food</option>
                    <option>Hotel</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Publish</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={() => setIsPublic(!isPublic)}
                  >
                    <option>True</option>
                    <option selected="selected">False</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="d-flex justify-content-center">
                  <Button
                    onClick={onSubmit}
                    type="submit"
                    className="btn btn-success"
                  >
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
