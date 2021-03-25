import axios from "axios";

export const postFetchToken = async (email, password) => {

  let requestBody = { email: email, password: password };

    const response = await fetch(process.env.REACT_APP_AUTH_URL + "/login", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if ((response.status !== 200) & (response.status !== 201)) {
      const error = await response.json();
      const message = `An error has occured: ${response.status} - ${error.error}`;
      throw new Error(message);
    }
    const userData = await response.json();
    console.log(userData);
    return userData;

  }