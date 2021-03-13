import { useState, useEffect } from "react";
import { getDailies } from "./getDailies";
import { getActivities } from "./getActivities";
import { Activity } from "../Activity/Activity";

import "./Dailies.css";

export const Dailies = () => {
  const [dailies, setDailies] = useState([]);
  const [limit, setLimit] = useState(2);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reachedLast, setReachedLast] = useState();

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
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const formattedDaily = (dayFromToday) => {
    return activities.map((activities) => {
      return (
        <Activity
          activity={activities}
          dailies={dailies[dayFromToday]}
          key={activities.activity}
        />
      );
    });
  }

  let listDailies = [];
  const max = reachedLast > limit ? limit : reachedLast ? reachedLast : limit;
  for (let i = 0; i < max; i++) {
    listDailies.push(
      <>
        <div className="Dailies__full">
          {dailies.length > 0 ? (<div>{dailies[i].day}.{dailies[i].month}.{dailies[i].year}</div>) : ""}
          <div className="dailies__main">{formattedDaily(i)}</div>
        </div>
      </>
    )
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
    <div>
      Error! Something terrible must have happened.
    </div>
  ) : (
        <>
          {listDailies}
        </>
      );
};
