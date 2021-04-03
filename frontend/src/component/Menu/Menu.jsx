import { useEffect } from "react";

import { getUser } from "../Profil/getUser";
import { ProfilButton } from "./ProfilButton/ProfilButton";
import { SporadicButton } from "./SporadicButton/SporadicButton";
import { ObstacleButton } from "./ObstacleButton/ObstacleButton";

import "./Menu.css";

export const Menu = (props) => {
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="Menu__floating">
      <ProfilButton
        showProfil={props.showProfil}
        setShowProfil={props.setShowProfil} />
      <SporadicButton />
      <ObstacleButton />
    </div>
  );
};
