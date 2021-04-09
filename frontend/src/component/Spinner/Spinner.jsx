import "./Spinner.css";

export const Spinner = () => {
  return (
    <div className="spinner">
      <img src="/images/venja.svg" className="loader" alt="Loading" />
      <div className="spinner spinner__header">
        venja
        <span style={{ color: "#D68910" }}>.org</span>
      </div>
    </div>
  );
};
