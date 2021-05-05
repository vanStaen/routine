import { useEffect, useState } from "react";
import { observer } from "mobx-react";

import { Profil } from "./pages/Profil/Profil";
import { Dailies } from "./pages/Dailies/Dailies";
import { LoginForm } from "./pages/LoginForm/LoginForm";
import { authStore } from "./store/authStore";
import { displayStore } from "./store/displayStore";
import { Menu } from "./component/Menu/Menu";

import "./helpers/axiosInterceptor";
import "./App.css";

const defineVariableHeight = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

window.addEventListener("resize", defineVariableHeight);

const App = observer(() => {
  const loginOnMount = () => {
    try {
      authStore.getNewToken();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // On mount, update token
    if (authStore.refreshToken) {
      loginOnMount();
    }

    // Define variable height
    defineVariableHeight();
  }, []);

  debugger;
  return (
    <div className="App">
      <header className="App__header">
        {authStore.refreshToken ? (
          <>
            <Menu />
            <div className="App__main">
              {displayStore.showPage === "daily" && <Dailies />}
              {displayStore.showPage === "profil" && <Profil />}
            </div>
          </>
        ) : (
          <LoginForm />
        )}
      </header>
    </div>
  );
});

export default App;
