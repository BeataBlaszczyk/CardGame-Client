import classes from "./mainStart.module.css";
import React, { useState } from "react";

function MainStart(props) {
  

  return (
    <div className={classes.mainStartWindow}>
      <div className={classes["mainStartWindow__UI"]}>
        <p className={classes.welcomeTxt}>Choose players number and start the game</p>
 
        <div className={classes.InputPlayerNum}>
        <button className={classes.startButton} onClick={() => props.startTheGame(1)}> 1 </button>
        <button className={classes.startButton} onClick={() => props.startTheGame(2)}> 2 </button>
        <button className={classes.startButton} onClick={() => props.startTheGame(3)}> 3 </button>
        <button className={classes.startButton} onClick={() => props.startTheGame(4)}> 4 </button>


        </div>
     
      </div>
    </div>
  );
}

export default MainStart;
