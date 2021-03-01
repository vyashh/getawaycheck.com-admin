import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticlesEdit from "../../components/article-edit/articles-edit.component";
import NavBar from "../../components/navbar/navbar.component";
import SideBar from "../../components/sidebar/sidebar.component";
import { getSingleArticle } from "../../services/firestore";
import Loading from "../../components/loading/loading.component";
import history from "../../services/history";

export default function ArticleEditPage() {
  let { id } = useParams();
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    getSingleArticle(id).then((doc) => setDoc(doc.data()));
  }, []);

  return (
    <div>
      <NavBar />
      <SideBar activeNav="1">
        <span
          className="float-right text-danger btn btn-light font-weight-bold"
          aria-hidden="true"
          onClick={() => history.push("/article/all")}
        >
          &times;
        </span>
        {doc ? <ArticlesEdit doc={doc} /> : <Loading />}
      </SideBar>
    </div>
  );
}
