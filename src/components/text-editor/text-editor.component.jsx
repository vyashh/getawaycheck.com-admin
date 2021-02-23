import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TextEditor({ content, setContent }) {
  return <ReactQuill theme="snow" value={content} onChange={setContent} />;
}
