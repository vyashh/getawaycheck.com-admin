import React, { useState, useEffect } from "react";
import { db } from "./firebase";

export const Context = React.createContext();

const Store = ({ children }) => {
  const articlesRef = db.collection("articles");

  const [errorLogin, setErrorLogin] = useState("");
  const [loadingIndicator, setLoadingIndicator] = useState(true);
  const [articleData, setArticleData] = useState();

  const fetchArticleData = () => {
    articlesRef.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setArticleData(items);
      setLoadingIndicator(false);
    });
  };

  useEffect(() => {
    fetchArticleData();
  }, []);

  return (
    <Context.Provider
      value={{
        errorLogin: [errorLogin, setErrorLogin],
        loadingIndicator: [loadingIndicator, setLoadingIndicator],
        articleData: [articleData, setArticleData],
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Store;
