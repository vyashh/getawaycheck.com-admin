import React, { useState, useContext } from "react";
import Loading from "../../components/loading/loading.component";
import ListItem from "./list-item/list-item.component";
import { Table } from "react-bootstrap";
import { Context } from "../../services/store";
import Empty from "../../assets/img/empty.svg";

export default function ArticleList() {
  const { loadingIndicator, articleData } = useContext(Context);
  const [articles, setArticles] = articleData;

  if (!articles) {
    return <Loading />;
  }

  console.log(articles.length);

  return (
    <>
      <h1>Articles</h1>
      {articles.length <= 0 ? (
        <div className="text-center">
          <img
            src={Empty}
            alt="no articles"
            style={{ width: "20%", height: "auto", marginTop: "10em" }}
          />
          <h4>No Articles</h4>
        </div>
      ) : (
        <Table bordered size="sm" style={{ cursor: "pointer" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>DateTime</th>
              <th>Public</th>
            </tr>
          </thead>

          {articles.map((article) => (
            <ListItem key={article.id} {...article} />
          ))}
        </Table>
      )}
    </>
  );
}
