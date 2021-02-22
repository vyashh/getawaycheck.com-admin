import React, { useState } from "react";
import NavBar from "../../components/navbar/navbar.component";
import SideBar from "../../components/sidebar/sidebar.component";
import ArticleCreate from "../../components/article_create/articles_create.component";

export default function Dashboard() {
  const [isCreateArticle, setIsCreateArticle] = useState(false);

  return (
    <>
      <NavBar />
      <SideBar activeNav="1">
        <button
          className="btn btn-success"
          onClick={() => {
            setIsCreateArticle(!isCreateArticle);
          }}
        >
          Add event
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
