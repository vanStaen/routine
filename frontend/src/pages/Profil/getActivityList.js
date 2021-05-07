import axios from "axios";
import { userStore } from "../../store/userStore";

export const getActivityList = async () => {

  const response = await axios({
    url: process.env.REACT_APP_API_URL + `/activity/list`,
    method: "GET",
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    if (response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    } else {
      throw new Error(`Error! Status ${response.status}`);
    }
  }

  const activityList = await response.data.map(
    activity => {
      return activity;
    }
  );

  return activityList;

};