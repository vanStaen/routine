import { useState } from "react";

import { authStore } from "../../store/authStore";
import logoRoutine from "../../images/routine.svg";

import "./Profil.css";

export const Profil = () => {
  const [isLoading, setIsLoading] = useState(false);

  return isLoading ? (
    <div className="spinner">
      <img src={logoRoutine} className="loader" alt="Loading" />
    </div>
  ) : (
    <div className="Profil__full">
      <div className="Profil__title">Profil</div>
      <div className="Profil__main">
        <div>Here comes the stuff</div>
        <div>Add activity</div>
        <div>Manage Goal / increment</div>
        <div>Edit activity title </div>
        <div>Make optional/mandatory</div>
        <div onClick={() => authStore.logout()}>logout</div>
      </div>
    </div>
  );
};
