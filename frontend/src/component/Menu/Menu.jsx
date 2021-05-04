import { useEffect } from "react";

import { getUser } from "../Profil/getUser";
import { ProfilButton } from "./ProfilButton/ProfilButton";
import { SporadicButton } from "./SporadicButton/SporadicButton";
import { ObstacleButton } from "./ObstacleButton/ObstacleButton";
import { StatsButton } from "./StatsButton/StatsButton";

import "./Menu.css";

export const Menu = (props) => {
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="Menu__floating">
      <ProfilButton
        showProfil={props.showProfil}
        setShowProfil={props.setShowProfil}
      />
      <StatsButton />
      <SporadicButton />
      <ObstacleButton />
    </div>
  );
};
