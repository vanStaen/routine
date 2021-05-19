import axios from "axios";
import { userStore } from "../../store/userStore";

export const patchUser = async (activities) => {
  
  const requestBody = {
    [activities]: activities,
  };
  const response = await axios({
    url: process.env.REACT_APP_API_URL + `/user`,
    method: "PATCH",
    data: requestBody,
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    if (response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    } else {
      throw new Error(`Error! Status ${response.status}`);
    }
  }

  return response.data;
};