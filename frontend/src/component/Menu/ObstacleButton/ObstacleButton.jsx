import { useState, useEffect } from "react";
import { ExclamationOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import './ObstacleButton.css'

export const ObstacleButton = () => {
    const [showObstacle, setShowObstacle] = useState(true);
    const [tooltipTitle, setTooltipTitle] = useState("Any obstacle?");

    useEffect(() => {
        showObstacle
            ? setTimeout(function () {
                document.getElementById(
                    "ObstacleButton__actionContainer"
                ).style.display = "inline-block";
            }, 200)
            : (document.getElementById(
                "ObstacleButton__actionContainer"
            ).style.display = "none");
    }, [showObstacle]);

    return (
        <Tooltip placement="left" title={tooltipTitle}>
            <div className={showObstacle ? "ObstacleButton__open ObstacleButton__float" : "ObstacleButton__float"}>
                <div id="ObstacleButton__actionContainer">
                    <div className="ObstacleButton__element" onMouseOver={() => { setTooltipTitle('Traveling?') }}>
                        <img
                            src={process.env.REACT_APP_API_URL + `/images/airplane.svg`}
                            alt='airplane'
                            width='25px'

                        />
                    </div>
                    <div className="ObstacleButton__element" onMouseOver={() => { setTooltipTitle('Sick?') }}>
                        <img
                            src={process.env.REACT_APP_API_URL + `/images/virus.svg`}
                            alt='virus'
                            width='22px'
                        />
                    </div>
                </div>
                <ExclamationOutlined
                    className="FloatButton__icon"
                    onClick={() => { setShowObstacle(!showObstacle) }}
                    onMouseOver={() => { setTooltipTitle('Any obstacle?') }}
                />
            </div>
        </Tooltip>
    )
} 