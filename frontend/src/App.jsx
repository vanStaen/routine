import { useEffect, useState } from "react";
import { Profil } from "./component/Profil/Profil";
import { Dailies } from "./component/Dailies/Dailies";
import { FloatButton } from "./component/FloatButton/FloatButton";
import { LoginForm } from "./component/LoginForm/LoginForm";

import "./App.css";

const defineVariableHeight = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

window.addEventListener("resize", defineVariableHeight);

const App = () => {
  const [showProfil, setShowProfil] = useState(false);

  useEffect(() => {
    defineVariableHeight();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        {/*<LoginForm />*/}
        <FloatButton showProfil={showProfil} setShowProfil={setShowProfil} />
        <div className="App__day">{showProfil ? <Profil /> : <Dailies />}</div>
      </header>
    </div>
  );
};

export default App;
