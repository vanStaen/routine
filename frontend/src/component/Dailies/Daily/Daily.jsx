import { useState, useEffect } from "react";
import { Logo } from "../../Logo/Logo";
import { CheckOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Tooltip } from "antd";

import "./Daily.css";

export const Daily = (props) => {

    const [count, setCount] = useState(props.dailies[props.activity.activity]
        ? props.dailies[props.activity.activity]
        : 0)
    const [done, setDone] = useState(props.activity.goal ? count >= props.activity.goal : false);

    const activity = props.activity.activity;
    const increment = props.activity.increment;
    const goal = props.activity.goal;

    const handleMouseOver = () => {
        document.getElementById(activity + "_minus").style.display = 'block';
        document.getElementById(activity + "_plus").style.display = 'block';
    }

    const handleMouseLeave = () => {
        document.getElementById(activity + "_minus").style.display = 'none';
        document.getElementById(activity + "_plus").style.display = 'none';
    }

    const handlePlusClick = () => {
        //
    }

    const handleMinusClick = () => {
        //
    }

    return (
        <Tooltip placement="top" title={activity.name}>
            <div key={activity} className="daily__item">

                {done && (<div className='daily__doneContainer'>
                    <div className='daily__done'>
                        < CheckOutlined />
                    </div>
                </div>)}

                <div className='daily__actionContainer' onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                    <div className='daily__action' id={activity + "_minus"}>
                        <MinusOutlined />
                    </div>
                    <div className='daily__action' id={activity + "_plus"}>
                        <PlusOutlined />
                    </div>
                </div>

                <Logo activity={props.activity} />

                <div className={`daily__text ${count >= goal && "daily__textdisabled"}`}>
                    {goal > 1 ?
                        (`${count} / ${goal} `)
                        :
                        (`${props.activity.unit}!`)}

                    {goal > 1 && props.activity.unit}
                </div>
            </div>
        </Tooltip>
    );
};

