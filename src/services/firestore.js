import { db } from "../services/firebase";

const articlesRef = db.collection("articles");

export const addArticle = async (article) => {
  const handleArticle = await articlesRef.doc().set(article);
};
