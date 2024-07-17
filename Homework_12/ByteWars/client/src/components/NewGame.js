import React, { useState } from "react";
import ImgHuman from "../assets/img/human.png";
import ImgRobot from "../assets/img/robot.png";
import { GameStatus } from "./GameStatus";

export const NewGame = () => {
  const [userRobot, setUserRobot] = useState(false);
  const [userHuman, setUserHuman] = useState(false);
  const [gameId, setGameId] = useState("");

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

  const handleMove = () => {
    console.log("Attack");
  };

  return (
    <div>
      {userHuman || userRobot ? (
        <div>
          <p>Let's play as {userHuman ? "human" : "robot"}</p>
          <button type="button" onClick={handleMove}>
            Make move
          </button>
          <GameStatus gameId={gameId} />
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
