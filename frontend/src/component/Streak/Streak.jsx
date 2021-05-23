import { useState, useEffect, useCallback } from "react";
import { observer } from "mobx-react";

import { getStreak } from "./getStreak";
import { streakStore } from "../../store/streakStore";
import getYesterdayDate from "../../helpers/getYesterdayDate";
import "./Streak.css";

export const Streak = observer((props) => {
  const [isLoading, setIsLoading] = useState(true);
  const activity = props.activity.name;
  const dayFromToday = props.dayFromToday;
  const year = props.daily.year;
  const month = props.daily.month;
  const day = props.daily.day;

  let float;
  if (props.float === undefined) {
    float = true;
  } else {
    float = props.float;
  }

  const fetchStreak = useCallback(async () => {
    // check if today is in store already
    const indexStoredStreakToday = streakStore.dailyStreaks.findIndex((daily) => daily.dayFromToday === dayFromToday);
    if (indexStoredStreakToday < 0) {
      // if not, fetch and store
      try {
        const fetchedStreak = await getStreak(year, month, day);
        streakStore.setDailyStreaks(fetchedStreak, dayFromToday);
      } catch (error) {
        console.log(error.message);
      }
    }
    // check if yesterday is in store already
    const indexStoredStreakYesterday = streakStore.dailyStreaks.findIndex((daily) => daily.dayFromToday === (dayFromToday + 1));
    if (indexStoredStreakYesterday < 0) {
      // if not, fetch and store
      try {
        const dateYesterday = getYesterdayDate(year, month, day);
        const fetchedStreak = await getStreak(dateYesterday[0], dateYesterday[1], dateYesterday[2]);
        streakStore.setDailyStreaks(fetchedStreak, dayFromToday + 1);
      } catch (error) {
        console.log(error.message);
      }
    }
    setIsLoading(false);
  }, [year, month, day, dayFromToday]);

  useEffect(() => {
    fetchStreak();
  }, [fetchStreak]);

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

  const StreakWasFrozen = () => {
    if (streakStore.dailyStreaks[dayFromToday][activity] === streakStore.dailyStreaks[dayFromToday + 1][activity]) {
      return true;
    } else {
      return false;
    }
  }

  return isLoading ? (
    <div className="Streak__Float">?</div>
  ) : streakStore.dailyStreaks[dayFromToday][activity] ? (
    <div
      className={float ? "Streak__Float" : "Streak__Round"}
      style={{
        backgroundColor: StreakWasFrozen(dayFromToday) ? `rgba(3, 119, 156, ${backGroundColor(streakStore.dailyStreaks[dayFromToday][activity])})` : `rgba(214, 137, 16, ${backGroundColor(streakStore.dailyStreaks[dayFromToday][activity])})`,
      }}
    >
      {streakStore.dailyStreaks[dayFromToday][activity] > 999 ? "999+" : streakStore.dailyStreaks[dayFromToday][activity]}
    </div>
  ) : (
        <></>
      );
});
