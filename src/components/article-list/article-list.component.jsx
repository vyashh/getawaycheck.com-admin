import React, { useState, useContext } from "react";
import Loading from "../../components/loading/loading.component";
import ListItem from "./list-item/list-item.component";
import { Table } from "react-bootstrap";
import { Context } from "../../services/store";

export default function ArticleList() {
  const { loadingIndicator, articleData } = useContext(Context);
  const [loading, setLoading] = loadingIndicator;
  const [articles, setArticles] = articleData;

  if (!articles) {
    return <Loading />;
  }

  return (
    <>
      <h1>Articles</h1>
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
    </>
  );
}
