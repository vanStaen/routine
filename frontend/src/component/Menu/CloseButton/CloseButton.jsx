import { CloseOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";

import { displayStore } from "../../../store/displayStore";

export const CloseButton = observer(() => {
  return (
    displayStore.showPage !== "daily" && (
      <div
        className="FloatButton__float"
        onClick={() => displayStore.setShowPage("daily")}
      >
        <CloseOutlined className="FloatButton__close" />
      </div>
    )
  );
});
