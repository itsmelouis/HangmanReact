import React, { useEffect, useState } from 'react';

const Statistics = () => {
  const [winners, setWinners] = useState([]);
  const [failures, setFailures] = useState(0);

  useEffect(() => {
    const storedWinners = JSON.parse(localStorage.getItem('winners')) || [];
    const storedFailures = parseInt(localStorage.getItem('failures'), 10) || 0;
    setWinners(storedWinners);
    setFailures(storedFailures);
  }, []);

  return (
    <div>
      <h2>Gagnants</h2>
      <ul>
        {winners.map((winner, index) => (
          // Assurez-vous d'avoir une date valide avant d'essayer de l'afficher
          <li key={index}>{winner.name} - {winner.date ? new Date(winner.date).toLocaleDateString() : 'Date inconnue'}</li>
        ))}
      </ul>
      <h2>Nombre déchecs</h2>
      <p>{failures}</p>
    </div>
  );
};

export default Statistics;
