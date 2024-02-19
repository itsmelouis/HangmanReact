import { useContext } from 'react';
import { HangmanContext } from '../context/HangmanContext';

const HangmanDisplay = () => {
  const { state, handleRestartGame, handleWordGuess } = useContext(HangmanContext);
  const { word, guessedLetters, incorrectGuesses, maxIncorrectGuesses } = state;

  // Check if the word is a string before splitting it
  const maskedWord = 
    word
      .split('')
      .map(letter => (guessedLetters.includes(letter.toLowerCase()) ? letter : '_'))
      .join(' ');

  return (
    <div>
      <div>Word: {maskedWord}</div>
      <div>Incorrect Guesses: {incorrectGuesses}/{maxIncorrectGuesses}</div>
      <button onClick={handleRestartGame}>Restart Game</button>
      <input type="text" placeholder="Enter word guess" onKeyDown={(e) => e.key === 'Enter' && handleWordGuess(e.target.value)} />
    </div>
  );
};

export default HangmanDisplay;
