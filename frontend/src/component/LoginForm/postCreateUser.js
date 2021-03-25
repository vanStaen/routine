import axios from "axios";
import { openNotification } from "../../helpers/openNotification";

//TODO!

export const postCreateUser = async (email, password) => {

    let requestBody = { email: email, password: password };

    const response = await axios(process.env.REACT_APP_AUTH_URL, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if ((response.status !== 200) & (response.status !== 201)) {
      const error = response.json();
      openNotification(error.errors[0].message, "", 3, "warning");
      const message = `An error has occured: ${response.status} - ${error.errors[0].message}`;
      console.log("Error!", message);
    }

    const login = response.json();
    return login;
  }