import axios from "axios";

export const patchStreak = async (activity) => {
  try {
    const response = await axios({
      url: process.env.REACT_APP_API_URL + `/streak/${activity}`,
      method: "PATCH",
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
