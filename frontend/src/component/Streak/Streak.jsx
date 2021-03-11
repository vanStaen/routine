import { useState, useEffect } from "react";
import { getStreak } from "./getStreak";
import { Spin } from "antd";
import "./Streak.css";

export const Streak = (props) => {
  const [streak, setStreak] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const activity = props.activity.activity;

  const fetchDailies = async () => {
    try {
      const fetchedDailies = await getStreak();
      setStreak(fetchedDailies);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDailies();
  }, []);

  return isLoading ? (
    <></>
  ) : streak[activity] ? (
    <div className="Streak__Main">{streak[activity]}</div>
  ) : (
    <></>
  );
};
