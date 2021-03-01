import React, { useState, useContext } from "react";
import { Context } from "../../services/store";
import { Alert } from "react-bootstrap";
import NavBar from "../../components/navbar/navbar.component";
import SideBar from "../../components/sidebar/sidebar.component";
import ArticleCreate from "../../components/article-create/articles-create.component";
import ArticleList from "../../components/article-list/article-list.component";

export default function Dashboard() {
  const { articleData, loadingIndicator, alertMessage } = useContext(Context);
  const [isCreateArticle, setIsCreateArticle] = useState(false);
  const [loading, setLoading] = loadingIndicator;
  const [articles, setArticles] = articleData;
  const [alert, setAlert] = alertMessage;
  const [show, setShow] = useState(true);

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
            <span className="text-danger font-weight-bold" aria-hidden="true">
              &times;
            </span>
          )}
        </button>

        {isCreateArticle ? <ArticleCreate /> : <ArticleList />}
      </SideBar>
    </>
  );
}
