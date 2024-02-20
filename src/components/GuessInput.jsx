import { useState, useContext } from 'react';
import { HangmanContext } from '../context/HangmanContext';

const GuessInput = () => {
  const [guess, setGuess] = useState('');
  const { state, dispatch } = useContext(HangmanContext);
  const { guessedLetters } = state;

  const handleGuess = () => {
    if (guess && !guessedLetters.includes(guess.toLowerCase())) {
      dispatch({ type: 'GUESS_LETTER', payload: guess });
      setGuess('');
    }
  };

  return (
    <div>
      <input 
      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-300 focus:border-green-300 block p-2.5'
      type="text" value={guess} onChange={e => setGuess(e.target.value)} />
      <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2' onClick={handleGuess}>Guess</button>
    </div>
  );
};

export default GuessInput;
