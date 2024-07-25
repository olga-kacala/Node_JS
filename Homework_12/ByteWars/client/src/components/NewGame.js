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
    await handleNewGame("human");
  };

  const handleRobot = async () => {
    setUserRobot(true);
    await handleNewGame("robot");
  };

  const handleNewGame = async (side) => {
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
      setUserHP(100);
      setOpponentHP(100);
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  const handleRestartGame = async () => {
    setUserRobot(false);
    setUserHuman(false);
    setGameId("");
    setUserHP(100);
    setOpponentHP(100);
  };

  const handleAttack = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/attack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ gameId }),
      });

      if (!response.ok) {
        throw new Error("Failed to make attack");
      }

      const data = await response.json();
      console.log("Attack response data:", data);
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
          {userHP <= 0 || opponentHP <= 0 ? (
            <button type="button" onClick={handleRestartGame}>
              New Game
            </button>
          ) : (
            <button type="button" onClick={handleAttack}>
              Attack!
            </button>
          )}

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
