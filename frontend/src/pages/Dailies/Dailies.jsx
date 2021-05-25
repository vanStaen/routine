import { useState, useEffect, useRef, useCallback } from "react";

import { getDailies } from "./getDailies";
import { getActivities } from "./getActivities";
import { Activity } from "../../component/Activity/Activity";
import { CountDown } from "../../component/CountDown/CountDown";
import { Spinner } from "../../component/Spinner/Spinner";
import { getStreak } from "./getStreak";
import { streakStore } from "../../store/streakStore";
import getYesterdayDate from "../../helpers/getYesterdayDate";
import getTomorrowDate from "../../helpers/getTomorrowDate";

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


  const fetchStreak = useCallback(async (year, month, day, dayFromToday) => {

    console.log(streakStore.dailyStreaks);

    // should fetch both Yesterday, Today and Tomorrow. 
    const dateYesterday = getYesterdayDate(year, month, day);
    const datetomorrow = getTomorrowDate(year, month, day);

    // check if today is in store already
    if (streakStore.dailyStreaks.has(dayFromToday)) {
      // if not, fetch and store
      try {
        const fetchedStreak = await getStreak(year, month, day);
        streakStore.setDailyStreaks(fetchedStreak, dayFromToday);
      } catch (error) {
        console.log(error.message);
      }
    }
    // check if yesterday is in store already
    if (streakStore.dailyStreaks.has(dayFromToday + 1)) {
      // if not, fetch and store
      try {
        const fetchedStreak = await getStreak(dateYesterday[0], dateYesterday[1], dateYesterday[2]);
        streakStore.setDailyStreaks(fetchedStreak, dayFromToday + 1);
      } catch (error) {
        console.log(error.message);
      }
    }
    // check if yesterday is in store already
    if (streakStore.dailyStreaks.has(dayFromToday - 1) && dayFromToday > 0) {
      // if not, fetch and store
      try {
        const fetchedStreak = await getStreak(datetomorrow[0], datetomorrow[1], datetomorrow[2]);
        streakStore.setDailyStreaks(fetchedStreak, dayFromToday - 1);
      } catch (error) {
        console.log(error.message);
      }
    }
  }, []);

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

  const formattedDaily = (dayFromToday) => {
    const year = dailies[dayFromToday].year;
    const month = dailies[dayFromToday].month;
    const day = dailies[dayFromToday].day;
    fetchStreak(year, month, day, dayFromToday);
    return activities.map((activities) => {
      return (
        <Activity
          activity={activities}
          dailies={dailies[dayFromToday]}
          key={activities.name}
          dayFromToday={dayFromToday}
        />
      );
    });
  };

  let listDailies = [];
  for (let i = 0; i < limit.current; i++) {
    listDailies.push(
      <div className="Dailies__full" id={`daily${i}`} key={`daily${i}`}>
        <div className="dailies__date">
          {i === 0 && <CountDown />}
          {i === 1 && `Yesterday`}
          {i > 1 && `${dailies[i].day}.${dailies[i].month}.${dailies[i].year}`}
        </div>
        <div className="dailies__main">{formattedDaily(i)}</div>
      </div>
    );
  }

  return isLoading ? <Spinner /> : listDailies;
};
