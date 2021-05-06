import { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react";

import { Spinner } from "../../component/Spinner/Spinner";
import { getAllDailies } from "./getAllDallies";
import { Bar } from "react-chartjs-2";

import "./Stats.css";

export const Stats = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [labels, setLabels] = useState([]);
  const dataRun = useRef([]);
  const dataDutch = useRef([]);

  const fetchData = async () => {
    try {
      const fetchedDailies = await getAllDailies();
      console.log(fetchedDailies);
      const newLabels = fetchedDailies.map((daily) => {
        return `${daily.day}.${daily.month}.${daily.year}`;
      });
      setLabels(newLabels);
      fetchedDailies.map((daily) => {
        dataRun.current.push(daily.run);
        dataDutch.current.push(daily.dutch);
      });
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
        data: dataRun.current,
      },
      {
        label: "Dutch",
        backgroundColor: "rgba(114, 137, 16, 1)",
        borderColor: "rgba(255, 255, 255, 1)",
        data: dataDutch.current,
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
