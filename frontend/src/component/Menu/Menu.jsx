import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import "./Menu.css";

export const Menu = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <Tooltip title="Profil">
      <div className="Menu__float">
        <UserOutlined className="Menu__icon" />
      </div>
    </Tooltip>
  );
};

// <EditOutlined />
