import { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react";

import { userStore } from "../../store/userStore";
import { Spinner } from "../../component/Spinner/Spinner";
import { getStats } from "./getStats";
import { Bar } from "react-chartjs-2";

import "./Stats.css";

export const Stats = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [labels, setLabels] = useState([]);
  const dataArray = useRef([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let activityKeys = [];

  const fetchData = async () => {
    try {
      const fetchedDailies = await getStats();
      const newLabels = fetchedDailies.map((daily) => {
        return `${daily.day}.${daily.month}.${daily.year}`;
      });
      setLabels(newLabels);

      userStore.userActivities.map((activity) => {
        const activityObject = { name: activity.activity, data: [] };
        activityKeys.push(activity.activity);
        //dataArray.current.push(activityObject);
      });

      /* fetchedDailies.map((daily) => {
        activityKeys.forEach((key) => {
          console.log(`${key}: ${daily[key]}`);
        });
      });*/

      console.log(dataArray.current);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Run",
        backgroundColor: "rgba(214, 137, 16, 1)",
        borderColor: "rgba(255, 255, 255, 1)",
        data: dataArray.current,
      },
    ],
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="Stats__full">
      <div className="Stats__title">Statistics</div>

      <div className="Stats__main">
        <Bar data={data} />
      </div>
    </div>
  );
});
