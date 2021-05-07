import React from "react";
import LoadingAnimation from "../../assets/img/loading.svg";
import "./article-images-item.styles.scss";

export default function ArticleImagesItem({
  onClickHandler,
  imageUrl,
  loading,
  onDelete,
  imageName,
  index,
}) {
  if (loading) {
    return (
      <div className="article-images-item">
        <img src={LoadingAnimation} className="image" alt="loading animation" />
      </div>
    );
  }
  if (imageUrl) {
    return (
      <div
        className="article-images-item"
        onClick={() => onDelete(imageName, index)}
      >
        <img src={imageUrl} className="image" alt="Thumbnail" />
        <i className="fas fa-times-circle remove-item"></i>
      </div>
    );
  }

  return (
    <div className="article-images-item" onClick={onClickHandler}>
      <i className="fas fa-plus-circle"></i>
    </div>
  );
}
