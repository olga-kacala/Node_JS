import React, { useState } from "react";
import ImgHuman from "../../assets/img/human.png";
import ImgRobot from "../../assets/img/robot.png";
import { SingleCard } from "./SingleCard";
import { generateCards } from "./CardGenerator";
import classes from "./NewGame.module.css";

export const NewGame = () => {
  const [userRobot, setUserRobot] = useState(false);
  const [userHuman, setUserHuman] = useState(false);
  const [gameId, setGameId] = useState("");
  const [userHP, setUserHP] = useState(100);
  const [opponentHP, setOpponentHP] = useState(100);
  const [cards, setCards] = useState([]);
  const [attack, setAttack] = useState(0);
  const [opponentAttack, setOpponentAttack] = useState(0);

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
      
      // Generate and shuffle the cards
      let generatedCards = generateCards(side);
      generatedCards = shuffleArray(generatedCards);  // Shuffle the cards
  
      // Select the first 5 cards
      const selectedCards = generatedCards.slice(0, 5);
      setCards(selectedCards);
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };
  
  // Utility function to shuffle an array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  

  const handleRestartGame = async () => {
    setUserRobot(false);
    setUserHuman(false);
    setGameId("");
    setUserHP(100);
    setOpponentHP(100);
    setCards([]);
  };

  const handleAttack = async (attackValue) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/attack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ gameId, attackHP: attackValue }),
      });

      if (!response.ok) {
        throw new Error("Failed to make attack");
      }

      const data = await response.json();
      setAttack(data.attackHP);
      setOpponentAttack(data.opponentAttackPower);
      setUserHP(data.userHealth);
      setOpponentHP(data.opponentHealth);
    } catch (error) {
      console.error("Error making a move:", error);
    }
  };

  return (
    <div className={classes.newGame}>
      {userHuman || userRobot ? (
        <div>
          <p>Let's play as {userHuman ? "human" : "robot"}</p>
          {userHP <= 0 || opponentHP <= 0 ? (
            <button type="button" onClick={handleRestartGame}>
              New Game
            </button>
          ) : (
            <div className={classes.cardsContainer}>
              {cards.map((card, index) => (
                <SingleCard key={index} card={card} onClick={handleAttack} />
              ))}
            </div>
          )}
          <div>attack: {attack}</div>
          <div>opponent attact: {opponentAttack}</div>
          <div>user HP: {userHP}</div>
          <div>opponent HP: {opponentHP}</div>
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
