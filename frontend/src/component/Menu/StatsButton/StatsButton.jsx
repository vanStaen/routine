import { Tooltip } from "antd";
import { observer } from "mobx-react";

import { displayStore } from "../../../store/displayStore";
import { ConditionalWrapper } from "../../../helpers/ConditionnalWrapper";

import "./StatsButton.css";

export const StatsButton = observer(() => {
  return (
    <ConditionalWrapper
      condition={displayStore.showPage !== "stats"}
      wrap={(children) => (
        <Tooltip placement="left" title="Show statistics">
          {children}
        </Tooltip>
      )}
    >
      {displayStore.showPage === "stats" ? (
        ""
      ) : (
        <div
          className="FloatButton__float  FloatButton__background"
          onClick={() => displayStore.setShowPage("stats")}
        >
          <img
            className="StatsButton__logo"
            src={process.env.REACT_APP_API_URL + `/images/stats.svg`}
            alt="stats"
          />
        </div>
      )}
    </ConditionalWrapper>
  );
});
