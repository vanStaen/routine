import { useState } from "react";
import { Logo } from "../Logo/Logo";
import { Streak } from "../Streak/Streak";
import {
  CheckOutlined,
  PlusOutlined,
  MinusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Tooltip, notification } from "antd";
import { patchDaily } from "./patchDaily";

import "./Daily.css";

export const Daily = (props) => {
  const [count, setCount] = useState(
    props.dailies[props.activity.activity]
      ? props.dailies[props.activity.activity]
      : 0
  );

  const activity = props.activity.activity;
  const increment = props.activity.increment;
  const goal = props.activity.goal;

  const done =
    count >= goal ? (goal ? true : count > goal ? true : false) : false;

  const handleMouseOver = () => {
    if (goal > 1) {
      document.getElementById(activity + "_minus").style.display = "block";
      document.getElementById(activity + "_plus").style.display = "block";
    } else {
      document.getElementById(activity + "_check").style.display = "block";
    }
  };

  const handleMouseLeave = () => {
    if (goal > 1) {
      document.getElementById(activity + "_minus").style.display = "none";
      document.getElementById(activity + "_plus").style.display = "none";
    } else {
      document.getElementById(activity + "_check").style.display = "none";
    }
  };

  const handlePlusClick = async () => {
    const newCount = count + increment;
    const resultPlus = await patchDaily(activity, newCount);
    if (resultPlus.status === 200) {
      setCount(newCount);
    } else {
      notification.error({
        message: "Error!",
        description: resultPlus.message,
      });
    }
  };

  const handleMinusClick = async () => {
    const newCount = count >= increment ? count - increment : 0;
    const resultMinus = await patchDaily(activity, newCount);
    if (resultMinus.status === 200) {
      setCount(newCount);
    } else {
      notification.error({
        message: "Error!",
        description: resultMinus.message,
      });
    }
  };

  return (
    <Tooltip
      placement="top"
      title={
        <>
          {props.activity.name} <Streak activity={props.activity} />
        </>
      }
    >
      <div className="daily__item">
        {!goal && !done && <div className="daily__optional" />}

        {done && (
          <div className="daily__doneContainer">
            <div className="daily__done">
              <CheckOutlined />
            </div>
          </div>
        )}

        <div
          className={`daily__actionContainer ${
            goal === 0 ? "" : "daily__actionContainerHover"
          }`}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          {goal > 1 ? (
            <>
              <div
                className="daily__action"
                id={activity + "_minus"}
                onClick={handleMinusClick}
              >
                <MinusOutlined />
              </div>
              <div
                className="daily__action"
                id={activity + "_plus"}
                onClick={handlePlusClick}
              >
                <PlusOutlined />
              </div>
            </>
          ) : !done ? (
            <>
              <div
                className="daily__action"
                id={activity + "_check"}
                onClick={handlePlusClick}
              >
                <CheckOutlined />
              </div>
            </>
          ) : (
            <>
              <div
                className="daily__action"
                id={activity + "_check"}
                onClick={handleMinusClick}
              >
                <CloseOutlined />
              </div>
            </>
          )}
        </div>

        <Logo activity={props.activity} />

        <div className={`daily__text }`}>
          {goal > 1 ? `${count} / ${goal} ` : `${props.activity.unit}!`}
          {goal > 1 && props.activity.unit}
          {goal === 0 && (
            <div style={{ fontStyle: "italic", fontSize: ".7em" }}>
              <i>optional</i>
            </div>
          )}
        </div>
      </div>
    </Tooltip>
  );
};
