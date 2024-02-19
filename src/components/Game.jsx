import { useContext } from 'react';
import { HangmanContext } from '../context/HangmanContext';
import HangmanDisplay from '../components/HangmanDisplay';
import GuessInput from '../components/GuessInput';

const Game = () => {
  const { state, handleLetterClick } = useContext(HangmanContext);
  const { loading, error } = state;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Hangman Game</h1>
      <HangmanDisplay />
      <div>
        {Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)).map((letter) => (
          <button key={letter} onClick={() => handleLetterClick(letter)} disabled={state.guessedLetters.includes(letter)}>
            {letter.toUpperCase()}
          </button>
        ))}
      </div>
      <GuessInput />
    </div>
  );
};

export default Game;
