import { useState, useEffect, useRef, useCallback } from "react";

import { getDailies } from "./getDailies";
import { getActivities } from "./getActivities";
import { CountDown } from "../../component/CountDown/CountDown";
import { Spinner } from "../../component/Spinner/Spinner";
import { Daily } from "./Daily";

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
    }
    setIsLoading(false);
  };

  const keyDownHandler = useCallback((event) => {
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
  }, []);

  const scrollHandler = useCallback((event) => {
    //Scroll position define displayedDaily
    displayedDaily.current = Math.round(window.scrollY / window.innerHeight);
    if (!lastDailyreached.current) {
      if (limit.current === displayedDaily.current + 1) {
        limit.current = displayedDaily.current + 2;
        fetchData(displayedDaily.current + 2);
      }
    }
  }, []);

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
  }, [keyDownHandler, scrollHandler]);

  return isLoading ? <Spinner /> :
    dailies.map((daily, index) => {
      return (<div className="Dailies__full" id={`daily${index}`} key={`daily${index}`}>
        <div className="dailies__date">
          {index === 0 && <CountDown />}
          {index === 1 && `Yesterday`}
          {index > 1 && `${daily.day}.${daily.month}.${daily.year}`}
        </div>
        <div className="dailies__main">
          <Daily
            dayFromToday={index}
            activities={activities}
            daily={daily}
          />
        </div>
      </div>)
    });
};
