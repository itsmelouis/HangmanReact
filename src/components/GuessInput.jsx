import { useState, useContext } from 'react';
import { HangmanContext } from '../context/HangmanContext';

const GuessInput = () => {
  const [guess, setGuess] = useState('');
  const { state, dispatch } = useContext(HangmanContext);
  const { guessedLetters, word, incorrectGuesses, maxIncorrectGuesses } = state;

  const handleGuess = () => {
    const normalizedGuess = guess.trim().toLowerCase();
    if (normalizedGuess.length === 1 && !guessedLetters.includes(normalizedGuess)) {
      // Si c'est une lettre unique non encore devinée
      if (word.toLowerCase().includes(normalizedGuess)) {
        dispatch({ type: 'GUESS_LETTER', payload: normalizedGuess });
      } else {
        // La lettre n'est pas dans le mot, compter comme une erreur
        dispatch({ type: 'INCORRECT_GUESS' });
      }
    } else if (normalizedGuess.length > 1) {
      // Si c'est un mot complet proposé
      if (normalizedGuess === word.toLowerCase()) {
        // Le mot proposé est correct
        dispatch({ type: 'WIN' });
      } else {
        // Le mot proposé est incorrect, compter comme une erreur
        dispatch({ type: 'INCORRECT_GUESS' });
        if (incorrectGuesses + 1 >= maxIncorrectGuesses) {
          // Si le nombre d'erreurs atteint le maximum après cette erreur
          dispatch({ type: 'LOSE' });
        }
      }
    }
    setGuess(''); // Réinitialiser le champ de saisie
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
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        onClick={handleGuess}
      >
        Guess
      </button>
    </div>
  );
};


export default GuessInput;
