import React, { useContext, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import "./article-settings.styles.scss";
import { Context } from "../../services/store";

const KeyCodes = {
  ENTER: 13,
  TAB: 9,
};

const delimiters = [KeyCodes.TAB, KeyCodes.ENTER];

export default function ArticleSettingsTags({ tags, setTags }) {
  const { tagsData } = useContext(Context);
  const [suggestions, setSuggestions] = tagsData;

  //   SUGGESTIONS FORMAT:  { id: "USA", text: "USA" },

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  return (
    <div className="form-control">
      <ReactTags
        placeholder={"Add tags"}
        tags={tags}
        suggestions={suggestions}
        handleAddition={handleAddition}
        handleDelete={handleDelete}
        delimiters={delimiters}
        allowDragDrop={false}
      />
    </div>
  );
}
