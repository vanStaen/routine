import { useState, useEffect } from "react";
import { getDailies } from "./getDailies";
import { getActivities } from "./getActivities";
import { Daily } from "../Daily/Daily";

import "./Dailies.css";

export const Dailies = () => {
  const [dailies, setDailies] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [fetchedDailies, fetchedActivities] = await Promise.all([
        getDailies(),
        getActivities(),
      ]);
      setDailies(fetchedDailies);
      setActivities(fetchedActivities);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formattedDailies = activities.map((activities) => {
    return (
      <Daily
        activity={activities}
        dailies={dailies}
        key={activities.activity}
      />
    );
  });

  return isLoading ? (
    <div className="spinner">
      <img
        src="https://avatars0.githubusercontent.com/u/12551446"
        className="loader"
        alt="Loading"
      />
      <br />
      <div style={{ fontSize: 18, marginTop: 10, color: "white" }}>
        Loading ...{" "}
      </div>
    </div>
  ) : (
    <div className="dailies__main">{formattedDailies}</div>
  );
};
