import React, { useContext } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import "./article-settings.styles.scss";
import { Context } from "../../services/store";
import { Form } from "react-bootstrap";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function ArticleSettingsTags({ tags, setTags }) {
  const { tagsData } = useContext(Context);
  const [suggestions, setSuggestions] = tagsData;

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  console.log(suggestions);

  return (
    <div>
      <ReactTags
        placeholder={"Add tags"}
        tags={tags}
        // suggestions={suggestions}
        handleAddition={handleAddition}
        handleDelete={handleDelete}
        delimiters={delimiters}
        allowDragDrop={false}
      />
    </div>
  );
}
