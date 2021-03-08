import { useState, useEffect } from "react";
import { getDailies } from "./getDailies";
import { getActivities } from "./getActivities";
import { Logo } from "../Logo/Logo";

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

  console.log(dailies);

  const formattedDailies = activities.map((activities) => {
    const count = dailies[activities.activity]
      ? dailies[activities.activity]
      : 0;
    const increment = activities.increment;
    const goal = activities.goal;
    return (
      <div key={activities.activity} className="dailies__item">
        <Logo activity={activities} />
        <div className="dailies__text">
          {count} / {goal}
          {goal > 1 && activities.unit}
        </div>
      </div>
    );
  });

  return isLoading ? (
    <div className="spinner">
      <div>
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
    </div>
  ) : (
      <div className="dailies__main">{formattedDailies}</div>
    );
};
