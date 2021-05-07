import "./Logo.css";

export const Logo = (props) => {
  const invert = props.invert ? true : false;
  const big = props.big ? true : false;
  return (
    <div>
      <img
        className={`${big ? "logo__big" : "logo"} ${invert && "invert"}`}
        src={process.env.REACT_APP_API_URL + `/images/${props.image}.svg`}
        alt={props.image}
      />
    </div>
  );
};
