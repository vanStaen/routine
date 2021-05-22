import { useState, useEffect } from "react";
import { ExclamationOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import './ObstacleButton.css'
import travelLogo from './travel.png';
import sickLogo from './sick.png';
import Snowflake from '../../Activity/snowflake.png'


export const ObstacleButton = () => {
    const [showObstacle, setShowObstacle] = useState(false);
    const [travel, setTravel] = useState(false);
    const [sick, setSick] = useState(false);
    const [tooltipTitle, setTooltipTitle] = useState("Freeze your streak?");

    const obstacleHandler = (type) => {
        if (type === "travel") {
            setTravel(!travel);
        } else if (type === "sick") {
            setSick(!sick);

        }
    }

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
            <div className={showObstacle ? "ObstacleButton__open ObstacleButton__float" : "ObstacleButton__close ObstacleButton__float"}>
                {(travel || sick) && <div className="ObstacleButton__snowflakeContainer">
                    <img
                        src={Snowflake}
                        alt='travel'
                        className='ObstacleButton__snowflake'
                    />
                </div>
                }
                <div id="ObstacleButton__actionContainer">
                    <div
                        className={`ObstacleButton__element ${!travel && "ObstacleButton__elementGray"}`}
                        onMouseOver={() => { setTooltipTitle('Out of town?') }}
                        onClick={() => { obstacleHandler("travel") }}>
                        <img
                            src={travelLogo}
                            alt='travel'
                            className='ObstacleButton__logo'

                        />
                    </div>
                    <div
                        className={`ObstacleButton__element ${!sick && "ObstacleButton__elementGray"}`}
                        onMouseOver={() => { setTooltipTitle('Not feeling well?') }}
                        onClick={() => { obstacleHandler("sick") }}>
                        <img
                            src={sickLogo}
                            alt='sick'
                            className='ObstacleButton__logo'
                        />
                    </div>
                    <div className="ObstacleButton__separator">|</div>
                </div>
                <ExclamationOutlined
                    className="FloatButton__icon"
                    onClick={() => { setShowObstacle(!showObstacle) }}
                    onMouseOver={() => { setTooltipTitle('Freeze your streak?') }}
                />
            </div>
        </Tooltip>
    )
} 