import classes from "./CardShape.module.css";
import wloczka from "../../pics/wloczka.png";
import ubranko from "../../pics/ubranko.jpg";
import catMint from "../../pics/catMint.jpg";
import drapak from "../../pics/drapak.jpg";
import drumstick from "../../pics/drumstick.png";
import milk from "../../pics/milk.png";
import rarytas from "../../pics/rarytas.png";
import tuna from "../../pics/tuna.png";
import spryskiwacz from "../../pics/spryskiwacz.png";
import tower from "../../pics/tower.jpg";
import wanted from "../../pics/wanted.jpg";
import FoodReq from "./FoodReq";
import cat from "../../pics/cat.png";
import React, {useState} from "react";

function CardShape(props) {
  const cardPics = {
    włóczka: wloczka,
    ubranko,
    kocimiętka: catMint,
    drapak,
    tower,
    kurczak: drumstick,
    mleko: milk,
    rarytas,
    tuńczyk: tuna,
    spryskiwacz,
    wanted,
    Churchill: cat,
    Suflet: cat,
    "zaginiony kot": cat,
  };
  const { [props.title]: picture } = cardPics;

  // const [eating, setEating]= useState(props.req.map((el) => {return {
  //   [el]: 0
  // }}));


  return (
    <div onDrop={props.onDrop}
     onDragOver={props.onDragOver}
      id={props.id}
      name={props.name}
      onClick={props.onClick}
      className={`${classes["main-card-container"]} ${props.title === undefined && classes.NoVisible} `}
    >
    

      {props.title !== undefined && <div
        className={`${classes["main-card-container__inner"]} ${
          classes[props.type]
        }`}
      >
        <div className={classes.cardContent}>
          <div
            className={`${classes.cardColors} ${
              props.colors === "z" && classes["emptyColorProp"]
            }`}
          >
            {props.colors}
          </div>

          <div className={classes.cardTitle}> {props.title} </div>

          <div className={classes.cardPicture}>
            <img src={picture} />
          </div>
          {
            <div
              className={`${classes.cardVP} ${
                props.VP === undefined && classes["emptyColorProp"]
              }`}
            >
              {" "}
              {props.VP === 0 ? "*" : props.VP}
            </div>
          }
          <div
            className={`${classes.cardDescription} ${
              props.description === undefined && classes["emptyColorProp"]
            }`}
          >
            {" "}
            {props.description}
          </div>
          {props.type === "type__cat" || props.type === "type__straggler" ? (
            <FoodReq req={props.req} title={props.title}/>
          ) : (
            <div
              className={`${classes.cardReq} ${
                props.req === undefined && classes["emptyColorProp"]
              }`}
            >
              {" "}
              {props.req[0] && <React.Fragment> {props.req[0]} <br /></React.Fragment>}
              {props.req[1] && <React.Fragment> {props.req[1]} <br /></React.Fragment>}
              {props.req[2]}
            </div>
          )}
        </div>
      </div>}
    </div>
  );
}

export default CardShape;
