import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArticleService from "../service/article";

const Articlecard = ({ item, getArticles }) => {
  const navigate = useNavigate();
  const { loggedIn, user } = useSelector((state) => state.auth);

  const deleteArticle = async (slug) => {
    try {
      await ArticleService.deleteArticle(slug);
      getArticles();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col" key={item.id}>
      <div className="card shadow-sm h-100">
        <svg
          className="bd-placeholder-img card-img-top"
          width="100%"
          height="225"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: Thumbnail"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <rect width="100%" height="100%" fill="#55595c"></rect>
        </svg>
        <div className="card-body">
          <p className="card-title fw-bold p-auto">{item.title}</p>
          <div className="card-text">{item.description}</div>
        </div>
        <div className="d-flex justify-content-between align-items-center card-footer mt-3">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-sm btn-outline-success"
              onClick={() => navigate(`/article/${item.slug}`)}
            >
              View
            </button>
            {loggedIn && user.username === item.author.username && (
              <>
                <button
                  type="button"
                  onClick={() => navigate(`/edit-article/${item.slug}`)}
                  className="btn btn-sm btn-outline-secondary"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteArticle(item.slug)}
                  className="btn btn-sm btn-outline-danger"
                >
                  Delete
                </button>
              </>
            )}
          </div>
          <small className="text-body-secondary fw-bold text-capitalize">
            {item.author.username}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Articlecard;
