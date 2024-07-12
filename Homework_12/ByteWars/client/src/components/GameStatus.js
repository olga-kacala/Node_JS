import React, { useState, useEffect } from 'react';

export const GameStatus = () => {
  const [gameStatus, setGameStatus] = useState(null);

 
    const fetchGameStatus = async () => {
      try {
        const response = await fetch(`/api/v1/game-status`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setGameStatus(data);
      } catch (error) {
        console.error('Error fetching game status:', error);
      }
      console.log("game status")
    };

  return (
    <div>
      <h1>Game Status</h1>
      <button onClick={fetchGameStatus}>Game Status</button>
      <p>{gameStatus}</p>
    </div>
  );
};
