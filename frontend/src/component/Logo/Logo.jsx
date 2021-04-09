import "./Logo.css";

export const Logo = (props) => {
  return (
    <div>
      <img
        className="logo"
        src={
          process.env.REACT_APP_API_URL +
          `/images/${props.activity.activity}.svg`
        }
        alt={props.activity.activity}
      />
    </div>
  );
};
