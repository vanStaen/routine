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

  const backGroundColor = (value) => {
    if (value < 2) {
      return 0.1;
    } else if (value < 3) {
      return 0.2;
    } else if (value < 5) {
      return 0.3;
    } else if (value < 8) {
      return 0.4;
    } else if (value < 12) {
      return 0.5;
    } else if (value < 20) {
      return 0.55;
    } else if (value < 30) {
      return 0.60;
    } else if (value < 40) {
      return 0.65;
    } else if (value < 50) {
      return 0.7;
    } else if (value < 60) {
      return 0.75;
    } else if (value < 70) {
      return 0.8;
    } else if (value < 80) {
      return 0.85;
    } else if (value < 99) {
      return 0.9;
    } else {
      return 1;
    }
  };

  return isLoading ? (
    <div className="Streak__Main">?</div>
  ) : streak[activity] ? (
    <div
      className="Streak__Main"
      style={{
        backgroundColor: `rgba(214, 137, 16, ${backGroundColor(
          streak[activity]
        )})`,
      }}
    >
      {streak[activity] > 99 ? "99+" : streak[activity]}
    </div>
  ) : (
        <></>
      );
};
