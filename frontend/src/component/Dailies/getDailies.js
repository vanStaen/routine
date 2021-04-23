import axios from "axios";

export const getDailies = async (limit) => {
  const response = await axios({
    url: process.env.REACT_APP_API_URL + `/dailies/${limit}`,
    method: "GET",
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    if (response.status === 401) {
      throw new Error(`Error! Unauthorized (401)`);
    } else {
      throw new Error(`Error! Status ${response.status}`);
    }
  }
  const dailies = await response.data;
  return dailies;
};
