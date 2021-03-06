import axios from 'axios';

export const getRepeatedItems = async () => {
    const response = await axios({
        url: process.env.REACT_APP_API_URL + "repeated",
        method: "GET",
    });
    if ((response.status !== 200) & (response.status !== 201)) {
        throw new Error("Error!");
    }
    const repeated = await response.data;
    return repeated;
}