import { useState } from "react";
import { Logo } from "../Logo/Logo";
import { Streak } from "../Streak/Streak";
import {
  CheckOutlined,
  PlusOutlined,
  MinusOutlined,
  CloseOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Tooltip, notification } from "antd";
import { patchActvitiy } from "./patchActvitiy";

import "./Activity.css";

export const Activity = (props) => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateLoadingError, setUpdateLoadingError] = useState(false);
  const [count, setCount] = useState(
    props.dailies[props.activity.activity]
      ? props.dailies[props.activity.activity]
      : 0
  );

  const id = props.dailies.id;
  const activity = props.activity.activity;
  const increment = props.activity.increment;
  const goal = props.activity.goal;
  const optional = props.activity.optional;

  const done =
    count >= goal ? (goal ? true : count > goal ? true : false) : false;

  const handleMouseOver = () => {
    if (!props.disabled) {
      if (goal > 1) {
        document.getElementById(activity + "_minus").style.display = "block";
        document.getElementById(activity + "_plus").style.display = "block";
      } else {
        document.getElementById(activity + "_check").style.display = "block";
      }
    }
  };

  const handleMouseLeave = () => {
    if (!props.disabled) {
      if (goal > 1) {
        document.getElementById(activity + "_minus").style.display = "none";
        document.getElementById(activity + "_plus").style.display = "none";
      } else {
        document.getElementById(activity + "_check").style.display = "none";
      }
    }
  };

  const handlePlusClick = async () => {
    setUpdateLoading(true);
    setUpdateLoadingError(false);
    const newCount = count + increment;
    const resultPlus = await patchActvitiy(id, activity, newCount);
    if (resultPlus.status === 200) {
      setCount(newCount);
      setUpdateLoading(false);
    } else {
      notification.error({
        message: resultPlus.message,
      });
      setUpdateLoadingError(true);
    }
  };

  const handleMinusClick = async () => {
    setUpdateLoading(true);
    setUpdateLoadingError(false);
    const newCount = count >= increment ? count - increment : 0;
    const resultMinus = await patchActvitiy(id, activity, newCount);
    if (resultMinus.status === 200) {
      setCount(newCount);
      setUpdateLoading(false);
    } else {
      notification.error({
        message: resultMinus.message,
      });
      setUpdateLoadingError(true);
    }
  };

  return (
    <Tooltip
      placement="top"
      title={
        <>
          {props.activity.desc}{" "}
          <Streak activity={props.activity} daily={props.dailies} />
        </>
      }
    >
      <div className="daily__item">
        {optional && !done && <div className="daily__optional" />}

        {done && (
          <div className="daily__doneContainer">
            <div className="daily__done">
              <CheckOutlined />
            </div>
          </div>
        )}

        <div
          className={`daily__actionContainer ${
            goal === 0
              ? ""
              : props.disabled
              ? ""
              : "daily__actionContainerHover"
          }`}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          {goal > 1 ? (
            <>
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

        <Logo image={props.activity.activity} />

        <div className={`daily__text }`}>
          {updateLoadingError ? (
            <CloseOutlined style={{ color: "#C70039" }} />
          ) : updateLoading ? (
            <>
              {goal > 1 ? (
                <>
                  <SyncOutlined spin style={{ color: "#999" }} /> / {goal}{" "}
                </>
              ) : (
                <SyncOutlined spin style={{ color: "#999" }} />
              )}
              {goal > 1 && props.activity.unit}
            </>
          ) : (
            <>
              {goal > 1 ? `${count} / ${goal} ` : `${props.activity.unit}!`}
              {goal > 1 && props.activity.unit}
            </>
          )}
          {optional && (
            <div style={{ fontStyle: "italic", fontSize: ".7em" }}>
              <i>optional</i>
            </div>
          )}
        </div>
      </div>
    </Tooltip>
  );
};
