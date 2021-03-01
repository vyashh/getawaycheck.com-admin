import React from "react";
import LoadingAnimation from "../../assets/img/loading.svg";
import "./loading.styles.scss";

export default function Loading() {
  return (
    <div className="loading">
      <img src={LoadingAnimation} alt="loading animation" />
    </div>
  );
}
