import { useSelector } from "react-redux";
import { Input, TextArea } from "../ui";

const ArticleForm = (props) => {
  const { isLoading } = useSelector((state) => state.article);
  const {
    title,
    setTitle,
    description,
    setDescription,
    body,
    setBody,
    formSubmit,
  } = props;
  return (
    <div className="w-100">
      <form
        action=""
        onSubmit={formSubmit}
        className="d-flex flex-column gap-3"
      >
        <Input label={"Title"} state={title} setState={setTitle} id={title} />
        <TextArea
          label={"Description"}
          state={description}
          setState={setDescription}
        />
        <TextArea
          label={"Body"}
          state={body}
          setState={setBody}
          height="300px"
        />
        <button type="submit" className="btn btn-primary">
          {isLoading ? "Loading..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
