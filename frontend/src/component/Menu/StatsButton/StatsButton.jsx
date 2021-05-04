import { Tooltip } from "antd";

import "./StatsButton.css";

export const StatsButton = () => {
  return (
    <Tooltip placement="left" title="Statistics">
      <div className="FloatButton__float  FloatButton__background">
        <img
          className="StatsButton__logo"
          src={process.env.REACT_APP_API_URL + `/images/stats.svg`}
          alt="stats"
        />
      </div>
    </Tooltip>
  );
};
