import React, { useState } from "react";
import classes from "./GameStatus.module.css";

export const GameStatus = ({ gameId }) => {
  const [gameStatus, setGameStatus] = useState(null);

  const fetchGameStatus = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/gameStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ gameId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setGameStatus(data);
    } catch (error) {
      console.error("Error fetching game status:", error);
    }
  };

  return (
    <div className={classes.status}>
      
      <p>
        game status: {gameStatus ? JSON.stringify(gameStatus) : "Loading..."}
      </p>
    </div>
  );
};
