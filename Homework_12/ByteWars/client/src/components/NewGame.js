import { useState, useEffect } from "react";
import ImgHuman from "../assets/img/human.png";
import ImgRobot from "../assets/img/robot.png";
import { GameStatus } from "./GameStatus";

export const NewGame = () => {
  const [userRobot, setUserRobot] = useState(false);
  const [userHuman, setUserHuman] = useState(false);
  const [gameId, setGameId] = useState(null);

  useEffect(() => {
    console.log("GameId updated:", gameId);
  }, [gameId]);

  const handleHuman = () => {
    setUserHuman(true);
    startGame('human');
  };

  const handleRobot = () => {
    setUserRobot(true);
    startGame('robot');
  };

  const startGame = async (side) => {
    console.log("1", gameId);
    try {
      console.log("2", gameId);
      const response = await fetch('/api/v1/start-game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({ side })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setGameId(data.gameId);
      console.log("3", data.gameId);
    } catch (error) {
      console.error('Error starting game:', error);
    }
    console.log("4", gameId);
  };

  return (
    <div>
      {(userHuman || userRobot) ? (
        <div>
          <p>Let's play as {userHuman ? 'human' : 'robot'}</p>
          {gameId && <GameStatus gameId={gameId} />}
        </div>
      ) : (
        <div>
          <h2>Choose your character:</h2>
          <img title="robot" alt="robot" src={ImgRobot} onClick={handleRobot} />
          <img title="human" alt="human" src={ImgHuman} onClick={handleHuman} />
        </div>
      )}
    </div>
  );
};
