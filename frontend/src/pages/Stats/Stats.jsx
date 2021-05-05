import { useState } from "react";
import { observer } from "mobx-react";

import { Spinner } from "../../component/Spinner/Spinner";
import { Bar } from "react-chartjs-2";

import "./Stats.css";

export const Stats = observer(() => {
  const [isLoading, setIsLoading] = useState(false);

  const labels = ["January", "February", "March", "April", "May", "June"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
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
