import axios from "axios";

export const getObstacle = async () => {
    try {
        const response = await axios({
            url: process.env.REACT_APP_API_URL + `/obstacle/`,
            headers: { "Content-Type": "application/json" },
            method: "GET",
        });
        if (response.status !== 200 && response.status !== 201) {
            throw new Error("Error!");
        }
        return { status: response.status, data: response.data };
    } catch (error) {
        return { status: 500, message: error.message };
    }
}