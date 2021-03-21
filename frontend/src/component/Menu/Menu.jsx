import { EditOutlined, LoginOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import "./Menu.css";

export const Menu = () => {
  return (
    <Tooltip title="Login">
      <div className="Menu__float">
        <LoginOutlined />
      </div>
    </Tooltip>
  );
};

// <EditOutlined />
