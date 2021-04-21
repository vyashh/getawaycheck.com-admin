import React from "react";
import { Button } from "react-bootstrap";

export default function ArticleSettingsButtons({ onSubmit }) {
  return (
    <div>
      <Button onClick={onSubmit} type="submit" className="btn btn-success">
        Submit
      </Button>
    </div>
  );
}
