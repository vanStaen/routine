import { useState, useEffect } from "react";
import { observer } from "mobx-react";

import { authStore } from "../../store/authStore";
import { userStore } from "../../store/userStore";
import { Spinner } from "../Spinner/Spinner";
import { getUser } from "./getUser";

import "./Profil.css";

export const Profil = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  const fetchUserData = async () => {
    try {
      const userData = await getUser();
      setActivities(userData.activities);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const adminActivities = activities.map((item) => {
    return <>{item.activity} </>;
  });

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="Profil__full">
      <div className="Profil__title">Profil</div>

      <div
        className="Profil__avatar"
        style={{
          backgroundImage: `url(${userStore.picUrl})`,
          backgroundSize: "cover",
        }}
      ></div>

      <div className="Profil__main">
        <br />
        <div>hello {userStore.userName},</div>
        <div className="Profil__ActivitiesContainer">{adminActivities}</div>
        <div>Add activity</div>
        <div>Manage Goal / increment</div>
        <div>Edit activity title </div>
        <div>Make optional/mandatory</div>
        <br />
        <div className="Profil__logout" onClick={() => authStore.logout()}>
          (logout)
        </div>
      </div>
    </div>
  );
});
