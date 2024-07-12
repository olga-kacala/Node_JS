import React, { useState } from "react";
import ImgHuman from "../assets/img/human.png";
import ImgRobot from "../assets/img/robot.png";
import { GameStatus } from "./GameStatus";

export const NewGame = () => {
  const [userRobot, setUserRobot] = useState(false);
  const [userHuman, setUserHuman] = useState(false);
  

  const handleHuman = async () => {
    console.log("Human selected");
    setUserHuman(true);
    await startGame('human');
  };

  const handleRobot = async () => {
    console.log("Robot selected");
    setUserRobot(true);
    await startGame('robot');
  };

  const startGame = async (side) => {
    console.log("Starting game...");
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('/api/v1/start-game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ side })
      });

      if (!response.ok) {
        throw new Error('Failed to start game');
      }

      const data = await response.json();
      console.log('Game started:', data);
      
     
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  const handleMove = ()=>{
    console.log("Attack");
  }
  

  return (
    <div>
      {(userHuman || userRobot) ? (
        <div>
          <p>Let's play as {userHuman ? 'human' : 'robot'}</p>
          <button type="button" onClick={handleMove}>Make move</button>
          <GameStatus/>
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
