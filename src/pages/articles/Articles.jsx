import React, { useState } from "react";
import NavBar from "../../components/navbar/navbar.component";
import SideBar from "../../components/sidebar/sidebar.component";
import ArticleCreate from "../../components/article-create/articles-create.component";

export default function Dashboard() {
  const [isCreateArticle, setIsCreateArticle] = useState(false);

  return (
    <>
      <NavBar />
      <SideBar activeNav="1">
        <button
          className={`float-right btn ${
            !isCreateArticle ? "btn-success" : "btn-light"
          }`}
          onClick={() => {
            setIsCreateArticle(!isCreateArticle);
          }}
        >
          {!isCreateArticle ? (
            "Create Article"
          ) : (
            <span className="text-danger" aria-hidden="true">
              &times;
            </span>
          )}
        </button>
        {isCreateArticle ? (
          <ArticleCreate />
        ) : (
          <div className="h-100 row align-items-center text-center">
            <div className="col">Articles</div>
          </div>
        )}
      </SideBar>
    </>
  );
}
