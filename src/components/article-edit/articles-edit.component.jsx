import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Map from "../map_search/map/map.component";
import TextEditor from "../text-editor/text-editor.component";
import {
  updateArticle,
  deleteArticle,
  getArticleTags,
} from "../../services/firestore";
import history from "../../services/history";
import ArticleSettings from "../article-settings/article-settings.component";
import { Context } from "../../services/store";
import ArticleImages from "../article-images/article-images.component";
import dayjs from "dayjs";

export default function ArticlesEdit({ doc }) {
  const { tagsData } = useContext(Context);
  const [id, setId] = useState(doc.id);
  const [title, setTitle] = useState(doc.title);
  const [content, setContent] = useState(doc.content);
  const [isPublic, setIsPublic] = useState(doc.isPublic);
  const [latLng, setLatLng] = useState(doc.latLng);
  const [category, setCategory] = useState(doc.category);
  const [address, setAddress] = useState(doc.address);
  const [categories, setCategories] = useState(["Bar", "Food", "Hotel"]);
  const [published, setPublished] = useState(["True", "False"]);
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = tagsData;
  const [imageUrls, setImageUrls] = useState([]);
  const inputFile = useRef(null);

  const onUpdate = async (event) => {
    event.preventDefault();

    const data = {
      id: id,
      title: title,
      content: content,
      isPublic: isPublic,
      dateTime: dayjs().format(),
      latLng: latLng,
      category: category,
      address: address,
      tags: tags,
      imageUrls: imageUrls,
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

  const getArticles = () => {
    getArticleTags(doc.id).then((article) => console.log(article.data()));
  };

  useEffect(() => {
    getArticles();
    setTags(doc.tags);
    setImageUrls(doc.imageUrls);
  }, []);

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
                latLng={latLng}
              />
            </Form.Group>
            <Form.Group id="text-editor">
              <TextEditor content={content} setContent={setContent} />
            </Form.Group>
          </Form>
        </Col>
        <Col xl={3} lg={3} md={4} sm={12} xs={12}>
          <ArticleSettings
            isEdit={true}
            onSubmit={onUpdate}
            setCategory={setCategory}
            setIsPublic={setIsPublic}
            isPublic={isPublic}
            tags={tags}
            setTags={setTags}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            onDelete={onDelete}
          />
        </Col>
      </Row>
    </div>
  );
}
