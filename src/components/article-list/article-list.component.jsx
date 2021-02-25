import React, { useState, useContext } from "react";
import ListItem from "./list-item/list-item.component";
import { Table } from "react-bootstrap";
import { Context } from "../../services/store";

export default function ArticleList() {
  const { loadingIndicator, articleData } = useContext(Context);
  const [loading, setLoading] = loadingIndicator;
  const [articles, setArticles] = articleData;

  //   console.log(articles);

  if (!articles) {
    return <h1>Loading</h1>;
  }

  console.log(articles);

  return (
    <>
      <h1>Articles</h1>

      <Table bordered size="sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>DateTime</th>
            <th>Public</th>
          </tr>
        </thead>

        {articles.map((article) => (
          <ListItem {...article} />
        ))}
      </Table>
    </>
  );
}
