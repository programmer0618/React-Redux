import { useState } from "react";
import ArticleForm from "./article-form";
import ArticleService from "../service/article";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  postArticleFailure,
  postArticleStart,
  postArticleSuccess,
} from "../slice/article";
const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const article = { title, description, body };

  const formSubmit = async (e) => {
    e.preventDefault();
    dispatch(postArticleStart());
    try {
      await ArticleService.postArticle(article);
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
      <h1 className="text-center">Create article</h1>
      <ArticleForm {...formPorops} />
    </div>
  );
};

export default CreateArticle;
