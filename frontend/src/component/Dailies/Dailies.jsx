import { useState, useEffect, useRef } from "react";
import { notification } from "antd";

import { getDailies } from "./getDailies";
import { getActivities } from "./getActivities";
import { Activity } from "../Activity/Activity";
import { CountDown } from "../CountDown/CountDown";
import { Spinner } from "../Spinner/Spinner";

import "./Dailies.css";

export const Dailies = () => {
  const [dailies, setDailies] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const limit = useRef(2);
  const displayedDaily = useRef(0);
  const lastDaily = useRef(null);
  const lastDailyreached = useRef(false);
  const throttling = useRef(false);

  const fetchData = async (limitFilter) => {
    try {
      const [fetchedDailies, fetchedActivities] = await Promise.all([
        getDailies(limitFilter + 1),
        getActivities(),
      ]);
      setDailies(fetchedDailies);
      setActivities(fetchedActivities);
      if (limitFilter + 1 > fetchedDailies.length) {
        lastDailyreached.current = true;
        lastDaily.current = displayedDaily.current + 1;
      }
    } catch (error) {
      console.log(error.message);
      notification.error({
        message: error.message,
      });
    }
    setIsLoading(false);
  };

  const keyDownHandler = (event) => {
    event.preventDefault();
    const keyPressed = event.key.toLowerCase();

    if (throttling.current === false) {
      throttling.current = true;
      if (keyPressed === "arrowdown") {
        if (lastDaily.current !== displayedDaily.current - 1) {
          const displayDaily = displayedDaily.current + 1;
          const dailyTargetTop =
            document
              .getElementById(`daily${displayDaily}`)
              .getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: dailyTargetTop,
            behavior: "smooth",
          });
        }
        if (!lastDailyreached.current) {
          limit.current++;
          const fetchOneMore = limit.current;
          fetchData(fetchOneMore);
        }
      } else if (keyPressed === "arrowup") {
        if (displayedDaily.current > 0) {
          const displayDaily = displayedDaily.current - 1;
          const dailyTargetTop =
            document
              .getElementById(`daily${displayDaily}`)
              .getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: dailyTargetTop,
            behavior: "smooth",
          });
        }
      } else if (keyPressed === "enter") {
        displayedDaily.current = 0;
        const dailyTargetTop =
          document.getElementById(`daily0`).getBoundingClientRect().top +
          window.scrollY;
        window.scrollTo({
          top: dailyTargetTop,
          behavior: "smooth",
        });
      }
      setTimeout(() => {
        throttling.current = false;
      }, 500);
    }
  };

  const scrollHandler = (event) => {
    //Scroll position define displayedDaily
    displayedDaily.current = Math.round(window.scrollY / window.innerHeight);
    if (!lastDailyreached.current) {
      if (limit.current === displayedDaily.current + 1) {
        limit.current = displayedDaily.current + 2;
        fetchData(displayedDaily.current + 2);
      }
    }
  };

  useEffect(() => {
    fetchData(limit.current);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const formattedDaily = (dayFromToday) => {
    return activities.map((activities) => {
      return (
        <Activity
          activity={activities}
          dailies={dailies[dayFromToday]}
          key={activities.activity}
          disabled={dayFromToday ? true : false}
        />
      );
    });
  };

  let listDailies = [];
  for (let i = 0; i < limit.current; i++) {
    listDailies.push(
      <div className="Dailies__full" id={`daily${i}`} key={i}>
        <div className="dailies__date">
          <div>
            {i === 0 && <CountDown />}
            {i === 1 && `Yesterday`}
            {i > 1 &&
              `${dailies[i].day}.${dailies[i].month}.${dailies[i].year}`}
          </div>
        </div>
        <div className="dailies__main">{formattedDaily(i)}</div>
      </div>
    );
  }

  return isLoading ? (
    <div className="Dailies__full">
      <Spinner />
    </div>
  ) : (
    listDailies
  );
};
