import { useState } from "react";
import { Profil } from "./component/Profil/Profil";
import { Dailies } from "./component/Dailies/Dailies";
import { FloatButton } from "./component/FloatButton/FloatButton";

import "./App.css";

window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

const App = () => {
  const [showProfil, setShowProfil] = useState(false);

  return (
    <div className="App">
      <header className="App__header">
        <FloatButton showProfil={showProfil} setShowProfil={setShowProfil} />
        <div className="App__day">{showProfil ? <Profil /> : <Dailies />}</div>
      </header>
    </div>
  );
};

export default App;
