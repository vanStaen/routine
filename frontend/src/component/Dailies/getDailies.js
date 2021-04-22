import axios from "axios";

export const getDailies = async (limit) => {
  //debugger;
  const response = await axios({
    url: process.env.REACT_APP_API_URL + `/dailies/${limit}`,
    method: "GET",
  });


  // Today
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  console.log(year, month, day);

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
