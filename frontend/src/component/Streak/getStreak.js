import axios from "axios";

export const getStreak = async (year, month, day) => {

    const response = await axios({
    url: process.env.REACT_APP_API_URL + `/streak/${year}/${month}/${day}`,
    method: "GET",
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Error!");
  }

  const streak = await response.data[0];
  return streak;

};
