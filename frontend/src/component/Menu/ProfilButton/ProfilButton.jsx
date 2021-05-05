import { Tooltip } from "antd";
import { UserOutlined, CloseOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";

import { userStore } from "../../../store/userStore";
import { displayStore } from "../../../store/displayStore";
import { ConditionalWrapper } from "../../../helpers/ConditionnalWrapper";

export const ProfilButton = observer((props) => {
  return (
    <ConditionalWrapper
      condition={displayStore.showPage !== "profil"}
      wrap={(children) => (
        <Tooltip placement="left" title="Edit profil">
          {children}
        </Tooltip>
      )}
    >
      {displayStore.showPage === "profil" ? (
        <div
          className="FloatButton__float"
          onClick={() => displayStore.setShowPage("daily")}
        >
          <CloseOutlined className="FloatButton__close" />
        </div>
      ) : userStore.picUrl ? (
        <div
          className="FloatButton__float"
          style={{
            backgroundImage: `url(${userStore.picUrl})`,
            backgroundSize: "cover",
          }}
          onClick={() => displayStore.setShowPage("profil")}
        ></div>
      ) : (
        <div
          className="FloatButton__float FloatButton__background"
          onClick={() => displayStore.setShowPage("profil")}
        >
          <UserOutlined className="FloatButton__icon" />
        </div>
      )}
    </ConditionalWrapper>
  );
});
