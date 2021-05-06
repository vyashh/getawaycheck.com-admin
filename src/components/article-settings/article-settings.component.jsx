import React, { useState } from "react";
import CategorySettings from "./article-settings-category.component";
import { Form, Card } from "react-bootstrap";
import ArticleSettingsPublish from "./article-settings-publish.component";
import ArticleSettingsButtons from "./article-settings-buttons.component";
import ArticleSettingsTags from "./article-settings-tags.component";

export default function ArticleSettings({
  isEdit,
  setCategory,
  setIsPublic,
  isPublic,
  onSubmit,
  tags,
  setTags,
  suggestions,
  setSuggestions,
  onDelete,
}) {
  return (
    <div>
      <Card>
        <Card.Header className="text-center">Article Settings</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <CategorySettings setCategory={setCategory} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Publish</Form.Label>
              <ArticleSettingsPublish
                isEdit={isEdit}
                setIsPublic={setIsPublic}
                isPublic={isPublic}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <ArticleSettingsTags
                tags={tags}
                setTags={setTags}
                suggestions={suggestions}
                setSuggestions={setSuggestions}
              />
            </Form.Group>
            <Form.Group>
              <ArticleSettingsButtons
                isEdit={isEdit}
                onSubmit={onSubmit}
                onDelete={onDelete}
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
