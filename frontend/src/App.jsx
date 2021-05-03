import { useEffect, useState } from "react";
import { observer } from "mobx-react";

import { Profil } from "./component/Profil/Profil";
import { Dailies } from "./component/Dailies/Dailies";
import { Menu } from "./component/Menu/Menu";
import { authStore } from "./store/authStore";
import { LoginForm } from "./component/LoginForm/LoginForm";
import { Spinner } from "./component/Spinner/Spinner";

import "./helpers/axiosInterceptor";
import "./App.css";

const defineVariableHeight = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

window.addEventListener("resize", defineVariableHeight);

const App = observer(() => {
  const [showProfil, setShowProfil] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loginOnMount = () => {
    try {
      authStore.getNewToken();
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // On mount, update token
    if (authStore.refreshToken) {
      loginOnMount();
    } else {
      setIsLoading(false);
    }

    // Define variable height
    defineVariableHeight();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        {isLoading ? (
          <div className="App__main">
            <Spinner />
          </div>
        ) : authStore.refreshToken ? (
          <>
            <Menu showProfil={showProfil} setShowProfil={setShowProfil} />
            <div className="App__main">
              {showProfil ? <Profil /> : <Dailies />}
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
