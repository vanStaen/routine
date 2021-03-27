import { useState, useEffect } from "react";
import { observer } from "mobx-react";

import { authStore } from "../../store/authStore";
import { userStore } from "../../store/userStore";
import { Spinner } from "../Spinner/Spinner";

import "./Profil.css";

export const Profil = observer(() => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="Profil__full">
      <div className="Profil__title">Profil</div>
      <div className="Profil__main">
        <div>hello Clément,</div>
        <br />
        <div>Add activity</div>
        <div>Manage Goal / increment</div>
        <div>Edit activity title </div>
        <div>Make optional/mandatory</div>
        <div onClick={() => authStore.logout()}>logout</div>
      </div>
    </div>
  );
});
