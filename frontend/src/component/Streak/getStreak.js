import axios from "axios";
import { streakStore } from "../../store/streakStore";

export const getStreak = async (year, month, day, dayFromToday) => {

  const response = await axios({
    url: process.env.REACT_APP_API_URL + `/streak/${year}/${month}/${day}`,
    method: "GET",
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Error!");
  }

  const streak = await response.data[0];
  streakStore.setDailyStreaks(streak, dayFromToday);

  return streak;

};
