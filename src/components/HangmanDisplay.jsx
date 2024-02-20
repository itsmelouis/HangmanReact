import { useContext } from 'react';
import { HangmanContext } from '../context/HangmanContext';

const HangmanDisplay = () => {
  const { state, handleRestartGame, handleWordGuess } = useContext(HangmanContext);
  const { word, guessedLetters, incorrectGuesses, maxIncorrectGuesses } = state;

  // Check if the word is a string before splitting it
  const maskedWord = 
    word
      .split('')
      .map(letter => (guessedLetters.includes(letter.toLowerCase()) ? letter : '_'));
  return (
    <div>
      <div>{maskedWord.map((word, i) => (
        <span key={word + i}>{word}</span>
      ))}</div>
      <div>Incorrect letters: {guessedLetters.map((letter) => (
        <span key={letter}>{letter}</span>
      ))}</div>
      <div>Incorrect Guesses: {incorrectGuesses}/{maxIncorrectGuesses}</div>
      <button onClick={handleRestartGame}>Restart Game</button>
      <input type="text" placeholder="Enter word guess" onKeyDown={(e) => e.key === 'Enter' && handleWordGuess(e.target.value)} />
    </div>
  );
};

export default HangmanDisplay;
