import React from "react";
import classes from "./SingleCard.module.css";

export const SingleCard = ({ card, onClick }) => {
  return (
    <div className={classes.card} onClick={onClick}>
      <h3>{card.name}</h3>
      <p>Attack Power: {card.powerAttack}</p>
      <p>Attack Speed: {card.speedAttack}</p>
      <p>Luck: {card.luck}</p>
    </div>
  );
};
