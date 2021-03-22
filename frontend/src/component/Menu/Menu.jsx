import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import "./Menu.css";
import { convertLegacyProps } from "antd/lib/button/button";

export const Menu = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [hasImage, setHasImage] = useState(true);
  return (
    <Tooltip title="Profil">
      {hasImage ? (
        <div
          className="Menu__float"
          style={{
            backgroundImage:
              "url(https://avatars0.githubusercontent.com/u/12551446)",
            backgroundSize: "cover",
          }}
        ></div>
      ) : (
        <div className="Menu__float Menu__background">
          <UserOutlined className="Menu__icon" />
        </div>
      )}
    </Tooltip>
  );
};

/* */
