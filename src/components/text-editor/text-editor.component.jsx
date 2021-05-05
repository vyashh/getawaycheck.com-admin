import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/imageResize", ImageResize);

export default function TextEditor({ content, setContent }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ direction: "rtl" }], // text direction,

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme

      ["link", "image"],

      ["clean"], // remove formatting button
    ],
    imageResize: {
      // parchment: Quill.import('parchment'),
      modules: ["Resize", "DisplaySize"],
    },
  };

  return (
    <ReactQuill
      style={{ height: "400px" }}
      theme="snow"
      value={content}
      onChange={setContent}
      modules={modules}
    />
  );
}
