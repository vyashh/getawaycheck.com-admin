import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { getTags } from "./firestore";

export const Context = React.createContext();

const Store = ({ children }) => {
  const articlesRef = db.collection("articles");
  const tagsRef = db.collection("tags");
  const [errorLogin, setErrorLogin] = useState("");
  const [loadingIndicator, setLoadingIndicator] = useState(true);
  const [articleData, setArticleData] = useState();
  const [tagsData, setTagsData] = useState();
  const [alertMessage, setAlertMessage] = useState("");

  const fetchArticleData = () => {
    articlesRef.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setArticleData(items);
      setLoadingIndicator(false);
    });
  };

  const fetchTagsData = () => {
    tagsRef.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setTagsData(items[0].suggestions);
    });
  };

  useEffect(() => {
    fetchArticleData();
    fetchTagsData();
  }, []);

  return (
    <Context.Provider
      value={{
        errorLogin: [errorLogin, setErrorLogin],
        loadingIndicator: [loadingIndicator, setLoadingIndicator],
        articleData: [articleData, setArticleData],
        tagsData: [tagsData, setTagsData],
        alertMessage: [alertMessage, setAlertMessage],
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Store;
