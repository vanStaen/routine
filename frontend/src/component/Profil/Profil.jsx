import { useState, useEffect } from "react";

import { authStore } from "../../store/authStore";
import { Spinner } from '../Spinner/Spinner';

import "./Profil.css";

export const Profil = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [])

  return isLoading ? <Spinner /> : (
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
