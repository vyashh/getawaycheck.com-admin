import React from "react";
import { Button } from "react-bootstrap";

export default function ArticleSettingsButtons({ onSubmit, isEdit, onDelete }) {
  return (
    <div
      className={`d-flex ${
        isEdit ? "justify-content-between" : "justify-content-center"
      }`}
    >
      <Button onClick={onSubmit} type="submit" className="btn btn-success">
        Submit
      </Button>
      {isEdit && (
        <Button onClick={onDelete} type="submit" className="btn btn-danger">
          <i class="bi bi-trash"></i>
        </Button>
      )}
    </div>
  );
}
