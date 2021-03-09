import { useEffect, useState } from "react";
import { Logo } from "../../Logo/Logo";
import { CheckOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Tooltip } from "antd";
import { patchDaily } from "./patchDaily";

import "./Daily.css";

export const Daily = (props) => {

    const [count, setCount] = useState(props.dailies[props.activity.activity]
        ? props.dailies[props.activity.activity]
        : 0)

    const activity = props.activity.activity;
    const increment = props.activity.increment;
    const goal = props.activity.goal;

    const done = (count >= goal ? (goal ? true : count > goal ? true : false) : false);

    const handleMouseOver = () => {
        document.getElementById(activity + "_minus").style.display = 'block';
        document.getElementById(activity + "_plus").style.display = 'block';
    }

    const handleMouseLeave = () => {
        document.getElementById(activity + "_minus").style.display = 'none';
        document.getElementById(activity + "_plus").style.display = 'none';
    }

    const handlePlusClick = async () => {
        let newCount = count + increment;
        let result = await patchDaily(activity, newCount);
        if (result = 200) { setCount(newCount); }
    }

    const handleMinusClick = async () => {
        let newCount = count >= increment ? count - increment : 0;
        let result = await patchDaily(activity, newCount);
        if (result = 200) { setCount(newCount); }
    }

    return (
        <Tooltip placement="top" title={`${props.activity.name}`}>
            <div key={activity} className="daily__item">

                {!goal && <div className='daily__optional' />}

                {done &&
                    (<div className='daily__doneContainer'>
                        <div className='daily__done'>
                            < CheckOutlined />
                        </div>
                    </div>)}

                <div className='daily__actionContainer' onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                    <div className='daily__action' id={activity + "_minus"}>
                        <MinusOutlined onClick={handleMinusClick} />
                    </div>
                    <div className='daily__action' id={activity + "_plus"}>
                        <PlusOutlined onClick={handlePlusClick} />
                    </div>
                </div>

                <Logo activity={props.activity} />

                <div className={`daily__text }`}>
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

