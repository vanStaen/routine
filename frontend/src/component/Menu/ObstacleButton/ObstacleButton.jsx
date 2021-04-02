import { ExclamationOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export const ObstacleButton = () => {
    return (
        <Tooltip placement="left" title="Any obstacle?">
            <div className="FloatButton__float  FloatButton__background">
                <ExclamationOutlined className="FloatButton__icon" />
            </div>
        </Tooltip>
    )
} 