import { useEffect, useState } from "react";
import ArticleForm from "./article-form";
import {
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
  postArticleFailure,
  postArticleStart,
  postArticleSuccess,
} from "../slice/article";
import ArticleService from "../service/article";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();

  const getArticles = async () => {
    dispatch(getArticleDetailStart());
    try {
      const { article } = await ArticleService.getArticleDetail(slug);
      console.log(article);
      setTitle(article.title);
      setDescription(article.description);
      setBody(article.body);
      dispatch(getArticleDetailSuccess(article));
    } catch (error) {
      dispatch(getArticleDetailFailure());
      console.log(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  const formSubmit = async (e) => {
    const article = { title, description, body };

    e.preventDefault();
    dispatch(postArticleStart());
    try {
      await ArticleService.editArticle(slug, article);
      dispatch(postArticleSuccess());
      navigate("/");
    } catch (error) {
      dispatch(postArticleFailure());
      console.log(error);
    }
  };

  const formPorops = {
    title,
    setTitle,
    description,
    setDescription,
    body,
    setBody,
    formSubmit,
  };

  return (
    <div className="w-75 mx-auto">
      <h1 className="text-center">Edit article</h1>
      <ArticleForm {...formPorops} />
    </div>
  );
};

export default EditArticle;
