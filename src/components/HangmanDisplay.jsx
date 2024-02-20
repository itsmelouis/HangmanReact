import { useContext } from 'react';
import { HangmanContext } from '../context/HangmanContext';

const HangmanDisplay = () => {
  const { state } = useContext(HangmanContext);
  const { word, guessedLetters } = state;

  const maskedWord =
    word
      .split('')
      .map(letter => (guessedLetters.includes(letter.toLowerCase()) ? letter : '_'));
  return (
    <div>
      <div className='flex flex-row justify-center items-center gap-2'>{maskedWord.map((word, i) => (
        <span className='p-4 rounded-lg border border-orange-400' key={word + i}>{word}</span>
      ))}</div>
    </div>
  );
};

export default HangmanDisplay;
