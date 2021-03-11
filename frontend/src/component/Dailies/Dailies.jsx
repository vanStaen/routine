import { useState, useEffect } from "react";
import { getDailies } from "./getDailies";
import { getActivities } from "./getActivities";
import { Daily } from "../Daily/Daily";

import "./Dailies.css";

export const Dailies = () => {
  const [dailies, setDailies] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDailies = async () => {
    try {
      const fetchedDailies = await getDailies();
      setDailies(fetchedDailies);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchActivities = async () => {
    try {
      const fetchedActivities = await getActivities();
      setActivities(fetchedActivities);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDailies();
    fetchActivities();
    setIsLoading(false);
  }, []);

  const formattedDailies = activities.map((activities) => {
    return <Daily activity={activities} dailies={dailies} />;
  });

  return isLoading ? (
    <div className="spinner" key="spinner">
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
