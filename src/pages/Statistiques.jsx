/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';

const Statistiques = () => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const storedWinners = JSON.parse(localStorage.getItem('winners')) || [];
    setWinners(storedWinners);
  }, []);

  return (
    <div>
      <h2>Gagnants</h2>
      <ul>
        {winners.map((winner, index) => (
          <li key={index}>{winner.name} - {winner.date ? new Date(winner.date).toLocaleDateString() : 'Date inconnue'} {winner.score} points</li>
        ))}
      </ul>
    </div>
  );
};

export default Statistiques;
