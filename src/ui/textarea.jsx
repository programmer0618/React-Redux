const TextArea = ({ label, state, setState, height = "100px" }) => {
  return (
    <div className="form-floating">
      <textarea
        id={label}
        value={state}
        onChange={(e) => setState(e.target.value)}
        style={{ height: height }}
        className="form-control"
        placeholder={label}
      ></textarea>
      <label className="form-label" htmlFor={label}>
        {label}
      </label>
    </div>
  );
};

export default TextArea;
