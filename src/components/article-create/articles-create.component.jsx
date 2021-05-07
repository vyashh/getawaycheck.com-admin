import React, { useContext, useRef, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import ArticleSettings from "../article-settings/article-settings.component";
import ArticleImages from "../article-images/article-images.component";
import Map from "../map_search/map/map.component";
import TextEditor from "../text-editor/text-editor.component";
import dayjs from "dayjs";
import "./articles-create.styles.scss";
import { addArticle, addTags } from "../../services/firestore";
import history from "../../services/history";
import { Context } from "../../services/store";

export default function ArticleCreate() {
  const { tagsData } = useContext(Context);
  const [title, setTitle] = useState(null);
  const [address, setAddress] = useState(null);
  const [latLng, setLatLng] = useState({});
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [category, setCategory] = useState();
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = tagsData;
  const [imageUrls, setImageUrls] = useState([]);
  const inputFile = useRef(null);

  const onSubmit = async (event) => {
    event.preventDefault();

    const articleData = {
      title: title,
      content: content,
      category: category,
      address: address,
      latLng: latLng,
      isPublic: isPublic,
      dateTime: dayjs().format(),
      tags: tags,
      imageUrls: imageUrls,
    };

    await addTags([...suggestions, ...tags]);
    await addArticle(articleData);
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
            <Form.Group id="images">
              <ArticleImages
                imageUrls={imageUrls}
                setImageUrls={setImageUrls}
                inputRef={inputFile}
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
          <ArticleSettings
            isEdit={false}
            onSubmit={onSubmit}
            setCategory={setCategory}
            setIsPublic={setIsPublic}
            isPublic={isPublic}
            tags={tags}
            setTags={setTags}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
          />
        </Col>
      </Row>
    </div>
  );
}
