import './App.css';
import { Dailies } from './component/Dailies/Dailies';

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <div className="App__day">
          <Dailies />
        </div>
      </header>
    </div>
  );
}

export default App;
