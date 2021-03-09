import { useState, useEffect } from "react";
import { getDailies } from "./getDailies";
import { getActivities } from "./getActivities";
import { Logo } from "../Logo/Logo";
import { CheckOutlined } from '@ant-design/icons';
import { Tooltip } from "antd";

import "./Dailies.css";

export const Dailies = () => {
  const [dailies, setDailies] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDailies = async () => {
    try {
      const fetchedDailies = await getDailies();
      setDailies(fetchedDailies);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchActivities = async () => {
    try {
      const fetchedActivities = await getActivities();
      setActivities(fetchedActivities);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDailies();
    fetchActivities();
    setIsLoading(false);
  }, []);

  console.log(dailies);

  const formattedDailies = activities.map((activities) => {
    const count = dailies[activities.activity]
      ? dailies[activities.activity]
      : 0;
    const increment = activities.increment;
    const goal = activities.goal;
    const done = goal ? count >= goal : false;
    return (
      <Tooltip placement="top" title={activities.name}>
        <div key={activities.activity} className="dailies__item">
          {done && (<div className='dailies__doneContainer'>
            <div className='dailies__done'>
              < CheckOutlined />
            </div>
          </div>)}
          <Logo activity={activities} />
          <div className={`dailies__text ${count >= goal && "dailies__textdisabled"}`}>
            {goal > 1 ?
              (`${count} / ${goal} `)
              :
              (`${activities.unit}!`)}

            {goal > 1 && activities.unit}
          </div>
        </div>
      </Tooltip>
    );
  });

  return isLoading ? (
    <div className="spinner">
      <div>
        <img
          src="https://avatars0.githubusercontent.com/u/12551446"
          className="loader"
          alt="Loading"
        />
        <br />
        <div style={{ fontSize: 18, marginTop: 10, color: "white" }}>
          Loading ...{" "}
        </div>
      </div>
    </div>
  ) : (
      <div className="dailies__main">{formattedDailies}</div>
    );
};
