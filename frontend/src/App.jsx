import { useEffect } from "react";
import { observer } from "mobx-react";

import { Dailies } from "./pages/Dailies/Dailies";
import { Profil } from "./pages/Profil/Profil";
import { Stats } from "./pages/Stats/Stats";
import { LoginForm } from "./pages/LoginForm/LoginForm";
import { authStore } from "./store/authStore";
import { displayStore } from "./store/displayStore";
import { Menu } from "./component/Menu/Menu";
import { getUser } from "./pages/Profil/getUser";

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

    // fetch user infos
    getUser();

    // Define variable height
    defineVariableHeight();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        {authStore.refreshToken ? (
          <>
            <Menu />
            <div className="App__main">
              {displayStore.showPage === "daily" && <Dailies />}
              {displayStore.showPage === "profil" && <Profil />}
              {displayStore.showPage === "stats" && <Stats />}
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
