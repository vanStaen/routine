import "./Logo.css";

export const Logo = (props) => {
  return (
    <div>
      <img
        className="logo"
        src={process.env.REACT_APP_API_URL + `/images/${props.image}.svg`}
        alt={props.image}
      />
    </div>
  );
};
