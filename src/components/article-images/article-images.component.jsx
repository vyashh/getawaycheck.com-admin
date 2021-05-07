import React, { useRef, useState } from "react";
import ArticleImagesItem from "../article-images-item/article-images-item.component";
import { Form } from "react-bootstrap";
import { app } from "../../services/firebase";
import "./article-images.styles.scss";

export default function ArticleImages({ imageUrls, setImageUrls, inputRef }) {
  const storageRef = app.storage().ref();
  const [loading, setLoading] = useState(false);

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const onFileChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    if (imageUrls === undefined) {
      setImageUrls([{ url: await fileRef.getDownloadURL(), dbRef: file.name }]);
    } else {
      setImageUrls([
        ...imageUrls,
        { url: await fileRef.getDownloadURL(), dbRef: file.name },
      ]);
    }
    setLoading(false);
  };

  const onDelete = (imageName) => {
    const imageRef = storageRef.child(imageName);
    imageRef.delete().then(() => console.log("deleted"));
    setImageUrls(imageUrls.filter((image) => image.dbRef !== imageName));
  };

  console.log(imageUrls);

  if (imageUrls === undefined || imageUrls.length < 0) {
    console.log("imageUrls === undefined || imageUrls.length < 0");
    return (
      <div>
        <ArticleImagesItem loading={loading} onClickHandler={onButtonClick} />
        <input
          ref={inputRef}
          onChange={onFileChange}
          type="file"
          style={{ display: "none" }}
          accept=".png,.jpg,.jpeg"
        />
      </div>
    );
  }

  return (
    <div className="article-images">
      <Form.Label className="article-images__title">
        Images {`${imageUrls.length}/9`}
      </Form.Label>
      <div className="article-images__image-preview">
        {imageUrls.length > 0 &&
          imageUrls.map((image, index) => {
            console.log("imageUrls.length > 0");

            return (
              <ArticleImagesItem
                loading={loading}
                onDelete={onDelete}
                index={index}
                imageUrl={image.url}
                imageName={image.dbRef}
              />
            );
          })}
        {imageUrls.length < 9 && (
          <ArticleImagesItem loading={loading} onClickHandler={onButtonClick} />
        )}
      </div>
      <input
        ref={inputRef}
        onChange={onFileChange}
        type="file"
        style={{ display: "none" }}
        accept=".png,.jpg,.jpeg"
      />
    </div>
  );
}
