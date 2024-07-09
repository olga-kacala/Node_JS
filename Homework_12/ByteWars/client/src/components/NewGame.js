import { useState } from "react";
import ImgHuman from "../assets/img/human.png";
import ImgRobot from "../assets/img/robot.png";

export const NewGame = () => {
  const [userRobot, setUserRobot] = useState(false);
  const [userHuman, setUserHuman] = useState(false);

  const handleHuman = () => {
    setUserHuman(true);
  };

  const handleRobot = () => {
    setUserRobot (true);
  };

  return (
    <div>
      
      {(userHuman || userRobot) ? (
<div>let's play {userHuman ? 'human' : 'robot'}</div>
      ): (
<div><h2>Choose your character:</h2>
      <img title="robot" alt="robot" src={ImgRobot} onClick={handleRobot} />
      <img title="human" alt="human" src={ImgHuman} onClick={handleHuman} /></div>
      )}
    </div>
  );
};
