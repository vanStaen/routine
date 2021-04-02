import { PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export const SporadicButton = () => {
    return (
        <Tooltip placement="left" title="Add sporatical task">
            <div className="FloatButton__float  FloatButton__background">
                <PlusOutlined className="FloatButton__icon" />
            </div>
        </Tooltip>
    )
} 