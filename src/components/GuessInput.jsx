import { useState, useContext } from 'react';
import { HangmanContext } from '../context/HangmanContext';

const GuessInput = () => {
  const [guess, setGuess] = useState('');
  const { state, dispatch } = useContext(HangmanContext);
  const { guessedLetters, word, incorrectGuesses, maxIncorrectGuesses } = state;

  const handleGuess = () => {
    const normalizedGuess = guess.trim().toLowerCase();
    if (normalizedGuess.length === 1 && !guessedLetters.includes(normalizedGuess)) {
      if (word.toLowerCase().includes(normalizedGuess)) {
        dispatch({ type: 'GUESS_LETTER', payload: normalizedGuess });
      } else {
        dispatch({ type: 'INCORRECT_GUESS' });
      }
    } else if (normalizedGuess.length > 1) {
      if (normalizedGuess === word.toLowerCase()) {
        dispatch({ type: 'WIN', payload: 2});
      } else {
        dispatch({ type: 'INCORRECT_GUESS' });
        if (incorrectGuesses >= maxIncorrectGuesses) {
          dispatch({ type: 'LOSE' });
        }
      }
    }
    setGuess('');
  };

  return (
    <div>
      <input 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-300 focus:border-green-300 block p-2.5"
        type="text"
        placeholder="Enter word guess"
        value={guess}
        onChange={e => setGuess(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleGuess()} // Permettre la validation avec la touche Entrée
      />
      <button
        className="focus:outline-none text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        onClick={handleGuess}
      >
        Deviner
      </button>
    </div>
  );
};


export default GuessInput;
