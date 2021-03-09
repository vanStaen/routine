import './App.css';
import { Dailies } from './component/Dailies/Dailies';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <div className="App__day">
          <div className="App__container">
            <Dailies />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
