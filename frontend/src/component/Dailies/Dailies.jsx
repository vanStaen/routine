import { useState, useEffect } from "react";
import { getDailies } from "./getDailies";
import { Logo } from "../Logo/Logo";

import "./Dailies.css";

export const Dailies = () => {
  const [dailies, setDailies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDailies = async () => {
    try {
      const dailies = await getDailies();
      setDailies(dailies);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDailies();
  }, []);

  //if (!dailies) return "no data";
  //if (!Array.isArray(dailies)) return "results are not array";

  const formattedDailies = dailies.map((daily) => {
    return (
      <div key={daily.activity} className="dailies__item">
        <Logo activity={daily.activity} />
        <div className="dailies__text">{daily.activity}</div>
      </div>
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
