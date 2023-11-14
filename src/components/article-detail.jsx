import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleService from "../service/article";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
} from "../slice/article";
import { Loader } from "../ui";

const ArticleDetail = () => {
  const { slug } = useParams();
  const { articleDetail, isLoading } = useSelector((state) => state.article);
  const dispatch = useDispatch();

  const getArticles = async () => {
    dispatch(getArticleDetailStart());
    try {
      const { article } = await ArticleService.getArticleDetail(slug);
      console.log(article);
      dispatch(getArticleDetailSuccess(article));
    } catch (error) {
      dispatch(getArticleDetailFailure());
      console.log(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, [slug]);
  return isLoading ? (
    <Loader />
  ) : (
    articleDetail !== null && (
      <div className="w-100">
        <div className="py-5">
          <h1 className="display-5 fw-bold">{articleDetail.title}</h1>
          <p className="col-md-8 fs-4">{articleDetail.description}</p>
          <div className="d-flex pb-3 fs-5 text-muted gap-2">
            <p className="fw-bold">Created at:</p>
            <span>{moment(articleDetail.createdAt).format("DD MM,YYYY")}</span>
          </div>
          <div className="w-75">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column w-100">
                <strong className="fs-3 mb-2 text-primary text-capitalize">
                  {articleDetail.author.username}
                </strong>

                <p className="mb-auto fs-5">{articleDetail.author.bio}</p>
              </div>
              <div className="col-auto d-none d-lg-block">
                <svg
                  className="bd-placeholder-img"
                  width="200"
                  height="250"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Placeholder: Thumbnail"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                >
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#55595c"></rect>
                  <text
                    x="50%"
                    y="50%"
                    fill="white"
                    dy=".3em"
                    className="text-uppercase fs-1"
                  >
                    {articleDetail.author.username[0]}
                  </text>
                </svg>
              </div>
            </div>
          </div>
          <p className="fs-5">{articleDetail.body}</p>
        </div>
      </div>
    )
  );
};

export default ArticleDetail;
