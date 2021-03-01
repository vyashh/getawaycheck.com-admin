import { db } from "../services/firebase";

const articlesRef = db.collection("articles");

export const addArticle = async (article) => {
  const id = articlesRef.doc().id;
  const handleArticle = await articlesRef.doc(id).set({ ...article, id: id });
};

export const getSingleArticle = async (id) => {
  return articlesRef.doc(id).get();
};

export const updateArticle = async (id, data) => {
  const doc = articlesRef.doc(id);
  return doc.update(data);
};
