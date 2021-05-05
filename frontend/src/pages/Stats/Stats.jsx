import { useState, useEffect } from "react";
import { observer } from "mobx-react";

import { Spinner } from "../../component/Spinner/Spinner";
import { getAllDailies } from "./getAllDallies";
import { Bar } from "react-chartjs-2";

import "./Stats.css";

export const Stats = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [labels, setLabels] = useState([]);
  const [dataSets, setDataSets] = useState([
    {
      label: "pullups",
      backgroundColor: "rgba(214, 137, 16, 1)",
      borderColor: "rgba(255, 255, 255, 1)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
    {
      label: "pushups",
      backgroundColor: "rgba(114, 137, 16, 1)",
      borderColor: "rgba(255, 255, 255, 1)",
      data: [50, 15, 5, 25, 0, 50, 50],
    },
  ]);

  const fetchData = async () => {
    try {
      const fetchedDailies = await getAllDailies();
      console.log(fetchedDailies);
      const newLabels = fetchedDailies.map((daily) => {
        return `${daily.day}.${daily.month}.${daily.year}`;
      });
      setLabels(newLabels);
      const newDataSets = fetchedDailies.map((daily) => {
        const dataSet = {
          label: "pullups",
          backgroundColor: "rgba(214, 137, 16, 1)",
          borderColor: "rgba(255, 255, 255, 1)",
          data: [0, 10, 5, 2, 20, 30, 45],
        };
        return dataSet;
      });
      setDataSets(newDataSets);
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
    datasets: dataSets,
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
