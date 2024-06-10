import './App.css';
import { GameStatus } from './components/GameStatus';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Byte Wars: AI vs Humans</h1>
        <GameStatus />
      </header>
    </div>
  );
}


export default App;
