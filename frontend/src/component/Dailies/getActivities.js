import axios from 'axios';

export const getActivities = async () => {

    const response = await axios({
        url: process.env.REACT_APP_API_URL + `/activity`,
        method: "GET",
    });
    if ((response.status !== 200) & (response.status !== 201)) {
        throw new Error("Error!");
    }
    const activities = await response.data;
    return activities;
}