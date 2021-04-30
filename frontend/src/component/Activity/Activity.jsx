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
import { Tooltip, notification, Popconfirm } from "antd";
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

  const dayFromToday = props.dayFromToday;
  const id = props.dailies.id;
  const activity = props.activity.activity;
  const increment = props.activity.increment;
  const goal = props.activity.goal;
  const optional = props.activity.optional;

  const done =
    count >= goal ? (goal ? true : count > goal ? true : false) : false;

  const handleMouseOver = () => {
    if (dayFromToday < 2) {
      if (goal > 1) {
        document.getElementById(
          activity + dayFromToday + "_minus"
        ).style.display = "block";
        document.getElementById(
          activity + dayFromToday + "_plus"
        ).style.display = "block";
      } else {
        document.getElementById(
          activity + dayFromToday + "_check"
        ).style.display = "block";
      }
    }
  };

  const handleMouseLeave = () => {
    if (dayFromToday < 2) {
      if (goal > 1) {
        document.getElementById(
          activity + dayFromToday + "_minus"
        ).style.display = "none";
        document.getElementById(
          activity + dayFromToday + "_plus"
        ).style.display = "none";
      } else {
        document.getElementById(
          activity + dayFromToday + "_check"
        ).style.display = "none";
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
      <div className="Activity__item">
        {optional && !done && <div className="Activity__optional" />}
        {done && (
          <div className="Activity__doneContainer">
            <div className="Activity__done">
              <CheckOutlined />
            </div>
          </div>
        )}
        <div
          className={`Activity__actionContainer ${
            goal === 0 ? "" : "Activity__actionContainerHover"
          }`}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          {goal > 1 ? (
            <>
              <>
                {dayFromToday === 0 ? (
                  <div
                    className="Activity__action"
                    id={activity + dayFromToday + "_minus"}
                    onClick={handleMinusClick}
                  >
                    <MinusOutlined />
                  </div>
                ) : (
                  <Popconfirm
                    title={
                      <>
                        Update this task from{" "}
                        <b>
                          <u>yesterday</u>
                        </b>
                        ?
                      </>
                    }
                    placement="bottom"
                    onConfirm={handleMinusClick}
                    okText="Yes"
                    cancelText="No"
                  >
                    <div
                      className="Activity__action"
                      id={activity + dayFromToday + "_minus"}
                    >
                      <MinusOutlined />
                    </div>
                  </Popconfirm>
                )}
                {dayFromToday === 0 ? (
                  <div
                    className="Activity__action"
                    id={activity + dayFromToday + "_plus"}
                    onClick={handlePlusClick}
                  >
                    <PlusOutlined />
                  </div>
                ) : (
                  <Popconfirm
                    title={
                      <>
                        Update this task from{" "}
                        <b>
                          <u>yesterday</u>
                        </b>
                        ?
                      </>
                    }
                    placement="bottom"
                    onConfirm={handlePlusClick}
                    okText="Yes"
                    cancelText="No"
                  >
                    <div
                      className="Activity__action"
                      id={activity + dayFromToday + "_plus"}
                    >
                      <PlusOutlined />
                    </div>
                  </Popconfirm>
                )}
              </>
            </>
          ) : !done ? (
            <>
              {dayFromToday === 0 ? (
                <div
                  className="Activity__action"
                  id={activity + dayFromToday + "_check"}
                  onClick={handlePlusClick}
                >
                  <CheckOutlined />
                </div>
              ) : (
                <Popconfirm
                  title={
                    <>
                      Update this task from{" "}
                      <b>
                        <u>yesterday</u>
                      </b>
                      ?
                    </>
                  }
                  placement="bottom"
                  onConfirm={handlePlusClick}
                  okText="Yes"
                  cancelText="No"
                >
                  <div
                    className="Activity__action"
                    id={activity + dayFromToday + "_check"}
                  >
                    <CheckOutlined />
                  </div>
                </Popconfirm>
              )}
            </>
          ) : (
            <>
              {dayFromToday === 0 ? (
                <div
                  className="Activity__action"
                  id={activity + dayFromToday + "_check"}
                  onClick={handleMinusClick}
                >
                  <CloseOutlined />
                </div>
              ) : (
                <Popconfirm
                  title={
                    <>
                      Update this task from{" "}
                      <b>
                        <u>yesterday</u>
                      </b>
                      ?
                    </>
                  }
                  placement="bottom"
                  onConfirm={handleMinusClick}
                  okText="Yes"
                  cancelText="No"
                >
                  <div
                    className="Activity__action"
                    id={activity + dayFromToday + "_check"}
                  >
                    <CloseOutlined />
                  </div>
                </Popconfirm>
              )}
            </>
          )}
        </div>

        <Logo image={props.activity.activity} />

        <div className={`Activity__text }`}>
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
