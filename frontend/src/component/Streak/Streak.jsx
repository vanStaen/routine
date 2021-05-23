import { useState, useEffect, useCallback } from "react";
import { observer } from "mobx-react";

import { getStreak } from "./getStreak";
import { streakStore } from "../../store/streakStore";
import "./Streak.css";

export const Streak = observer((props) => {
  const [streak, setStreak] = useState(streakStore.dailyStreaks);
  const [isLoading, setIsLoading] = useState(true);
  const activity = props.activity.name;

  let float;
  if (props.float === undefined) {
    float = true;
  } else {
    float = props.float;
  }

  const fetchStreak = useCallback(async (dayFromToday) => {
    // check if is in store already
    const indexStoredStreak = streakStore.dailyStreaks.findIndex((daily) => daily.dayFromToday === dayFromToday);
    if (indexStoredStreak < 0) {
      // if not, fetch and store
      try {
        const fetchedStreak = await getStreak(
          props.daily.year,
          props.daily.month,
          props.daily.day,
          dayFromToday,
        );
        setStreak(fetchedStreak);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setStreak(streakStore.dailyStreaks[indexStoredStreak]);
    }
    setIsLoading(false);
  }, [props.daily.year, props.daily.month, props.daily.day]);

  useEffect(() => {
    fetchStreak(props.dayFromToday);
    fetchStreak(props.dayFromToday + 1);
  }, [fetchStreak, props.dayFromToday]);

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
      return 0.6;
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

  const StreakWasFrozen = (dayFromToday) => {
    try {
      if (streakStore.dailyStreaks[dayFromToday][activity] === streakStore.dailyStreaks[dayFromToday + 1][activity]) {
        console.log(streakStore.dailyStreaks[dayFromToday][activity]);
        console.log(streakStore.dailyStreaks[dayFromToday + 1][activity]);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  return isLoading ? (
    <div className="Streak__Float">?</div>
  ) : streak[activity] ? (
    <div
      className={float ? "Streak__Float" : "Streak__Round"}
      style={{
        backgroundColor: StreakWasFrozen(props.dayFromToday) ? `rgba(3, 119, 156, ${backGroundColor(streak[activity])})` : `rgba(214, 137, 16, ${backGroundColor(streak[activity])})`,
      }}
    >
      {streak[activity] > 999 ? "999+" : streak[activity]}
    </div>
  ) : (
        <></>
      );
});
