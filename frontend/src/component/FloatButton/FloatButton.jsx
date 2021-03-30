import { useEffect } from "react";
import { UserOutlined, CloseOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { observer } from "mobx-react";

import { getUser } from "../Profil/getUser";
import { userStore } from "../../store/userStore";
import { ConditionalWrapper } from "../../helpers/ConditionnalWrapper";

import "./FloatButton.css";

export const FloatButton = observer((props) => {
  useEffect(() => {
    getUser();
  }, []);

  return (
    <ConditionalWrapper
      condition={!props.showProfil}
      wrap={(children) => (
        <Tooltip placement="left" title="Edit profil">
          {children}
        </Tooltip>
      )}
    >
      {props.showProfil ? (
        <div
          className="FloatButton__float"
          onClick={() => props.setShowProfil(false)}
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
          onClick={() => props.setShowProfil(true)}
        ></div>
      ) : (
            <div
              className="FloatButton__float FloatButton__background"
              onClick={() => props.setShowProfil(true)}
            >
              <UserOutlined className="FloatButton__icon" />
            </div>
          )}
    </ConditionalWrapper>
  );
});
