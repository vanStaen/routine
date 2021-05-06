import axios from "axios";

export const getStats = async (limit) => {
  //debugger;
  const response = await axios({
    url: process.env.REACT_APP_API_URL + `/stats/`,
    method: "GET",
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    if (response.status === 401) {
      throw new Error(`Error! Unauthorized`);
    } else {
      throw new Error(`Error! Status ${response.status}`);
    }
  }
  const dailies = await response.data;
  return dailies;
};
