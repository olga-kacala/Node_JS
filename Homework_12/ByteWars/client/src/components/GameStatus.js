import React, { useState, useEffect } from 'react';

export const GameStatus = () => {
  const [gameStatus, setGameStatus] = useState(null);

  useEffect(() => {
    const fetchGameStatus = async () => {
      try {
        const response = await fetch('/api/v1/game-status');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGameStatus(data);
      } catch (error) {
        console.error('Error fetching game status:', error);
      }
    };

    fetchGameStatus();
  }, []);

  if (!gameStatus) {
    return <div>no status</div>;
  }

  return (
    <div>
      <h1>Game Status</h1>
      <pre>{JSON.stringify(gameStatus, null, 2)}</pre>
    </div>
  );
};


