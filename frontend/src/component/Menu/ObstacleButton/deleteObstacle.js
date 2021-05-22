import axios from "axios";

export const deleteObstacle = async (id) => {
    try {
        const response = await axios({
            url: process.env.REACT_APP_API_URL + `/obstacle/${id}`,
            headers: { "Content-Type": "application/json" },
            method: "DELETE",
        });
        if (response.status !== 200 && response.status !== 201) {
            throw new Error("Error!");
        }
        return { status: response.status, message: response.error };
    } catch (error) {
        return { status: 500, message: error.message };
    }
}