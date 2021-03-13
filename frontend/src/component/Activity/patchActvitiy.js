import axios from "axios";

export const patchActvitiy = async (activity, value) => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const requestBody = {
    [activity]: value,
  };

  try {
    const response = await axios({
      url: process.env.REACT_APP_API_URL + `daily/${year}/${month}/${day}`,
      method: "PATCH",
      data: requestBody,
      timeout: 1000, // wait for max 1 second
    });
    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Error!");
    }
    return { status: response.status, message: response.error };
  } catch (error) {
    console.log(error.message);
    return { status: 500, message: error.message };
  }
};
