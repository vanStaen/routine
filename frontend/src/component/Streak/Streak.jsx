import { observer } from "mobx-react";
import { streakStore } from "../../store/streakStore";
import "./Streak.css";

export const Streak = observer((props) => {
  const activity = props.activity.name;
  const dayFromToday = props.dayFromToday;

  let float;
  if (props.float === undefined) {
    float = true;
  } else {
    float = props.float;
  }

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
    try {
      if (
        streakStore.dailyStreaks.get(dayFromToday)[activity] ===
        streakStore.dailyStreaks.get(dayFromToday + 1)[activity]
      ) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  return streakStore.dailyStreaks.get(dayFromToday)[activity] &&
    streakStore.dailyStreaks.get(dayFromToday)[activity] === 0 ? (
    <> </>
  ) : (
    <div
      className={float ? "Streak__Float" : "Streak__Round"}
      style={{
        backgroundColor: StreakWasFrozen(dayFromToday)
          ? `rgba(3, 119, 156, ${backGroundColor(
              streakStore.dailyStreaks.get(dayFromToday)[activity]
            )})`
          : `rgba(214, 137, 16, ${backGroundColor(
              streakStore.dailyStreaks.get(dayFromToday)[activity]
            )})`,
      }}
    >
      {streakStore.dailyStreaks.get(dayFromToday)[activity] > 999
        ? "999+"
        : streakStore.dailyStreaks.get(dayFromToday)[activity]}
    </div>
  );
});
