import getTomorrowDate from "../../helpers/getTomorrowDate";

import "./CountDown.css";

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

const addLeadingZeros = (value) => {
  value = String(value);
  while (value.length < 2) {
    value = "0" + value;
  }
  return value;
};

const CountDown = () => {
  const nowInSecond = Math.floor(Date.now() / 1000);
  const tomorrowArray = getTomorrowDate(year, month, day);
  const tomorrowInSecond = Math.floor(
    new Date(
      Date.UTC(
        tomorrowArray[0],
        tomorrowArray[1] - 1,
        tomorrowArray[0],
        "00",
        "00",
        "00"
      )
    ) / 1000
  );
  const differenceInSecond = tomorrowInSecond - nowInSecond;
  return <div className="countdown">{differenceInSecond}</div>;
};

export default CountDown;
