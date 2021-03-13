import './App.css';
import { Dailies } from './component/Dailies/Dailies';

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
