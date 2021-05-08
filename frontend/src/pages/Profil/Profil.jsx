import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Drawer } from "antd";

import { authStore } from "../../store/authStore";
import { userStore } from "../../store/userStore";
import { Spinner } from "../../component/Spinner/Spinner";
import { Logo } from "../../component/Logo/Logo";
import { getUser } from "./getUser";
import { getActivityList } from "./getActivityList";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";

import "./Profil.css";

export const Profil = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [userActivities, setUserActivities] = useState([]);
  const [newActivities, setNewActivities] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchUserData = async () => {
    try {
      const [userData, allActivities] = await Promise.all([
        getUser(),
        getActivityList(),
      ]);
      const userActivitiesKey = await userData.activities.map((activity) => {
        return activity.activity;
      });
      const otherActivities = allActivities.filter((activity) => {
        return !userActivitiesKey.includes(activity.activity);
      });
      setUserActivities(userData.activities);
      setNewActivities(otherActivities);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onCloseDrawerHandler = () => {
    setDrawerVisible(false);
    setSelected(null);
  };

  const openDrawerHandler = (selected) => {
    setDrawerVisible(true);
    console.log(selected);
    setSelected(selected);
  };

  const adminActivities = userActivities.map((item) => {
    return (
      <div
        className="Profil__activities"
        onClick={() => openDrawerHandler(item)}
      >
        <Logo image={item.activity} />
        {item.activity}
      </div>
    );
  });

  const addActivities = newActivities.map((item) => {
    return (
      <div
        className="Profil__activities"
        onClick={() => openDrawerHandler(item)}
      >
        <Logo image={item.activity} />
      </div>
    );
  });

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <Drawer
        title={capitalizeFirstLetter(selected?.activity)}
        placement="right"
        closable={true}
        visible={drawerVisible}
        onClose={onCloseDrawerHandler}
        placement={"left"}
      >
        {selected !== null && (
          <>
            <Logo image={selected.activity} invert={true} big={true} />
            <div>Daily: {selected.daily ? "Yes" : "No"}</div>
            <div>Desc: {selected.desc}</div>
            <div>Goal: {selected.goal}</div>
            <div>Increment: {selected.increment}</div>
            <div>Opt: {selected.optional ? "Yes" : "No"}</div>
            <div>Sorting: {selected.sorting}</div>
            <div>Unit: {selected.unit}</div>
          </>
        )}
      </Drawer>
      <div className="Profil__full">
        <div
          className="Profil__avatar"
          style={{
            backgroundImage: `url(${userStore.picUrl})`,
            backgroundSize: "cover",
          }}
        ></div>

        <div className="Profil__main">
          <div>hello {userStore.userName},</div>
          <div className="Profil__logout" onClick={() => authStore.logout()}>
            (logout)
          </div>

          <div className="Profil__container">
            <div className="Profil__containerTitle">Manage activity</div>
            <div>{adminActivities}</div>
          </div>

          <div className="Profil__container">
            <div className="Profil__containerTitle">Add activity</div>
            <div>{addActivities}</div>
          </div>
        </div>
      </div>
    </>
  );
});

/*
TODO: 
  Manage Goal / increment
  Edit activity title
  Make optional/mandatory
*/
