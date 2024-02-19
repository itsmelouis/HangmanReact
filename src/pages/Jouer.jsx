import { HangmanProvider } from '../context/HangmanContext';
import Game from '../components/Game';

function Jouer() {
  return (
    <div className="App">
      <HangmanProvider>
        <Game />
      </HangmanProvider>
    </div>
  );
}

export default Jouer;
