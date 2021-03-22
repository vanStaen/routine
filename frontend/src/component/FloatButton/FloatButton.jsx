import { useState } from "react";
import { UserOutlined, CloseOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import "./FloatButton.css";

export const FloatButton = (props) => {
  const [hasImage, setHasImage] = useState(true);
  return (
    <Tooltip title={props.showProfil ? "Go back to main" : "Profil"}>
      {props.showProfil ? (
        <div
          className="FloatButton__float"
          onClick={() => props.setShowProfil(false)}
        >
          <CloseOutlined className="FloatButton__close" />
        </div>
      ) : hasImage ? (
        <div
          className="FloatButton__float"
          style={{
            backgroundImage:
              "url(https://avatars0.githubusercontent.com/u/12551446)",
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
    </Tooltip>
  );
};

/* */
