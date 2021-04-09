import "./Spinner.css";

export const Spinner = () => {
  return (
    <div className="spinner">
      <img
        src={process.env.REACT_APP_API_URL + `/images/venja.svg`}
        className="loader"
        alt="Loading"
      />
      <div className="spinner spinner__header">
        venja
        <span style={{ color: "#D68910" }}>.org</span>
      </div>
    </div>
  );
};
