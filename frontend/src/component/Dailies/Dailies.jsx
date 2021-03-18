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
  const [lastknownWindowPosition, setLastknownWindowPosition] = useState(
    window.scrollY
  );
  const [displayedDaily, setDisplayedDaily] = useState(0);

  // Max daily counting from zero
  const maxDaily =
    (reachedLast > limit ? limit : reachedLast ? reachedLast : limit) - 1;

  const fetchData = async () => {
    try {
      const [fetchedDailies, fetchedActivities] = await Promise.all([
        getDailies(limit),
        getActivities(),
      ]);
      setDailies(fetchedDailies);
      setActivities(fetchedActivities);
      if (!fetchedDailies.length) {
        setError(true);
      }
      if (fetchedDailies.length < limit) {
        setReachedLast(fetchedDailies.length);
      }
    } catch (error) {
      console.log(error.message);
      notification.error({
        message: error.message,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Throttlingvs debounce
  // after 100ms consume event again
  useEffect(() => {
    const keyDownHandler = (event) => {
      event.preventDefault();
      const keyPressed = event.key.toLowerCase();
      if (keyPressed === "arrowdown") {
        const dailyTargetTop =
          document
            .getElementById(`daily${displayedDaily + 1}`)
            .getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: dailyTargetTop,
          behavior: "smooth",
        });
      } else if (keyPressed === "arrowup") {
        const dailyTargetTop =
          document
            .getElementById(`daily${displayedDaily}`)
            .getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: dailyTargetTop,
          behavior: "smooth",
        });
      }
    };

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
  for (let i = 0; i <= maxDaily; i++) {
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
