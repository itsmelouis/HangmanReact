import { useContext, useState, useEffect } from 'react';
import { HangmanContext } from '../context/HangmanContext';
import HangmanDisplay from './HangmanDisplay';
import GuessInput from './GuessInput';

const Game = () => {
  const { state, dispatch, handleLetterClick } = useContext(HangmanContext);
  const { loading, error, gameStatus, incorrectGuesses } = state;
  const [winnerName, setWinnerName] = useState('');

  const penduImages = [
    "../src/assets/0.jpg",
    "../src/assets/1.jpg",
    "../src/assets/2.jpg",
    "../src/assets/3.jpg",
    "../src/assets/4.jpg",
    "../src/assets/5.jpg",
    "../src/assets/6.jpg",
    "../src/assets/7.jpg",
  ];

  const handleWinSubmit = (e) => {
    e.preventDefault();
    const newWinner = {
      name: winnerName,
      date: new Date().toISOString(),
      score: state.score
    };

    let winners = JSON.parse(localStorage.getItem('winners')) || [];
    winners.push(newWinner);
    winners = winners.filter(winner => winner && winner.name);
    winners.sort((a, b) => (a.name && b.name) ? a.name.localeCompare(b.name) : 0);
    localStorage.setItem('winners', JSON.stringify(winners));
    setWinnerName('');
  };
  const fetchWord = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/nmondon/mots-frequents/master/data/frequence.json');
      if (!response.ok) {
        throw new Error('Une erreur est survenue lors de la récupération du mot');
      }
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomWord = data[randomIndex].label;
      console.log(randomWord);
      dispatch({ type: 'SET_WORD', payload: randomWord });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  };

  const handleRestartGame = () => {
    dispatch({ type: 'RESET' });
    fetchWord();
  }

  useEffect(() => {


    fetchWord();

  }, []);

  useEffect(() => {
    if (state.gameStatus === 'ongoing' && state.guessedLetters.length > 0) {
      const wordWithoutSpaces = state.word.replace(/\s/g, '');
      const guessedWord = state.word
        .split('')
        .map(letter => (state.guessedLetters.includes(letter.toLowerCase()) ? letter : '_'))
        .join('')
        .replace(/\s/g, '');
      if (guessedWord === wordWithoutSpaces) {
        dispatch({ type: 'WIN', payload: 1});
      } else if (state.incorrectGuesses >= state.maxIncorrectGuesses) {
        dispatch({ type: 'LOSE' });
      }
    }
  }, [state.word, state.guessedLetters, state.incorrectGuesses, state.maxIncorrectGuesses, state.gameStatus]);



  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur : {error}</div>;

  return (
    <div className="game-container">
      <h1>Jeu du Pendu</h1>
      <HangmanDisplay />
      <div className="letters-container">
        {Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)).map((letter) => (
          <button key={letter} onClick={() => handleLetterClick(letter)} disabled={state.guessedLetters.includes(letter)}>
            {letter.toUpperCase()}
          </button>
        ))}
      </div>
      <GuessInput />
      {gameStatus === 'lose' && <>
        <div className="lose-message">
          Désolé, vous avez perdu. Le mot était: {state.word}
        </div>
        <button className='focus:outline-none text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2' onClick={() => handleRestartGame()}> Rejouer </button>
      </>
      }
      {gameStatus === 'win' && <form onSubmit={handleWinSubmit}>
        <h2>Félicitations, vous avez gagné !</h2>
        <input
          type="text"
          placeholder="Entrez votre nom"
          value={winnerName}
          onChange={(e) => setWinnerName(e.target.value)}
          required
        />
        <button className='focus:outline-none text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2' onClick={() => handleRestartGame()}> Rejouer </button>
        <button className='focus:outline-none text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2' type="submit">Enregistrer le score</button>
      </form>}

      <img src={penduImages[incorrectGuesses]} alt="Pendu image" />
    </div>
  );
};

export default Game;
