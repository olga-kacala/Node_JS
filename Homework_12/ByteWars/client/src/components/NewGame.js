import React, { useState } from "react";
import ImgHuman from "../assets/img/human.png";
import ImgRobot from "../assets/img/robot.png";
import { GameStatus } from "./GameStatus";

export const NewGame = () => {
  const [userRobot, setUserRobot] = useState(false);
  const [userHuman, setUserHuman] = useState(false);
  const [gameId, setGameId] = useState("");
  const [userHP, setUserHP] = useState(100);
  const [opponentHP, setOpponentHP] = useState(100);

  const handleHuman = async () => {
    setUserHuman(true);
    await startGame("human");
  };

  const handleRobot = async () => {
    setUserRobot(true);
    await startGame("robot");
  };

  const startGame = async (side) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch("http://localhost:3000/api/v1/startGame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ side }),
      });
      if (!response.ok) {
        throw new Error("Failed to start game");
      }

      const data = await response.json();
      setGameId(data.gameId);
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  const handleAttack = async () => {
    console.log("Attack initiated");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
  
      const response = await fetch("http://localhost:3000/api/v1/attack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gameId }),
      });
  
      console.log("Fetch response:", response); // Log response
      if (!response.ok) {
        throw new Error("Failed to make attack");
      }
  
      const data = await response.json();
      console.log("Attack response data:", data); // Log response data
      setUserHP(data.userHealth);
      setOpponentHP(data.opponentHealth);
    } catch (error) {
      console.error("Error making a move:", error);
    }
  };
  

  return (
    <div>
      {userHuman || userRobot ? (
        <div>
          <p>Let's play as {userHuman ? "human" : "robot"}</p>
          <button type="button" onClick={handleAttack}>
            Make move
          </button>
          <GameStatus gameId={gameId} />
          <div>user HP:{userHP}</div>
          <div>opponent HP:{opponentHP}</div>

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
