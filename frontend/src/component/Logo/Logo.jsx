import "./Logo.css";

export const Logo = (props) => {
  return (
    <div>
      <img
        className="logo"
        src={`/images/${props.activity.activity}.svg`}
        alt={props.activity.activity}
      />
    </div>
  );
};
