import { useState, useEffect } from "react";
import { getDailies } from "./getDailies";

import logoTeeth from "../../images/teeth.svg";

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

  const formattedDailies = dailies.map((dailie) => {
    return (
      <div key={dailie.activity} className="dailies__item">
        <img className="dailies__logo" src={logoTeeth} alt="teeth" />
        <div className="dailies__textMain">{dailie.activity}</div>
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
