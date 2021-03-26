import { useState, useEffect } from "react";
import getTomorrowDate from "../../helpers/getTomorrowDate";

import "./CountDown.css";

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

const formatTimeStamp = (timeInSec) => {
  var sec_num = parseInt(timeInSec, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};

const timeLeftUntilTomorrow = () => {
  const nowInSecond = Math.floor(Date.now() / 1000);
  const tomorrowArray = getTomorrowDate(year, month, day);
  const tomorrowInSecond = Math.floor(
    new Date(
      Date.UTC(
        tomorrowArray[0],
        tomorrowArray[1] - 1,
        tomorrowArray[2],
        "00",
        "00",
        "00"
      )
    ) / 1000
  );
  const differenceInSecond = tomorrowInSecond - nowInSecond - 3600;
  return differenceInSecond;
};

export const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState(timeLeftUntilTomorrow());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(timeLeftUntilTomorrow());
    }, 1000);
  }, [timeLeft]);

  return (
    <div className={timeLeft < 7200 && "countdown__alert"}>
      {formatTimeStamp(timeLeft)}
    </div>
  );
};
