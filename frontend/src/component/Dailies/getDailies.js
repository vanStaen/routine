import axios from 'axios';

export const getDailies = async () => {
    const response = await axios({
        url: process.env.REACT_APP_API_URL + "activity",
        method: "GET",
    });
    if ((response.status !== 200) & (response.status !== 201)) {
        throw new Error("Error!");
    }
    const repeated = await response.data;
    return repeated;
}