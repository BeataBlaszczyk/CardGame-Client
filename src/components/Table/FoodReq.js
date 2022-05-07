import drumstick from "../../pics/drumstick.png";
import milk from "../../pics/milk.png";
import rarytas from "../../pics/rarytas.png";
import tuna from "../../pics/tuna.png";
import classes from "./treatsOnCard.module.css";
import React, { useState } from "react";

function FoodReq(props) {
  const req = {};
  const [feed, setFeed] = useState({
    tuna: 0,
    drumstick: 0,
    milk: 0,
    rarytas: 0,
  });

  props.req.forEach(function (x) {
    req[x] = (req[x] || 0) + 1;
  });
  function dragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }


  
  return (
    <div
      className={classes.treatsOnCard}
      onDrop={props.onDropBack}
      onDragOver={props.onDragOver}
      
    >
      {req["tuna"] > 0 && <p>{req["tuna"]}</p>}
      {req["tuna"] > 0 && <img className={classes.treatImg} src={tuna} />}
      {req["drumstick"] > 0 && <p>{req["drumstick"]}</p>}
      {req["drumstick"] > 0 && (
        <img className={classes.treatImg} src={drumstick} />
      )}
      {req["milk"] > 0 && <p>{req["milk"]}</p>}
      {req["milk"] > 0 && <img className={classes.treatImg} src={milk} />}
    </div>
  );
}

export default FoodReq;
