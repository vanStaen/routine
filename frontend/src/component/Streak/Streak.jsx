import { useState, useEffect } from "react";
import { getStreak } from "./getStreak";
import "./Streak.css";

export const Streak = (props) => {
  const [streak, setStreak] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const activity = props.activity.activity;

  const fetchStreak = async () => {
    try {
      const fetchedDailies = await getStreak();
      setStreak(fetchedDailies);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchStreak();
  }, []);

  return isLoading ? (
    <div className="Streak__Main">?</div>
  ) : streak[activity] ? (
    <div className="Streak__Main">{streak[activity]}</div>
  ) : (
    <></>
  );
};
