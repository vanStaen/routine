import { useState, useEffect } from "react";
import { observer, PropTypes } from "mobx-react";
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
        return activity.name;
      });
      const otherActivities = allActivities.filter((activity) => {
        return !userActivitiesKey.includes(activity.name);
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
    setSelected(selected);
  };

  const adminActivities = userActivities.map((activity) => {
    return (
      <div
        className="Profil__activities"
        onClick={() => openDrawerHandler(activity)}
      >
        <Logo image={activity.name} />
        {activity.name}
      </div>
    );
  });

  const addActivities = newActivities.map((activity) => {
    return (
      <div
        className="Profil__activities"
        onClick={() => openDrawerHandler(activity)}
      >
        <Logo image={activity.name} />
      </div>
    );
  });

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <Drawer
        title={
          <>
            <span className="Drawer__title">
              {capitalizeFirstLetter(selected?.name)}
            </span>
            {selected?.desc}
          </>
        }
        placement="right"
        closable={true}
        visible={drawerVisible}
        onClose={onCloseDrawerHandler}
        placement={"bottom"}
      >
        {selected !== null && (
          <div className="Drawer__main">
            <Logo image={selected.name} invert={false} big={true} />
            <div className="Drawer__editableContainer">
              <div className="Drawer__editable">
                <span className="Drawer__editableTitle">Description</span>
                <input
                  className="Drawer__inputText"
                  type="text"
                  id="desc"
                  name="desc"
                  defaultValue={selected.desc}
                  min="1"
                />
              </div>
              <div className="Drawer__editable">
                <span className="Drawer__editableTitle">Goal</span>
                <input
                  className="Drawer__inputNumber"
                  type="number"
                  id="goal"
                  name="goal"
                  defaultValue={selected.goal}
                  min="1"
                />
              </div>
              <div className="Drawer__editable">
                <span className="Drawer__editableTitle">Increment</span>
                <input
                  className="Drawer__inputNumber"
                  type="number"
                  id="increment"
                  name="increment"
                  defaultValue={selected.increment}
                  min="1"
                />
              </div>
              <div className="Drawer__editable">
                <span className="Drawer__editableTitle">Sorting</span>
                <input
                  className="Drawer__inputNumber"
                  type="number"
                  id="sorting"
                  name="sorting"
                  defaultValue={selected.sorting}
                  min="1"
                />
              </div>
              <div className="Drawer__editable">
                <span className="Drawer__editableTitle">Unit</span>
                <input
                  className="Drawer__inputText"
                  type="text"
                  id="unit"
                  name="unit"
                  defaultValue={selected.unit}
                  min="1"
                />
              </div>
              <div className="Drawer__editable">
                <span className="Drawer__editableTitle">Optional</span>
                {selected.optional ? "Yes" : "No"}
              </div>
              <div className="Drawer__editable">
                <span className="Drawer__editableTitle">Daily</span>
                {selected.daily ? "Yes" : "No"}
              </div>
            </div>
          </div>
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
