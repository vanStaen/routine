import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Drawer, Button } from "antd";

import { authStore } from "../../store/authStore";
import { userStore } from "../../store/userStore";
import { Spinner } from "../../component/Spinner/Spinner";
import { Logo } from "../../component/Logo/Logo";
import { getUser } from "./getUser";
import { getActivityList } from "./getActivityList";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";
import { DeleteOutlined } from "@ant-design/icons";

//import { uuid } from "../../helpers/uuid";

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

  const updateActivityHandler = (e) => {
    const allUserActivities = userStore.userActivities;
    let activityToUpdate = allUserActivities.find(
      (activity) => activity.id === selected.id
    );
    if (activityToUpdate) {
      activityToUpdate[e.target.name] = e.target.value;
    }
    setUserActivities(allUserActivities);
    console.log(selected);
    console.log(userStore.userActivities[0]);
    /*
    TODO: must be persisted in db

    JsonStringify(Proxy) -> normal String format.
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    */
  };

  const deleteActivityHandler = (id) => {
    console.log("Delete this", id);
    /*
    TODO: make archiviert flag instead of delete
    */
  };

  const adminActivities = userActivities.map((activity, index) => {
    return (
      <div
        className="Profil__activities"
        onClick={() => openDrawerHandler(activity)}
        key={`admin_activities_${index}`}
      >
        <Logo image={activity.icon} />
        {activity.name}
      </div>
    );
  });

  const addActivities = newActivities.map((activity, index) => {
    return (
      <div
        className="Profil__activities"
        onClick={() => openDrawerHandler(activity)}
        key={`add_activities_${index}`}
      >
        <Logo image={activity.icon} />
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
        closable={true}
        visible={drawerVisible}
        onClose={onCloseDrawerHandler}
        placement={"bottom"}
      >
        {selected !== null && (
          <div className="Drawer">
            <div className="Drawer__main">
              <Logo image={selected.icon} invert={false} big={true} />
              <div className="Drawer__editableContainer">
                <div className="Drawer__editable">
                  <span className="Drawer__editableTitle">Name</span>
                  <input
                    className="Drawer__inputText"
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={selected.name}
                    min="1"
                    onChange={updateActivityHandler}
                  />
                </div>
                <div className="Drawer__editable">
                  <span className="Drawer__editableTitle">Description</span>
                  <input
                    className="Drawer__inputText"
                    type="text"
                    id="desc"
                    name="desc"
                    defaultValue={selected.desc}
                    min="1"
                    onChange={updateActivityHandler}
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
                    onChange={updateActivityHandler}
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
                    onChange={updateActivityHandler}
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
                    onChange={updateActivityHandler}
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
                    onChange={updateActivityHandler}
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
            <div className="Drawer__buttonContainer">
              {
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => deleteActivityHandler(selected.id)}
                  type="primary"
                  danger
                  disabled
                >
                  Delete
                </Button>
              }
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
  let foo = [{ bar: 1, baz: [1,2,3] }, { bar: 2, baz: [4,5,6] }];
  let obj = foo.find(f=>f.bar==1);
  if(obj) {obj.baz=[2,3,4];}
  console.log(foo);
*/
