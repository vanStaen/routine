import { useEffect } from "react";

import { getUser } from "../../pages/Profil/getUser";
import { ProfilButton } from "./ProfilButton/ProfilButton";
import { SporadicButton } from "./SporadicButton/SporadicButton";
import { ObstacleButton } from "./ObstacleButton/ObstacleButton";
import { StatsButton } from "./StatsButton/StatsButton";
import { CloseButton } from "./CloseButton/CloseButton";

import "./Menu.css";

export const Menu = (props) => {
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="Menu__floating">
      <CloseButton />
      <ProfilButton />
      <StatsButton />
      <ObstacleButton />
      <SporadicButton />
    </div>
  );
};
