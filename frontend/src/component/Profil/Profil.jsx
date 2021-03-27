import { useState, useEffect } from "react";
import { observer } from "mobx-react";

import { authStore } from "../../store/authStore";
import { userStore } from "../../store/userStore";
import { Spinner } from "../Spinner/Spinner";
import { getUser } from "./getUser";

import "./Profil.css";

export const Profil = observer(() => {
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const userData = await getUser();
      userStore.setUserName(userData.name);
      userStore.setPicUrl(userData.picurl);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="Profil__full">
      <div className="Profil__title">Profil</div>
      <div className="Profil__main">
        <div>hello {userStore.userName},</div>
        <br />
        <div>Add activity</div>
        <div>Manage Goal / increment</div>
        <div>Edit activity title </div>
        <div>Make optional/mandatory</div>
        <div onClick={() => authStore.logout()}>logout</div>
      </div>
    </div>
  );
});
