import axios from "axios";

export const postObstacle = async (type, desc) => {
    const requestBody = { type: type, desc: desc };
    try {
        const response = await axios({
            url: process.env.REACT_APP_API_URL + `/obstacle/`,
            headers: { "Content-Type": "application/json" },
            method: "POST",
            data: requestBody,
        });
        if (response.status !== 200 && response.status !== 201) {
            throw new Error("Error!");
        }
        return { status: response.status };
    } catch (error) {
        return { status: 500, message: error.message };
    }
}