// Components/Game.jsx
import { useContext, useState } from 'react';
import { HangmanContext } from '../context/HangmanContext';
import HangmanDisplay from './HangmanDisplay';
import GuessInput from './GuessInput';

const Game = () => {
  const { state, dispatch, handleLetterClick } = useContext(HangmanContext);
  const { loading, error, gameStatus } = state;

  // État local pour gérer le nom du gagnant
  const [winnerName, setWinnerName] = useState('');

  const handleWinSubmit = (e) => {
    e.preventDefault();
    // Création d'un nouvel objet gagnant
    const newWinner = {
      name: winnerName,
      date: new Date().toISOString()
    };
  
    let winners = JSON.parse(localStorage.getItem('winners')) || [];
    winners.push(newWinner);
    winners = winners.filter(winner => winner && winner.name);
    winners.sort((a, b) => (a.name && b.name) ? a.name.localeCompare(b.name) : 0);
    localStorage.setItem('winners', JSON.stringify(winners));
    alert(`Félicitations ${winnerName}, vous avez gagné!`);
    setWinnerName('');
  
    // Réinitialiser le jeu ou effectuer d'autres actions ici si nécessaire
  };
  
  

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur : {error}</div>;

  if (gameStatus === 'win') {
    return (
      <div className="win-container">
        <h2>Félicitations, vous avez gagné !</h2>
        <form onSubmit={handleWinSubmit}>
          <input
            type="text"
            placeholder="Entrez votre nom"
            value={winnerName}
            onChange={(e) => setWinnerName(e.target.value)}
            required
          />
          <button type="submit">Enregistrer le score</button>
        </form>
      </div>
    );
  }

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
    </div>
  );
};

export default Game;
