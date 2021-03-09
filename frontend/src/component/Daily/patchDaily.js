import axios from 'axios';

export const patchDaily = async (activity, value) => {

    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const requestBody = {
        [activity]: value
    };

    console.log(requestBody);

    const response = await axios({
        url: process.env.REACT_APP_API_URL + `dailies/${year}/${month}/${day}`,
        method: "PATCH",
        data: requestBody,
    });
    if ((response.status !== 200) & (response.status !== 201)) {
        throw new Error("Error!");
    }

    return response.status;
}