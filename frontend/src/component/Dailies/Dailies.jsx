import { useState, useEffect } from "react";
import { getDailies } from "./getDailies";
import { getActivities } from "./getActivities";
import { Activity } from "../Activity/Activity";
import { notification } from "antd";

import "./Dailies.css";

export const Dailies = () => {
  const [dailies, setDailies] = useState([]);
  const [limit, setLimit] = useState(2);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [displayedDaily, setDisplayedDaily] = useState(0);
  const [maxDaily, setMaxDaily] = useState(limit);

  const fetchData = async (limitFilter) => {
    console.log("here", limitFilter);
    try {
      const [fetchedDailies, fetchedActivities] = await Promise.all([
        getDailies(limitFilter),
        getActivities(),
      ]);
      setDailies(fetchedDailies);
      setActivities(fetchedActivities);
      if (!fetchedDailies.length) {
        setError(true);
      }
      setMaxDaily(fetchedDailies.length);
      console.log("maxDaily", fetchedDailies.length);
    } catch (error) {
      console.log(error.message);
      notification.error({
        message: error.message,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(limit);
  }, []);

  const keyDownHandler = (event) => {
    event.preventDefault();
    document.removeEventListener("keydown", keyDownHandler);

    const keyPressed = event.key.toLowerCase();
    if (keyPressed === "arrowdown") {
      const displayDaily =
        displayedDaily !== maxDaily ? displayedDaily + 1 : displayedDaily;
      console.log("displayDaily", displayDaily);
      setDisplayedDaily(displayDaily);
      const dailyTargetTop =
        document.getElementById(`daily${displayDaily}`).getBoundingClientRect()
          .top + window.scrollY;
      window.scrollTo({
        top: dailyTargetTop,
        behavior: "smooth",
      });
      const fetchOneMore = limit + 1;
      fetchData(fetchOneMore);
      setLimit(fetchOneMore);
    } else if (keyPressed === "arrowup") {
      const displayDaily = displayedDaily ? displayedDaily - 1 : displayedDaily;
      console.log("displayDaily", displayDaily);
      setDisplayedDaily(displayDaily);
      const dailyTargetTop =
        document
          .getElementById(`daily${displayedDaily}`)
          .getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: dailyTargetTop,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      document.addEventListener("keydown", keyDownHandler);
    }, 100);
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
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
  for (let i = 0; i < maxDaily; i++) {
    listDailies.push(
      <>
        <div className="Dailies__full" id={`daily${i}`}>
          <div className="dailies__date">
            {dailies.length > 0 ? (
              <div>
                {dailies[i].day}.{dailies[i].month}.{dailies[i].year}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="dailies__main">{formattedDaily(i)}</div>
        </div>
      </>
    );
  }

  return isLoading ? (
    <div className="spinner">
      <img
        src="https://avatars0.githubusercontent.com/u/12551446"
        className="loader"
        alt="Loading"
      />
    </div>
  ) : error ? (
    <div>Error! Something terrible must have happened.</div>
  ) : (
    <>{listDailies}</>
  );
};
