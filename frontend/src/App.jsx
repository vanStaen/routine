import { useEffect, useState } from "react";
import axios from "axios";

import { Profil } from "./component/Profil/Profil";
import { Dailies } from "./component/Dailies/Dailies";
import { FloatButton } from "./component/FloatButton/FloatButton";
import { authStore } from "./stores/authStore";
import { LoginForm } from "./component/LoginForm/LoginForm";

import "./App.css";

const defineVariableHeight = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

window.addEventListener("resize", defineVariableHeight);

const App = () => {
  const [showProfil, setShowProfil] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    // Define variable height
    defineVariableHeight();

    // On mount, update token
    authStore.refreshToken &&
      authStore.login(authStore.getNewToken(), authStore.refreshToken);

    // Axios Interceptors
    axios.interceptors.request.use(
      async (config) => {
        const token = authStore.token
          ? authStore.token
          : await authStore.getNewToken();
        config.headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        config.validateStatus = (status) => {
          return true;
        };
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        {!authStore.refreshToken ? (
          <LoginForm />
        ) : (
          <>
            <FloatButton
              showProfil={showProfil}
              setShowProfil={setShowProfil}
            />
            <div className="App__day">
              {showProfil ? <Profil /> : <Dailies />}
            </div>
          </>
        )}
      </header>
    </div>
  );
};

export default App;
