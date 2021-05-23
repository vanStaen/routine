import { useState, useEffect, useCallback } from "react";
import { ExclamationOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import travelLogo from './travel.png';
import sickLogo from './sick.png';
import sofaLogo from './sofa.png';
import Snowflake from '../../Activity/snowflake.png';
import { postObstacle } from './postObstacle';
import { deleteObstacle } from './deleteObstacle';
import { getObstacle } from './getObstacle';

import './ObstacleButton.css';

export const ObstacleButton = () => {
    const [showObstacle, setShowObstacle] = useState(false);
    const [travel, setTravel] = useState(0);
    const [sick, setSick] = useState(0);
    const [sofa, setSofa] = useState(0);
    const [tooltipTitle, setTooltipTitle] = useState("Freeze your streak?");

    const obstacleHandler = async (type) => {
        if (type === "travel") {
            if (travel) {
                try {
                    deleteObstacle(travel);
                    setTravel(0);
                } catch (err) {
                    console.log(err);
                }
            }
            else {
                try {
                    await postObstacle('travel', 'travel');
                    await fetchObstacle();
                } catch (err) {
                    console.log(err);
                }
            }
        } else if (type === "sick") {
            if (sick) {
                try {
                    deleteObstacle(sick)
                    setSick(0);
                } catch (err) {
                    console.log(err);
                }
            }
            else {
                try {
                    await postObstacle('sick', 'sick');
                    await fetchObstacle();
                } catch (err) {
                    console.log(err);
                }
            }
        } else if (type === "sofa") {
            if (sofa) {
                try {
                    deleteObstacle(sofa)
                    setSofa(0);
                } catch (err) {
                    console.log(err);
                }
            }
            else {
                try {
                    await postObstacle('sofa', 'sofa');
                    await fetchObstacle();
                } catch (err) {
                    console.log(err);
                }
            }
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

    const fetchObstacle = useCallback(async () => {
        const getObs = await getObstacle();
        if (getObs.data !== undefined) {
            const foundTravel = await getObs.data.find(obs => obs.type === "travel");
            if (foundTravel) {
                setTravel(foundTravel.id);
            }
            const foundSick = await getObs.data.find(obs => obs.type === "sick");
            if (foundSick) {
                setSick(foundSick.id);
            }
            const foundSofa = await getObs.data.find(obs => obs.type === "sofa");
            if (foundSofa) {
                setSofa(foundSofa.id);
            }
        }
    }, []);

    useEffect(() => {
        fetchObstacle()
    }, [fetchObstacle])

    return (
        <Tooltip placement="left" title={tooltipTitle}>
            <div className={showObstacle ? "ObstacleButton__open ObstacleButton__float" : "ObstacleButton__close ObstacleButton__float"}>
                {(!!travel || !!sick || !!sofa) && <div className="ObstacleButton__snowflakeContainer">
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
                    <div
                        className={`ObstacleButton__element ${!sofa && "ObstacleButton__elementGray"}`}
                        onMouseOver={() => { setTooltipTitle('Enjoy a cheat-day?') }}
                        onClick={() => { obstacleHandler("sofa") }}>
                        <img
                            src={sofaLogo}
                            alt='sofa'
                            className='ObstacleButton__logoSofa'
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