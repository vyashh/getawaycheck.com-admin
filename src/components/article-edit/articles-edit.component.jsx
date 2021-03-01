import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import Map from "../map_search/map/map.component";
import TextEditor from "../text-editor/text-editor.component";
import { updateArticle, deleteArticle } from "../../services/firestore";
import history from "../../services/history";

export default function ArticlesEdit({ doc }) {
  const [id, setId] = useState(doc.id);
  const [title, setTitle] = useState(doc.title);
  const [content, setContent] = useState(doc.content);
  const [isPublic, setIsPublic] = useState(doc.isPublic);
  const [latLng, setLatLng] = useState(doc.latLng);
  const [category, setCategory] = useState(doc.category);
  const [address, setAddress] = useState(doc.address);
  const [categories, setCategories] = useState(["Bar", "Food", "Hotel"]);
  const [published, setPublished] = useState(["True", "False"]);

  const onUpdate = async (event) => {
    event.preventDefault();

    const data = {
      id: id,
      title: title,
      content: content,
      isPublic: isPublic,
      latLng: latLng,
      category: category,
      address: address,
    };
    await updateArticle(doc.id, data);
    history.push("/article/all");
    window.location.reload();
  };

  const onDelete = async (event) => {
    event.preventDefault();

    deleteArticle(doc.id)
      .then(() => {
        history.push("/article/all");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
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
                required
                value={title}
                onChange={(value) => setTitle(value.target.value)}
                placeholder="Enter a title"
              />
            </Form.Group>
            <Form.Group id="location">
              <Map
                setAddress={setAddress}
                setLatLng={setLatLng}
                address={address}
                latLng={latLng}
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
                    <option></option>
                    {categories.map((item) => {
                      if (item.toLowerCase() === category) {
                        return <option selected>{item}</option>;
                      }
                      return <option>{item}</option>;
                    })}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Publish</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(event) =>
                      setIsPublic(event.target.value.toLowerCase())
                    }
                  >
                    {published.map((item) => {
                      if (item.toLowerCase() === isPublic.toString()) {
                        return <option selected>{item}</option>;
                      }

                      return <option>{item}</option>;
                    })}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="d-flex justify-content-between">
                  <Button
                    onClick={onUpdate}
                    type="submit"
                    className="btn btn-warning"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={onDelete}
                    type="submit"
                    className="btn btn-danger"
                  >
                    <i class="bi bi-trash"></i>
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
