import { useState, useEffect } from "react";
import { getDailies } from "./getDailies";
import { getActivities } from "./getActivities";
import { Activity } from "../Activity/Activity";
import { notification } from "antd";

import "./Dailies.css";

export const Dailies = () => {
  const [dailies, setDailies] = useState([]);
  const [limit, setLimit] = useState(3);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reachedLast, setReachedLast] = useState();
  const [lastknownWindowPosition, setLastknownWindowPosition] = useState(window.scrollY);

  const windowsHeight = window.screen.height;

  const fetchData = async () => {
    try {
      const [fetchedDailies, fetchedActivities] = await Promise.all([
        getDailies(limit),
        getActivities(),
      ]);
      setDailies(fetchedDailies);
      setActivities(fetchedActivities);
      if (!fetchedDailies.length) { setError(true) };
      if (fetchedDailies.length < limit) { setReachedLast(fetchedDailies.length) };
    } catch (error) {
      console.log(error.message);
      notification.error({
        message: error.message,
      });
    }
    setIsLoading(false);
  };

  const handlerScroll = (event) => {
    if (lastknownWindowPosition < window.scrollY) {
      const dailyTargetDownTop = document.getElementById("daily2").getBoundingClientRect().top + window.scrollY;
      console.log(dailyTargetDownTop);
      /*window.scrollTo({
        top: dailyTargetDownTop,
        behavior: 'smooth'
      });*/
    } else if (lastknownWindowPosition > window.scrollY) {
      const dailyTargetUpTop = document.getElementById("daily1").getBoundingClientRect().top + window.scrollY;
      console.log(dailyTargetUpTop);
      /*window.scrollTo({
        top: dailyTargetUpTop,
        behavior: 'smooth'
      });*/
    }
    setLastknownWindowPosition(window.scrollY);
  }

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    window.addEventListener("scroll", handlerScroll);
    return () => window.removeEventListener("scroll", handlerScroll);
  });


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
  }

  let listDailies = [];
  const max = reachedLast > limit ? limit : reachedLast ? reachedLast : limit;
  for (let i = 0; i < max; i++) {
    listDailies.push(
      <>
        <div className="Dailies__full" id={`daily${i}`}>
          <div className="dailies__date">{dailies.length > 0 ? (<div>{dailies[i].day}.{dailies[i].month}.{dailies[i].year}</div>) : ""}</div>
          <div className="dailies__main">{formattedDaily(i)}</div>
        </div>
      </>
    )
  }

  //window.scrollTo(windowsHeight, 0);

  return isLoading ? (
    <div className="spinner">
      <img
        src="https://avatars0.githubusercontent.com/u/12551446"
        className="loader"
        alt="Loading"
      />
    </div>
  ) : error ? (
    <div>
      Error! Something terrible must have happened.
    </div>
  ) : (
        <>
          {listDailies}
        </>
      );
};
