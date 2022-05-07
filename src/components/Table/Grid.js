import classes from "./table.module.css";
import CardShape from "./CardShape";
import React, { useEffect, useState } from "react";
import catPaw from "../../pics/catPaw.png";
import catPawH from "../../pics/catPawH.png";
import classes2 from "./CardShape.module.css";

function Grid(props) {
  const arrayTemp = [{...props.cardArray[0]}];
  const [arrayStraggler, setArrayStraggler] = [
    props.cardArray[1],
    props.cardArray[5],
    props.cardArray[8],
  ];

  const [currentStock, setCurrentStock] = useState(
    props.cardArray.slice(9, props.cardArray.length)
  );

  const [currentGrid, setCurrentGrid] = useState(props.cardArray.slice(0, 9));
  const gridFields = props.gridFields;

  useEffect(() => {
    setCurrentStock(props.cardArray.slice(9, props.cardArray.length));
    setCurrentGrid(props.cardArray.slice(0, 9));
     
  }, [props.cardArray]);

  

  function takeCards(e) {
    if (props.spryskiwaczMode === false) {
      if (!document.getElementById(e).classList.contains("unableCard")) {
        const { [e]: fieldArray } = gridFields;
        const tempArr = [...currentGrid];
        fieldArray.map((indx) => {
          if (tempArr[indx].type === "type__cat") {
            props.setMyCatsArray((prev) =>
              prev.length
                ? [...prev, { ...tempArr[indx] }]
                : [{ ...tempArr[indx] }]
            );
          } else if (
            tempArr[indx].type === "type__milk" ||
            tempArr[indx].type === "type__tuna" ||
            tempArr[indx].type === "type__rarytas" ||
            tempArr[indx].type === "type__drumstick"
          ) {
            props.setYourTreats((prev) => {
              return {
                ...prev,
                // rarytas:8
                [tempArr[indx].type.substring(6, 20)]:
                  1 + prev[tempArr[indx].type.substring(6, 20)],
              };
            });
            //   prev.length ? [ ...prev, currentGrid[indx]] : [currentGrid[indx]] );
          } else {
            props.setYourHandCards((prev) =>
              prev.length
                ? [...prev, { ...tempArr[indx] }]
                : [{ ...tempArr[indx] }]
            );
          }
        });

        for (let i = 6; i <= 14; i++) {
          if (
            i !== 6 + fieldArray[1] &&
            i !== 6 + fieldArray[2] &&
            i !== 6 + fieldArray[0]
          ) {
            if (
              document
                .querySelector("#myMainGrid")
                .children[i].classList.contains("unableCard")
            ) {
              document
                .querySelector("#myMainGrid")
                .children[i].classList.remove("unableCard");
            }
          }
        }

        for (let i = 0; i <= 5; i++) {
          if (document.querySelector("#myMainGrid").children[i].id !== e) {
            if (
              document
                .querySelector("#myMainGrid")
                .children[i].classList.contains("unableCard")
            ) {
              document
                .querySelector("#myMainGrid")
                .children[i].classList.remove("unableCard");
            }
          }
        }

        fillCards(e);
        props.blockRowColumn(e);
      }
    } else {
      for (let i = 6; i <= 14; i++) {
        if (
          document
            .querySelector("#myMainGrid")
            .children[i].classList.contains("unableCard")
        ) {
          document
            .querySelector("#myMainGrid")
            .children[i].classList.remove("unableCard");
        }
      }

      for (let i = 0; i <= 5; i++) {
        if (
          document
            .querySelector("#myMainGrid")
            .children[i].classList.contains("unableCard")
        ) {
          document
            .querySelector("#myMainGrid")
            .children[i].classList.remove("unableCard");
        }
      }

      props.blockRowColumn(e);
      props.removeOne("spryskiwacz");
      props.setSpryskiwaczMode(false);
    }
  }

  function fillCards(e) {
    const { [e]: fieldArray } = gridFields;
    const tempArr = currentGrid;
    if (props.end === false) {
    
    tempArr[fieldArray[0]] = currentStock[0];
    tempArr[fieldArray[1]] = currentStock[1];
    tempArr[fieldArray[2]] = currentStock[2];

    setCurrentGrid(tempArr);
    setCurrentStock((prev) => prev.slice(3, props.cardArray.length - 1));
    currentStock.length < 3 && props.setEnd(true)

      if (currentStock.length < 3) {
    for (let i = 0; i <= 14; i++) {
        
          document
            .querySelector("#myMainGrid")
            .children[i].classList.add("unableCard")
        
      }
    }

  }else{
      tempArr[fieldArray[0]] = {};
      tempArr[fieldArray[1]] = {};
      tempArr[fieldArray[2]] = {};
      setCurrentGrid(tempArr);
    
      
    }
  }
  

  return (
    //   <div className={classes["grid-background"]}>
    <div className={classes["table-table__grid"]}>
      <h1 className={classes.przybledy}> przybłędy </h1>
      <div id="straggler-table" className={classes["straggler-table__grid"]}>
        {props.arrayStraggler.map((card, index) => {
          return (
            <CardShape
            key={index}
            id={card.title}
                  type={card.type}
                  title={card.title}
                  straggler={card.straggler}
                  description={card.description}
                  req={card.req}
                  VP={card.VP}
                  colors={card.colors || "z"}

              onClick={()=>{
               
                props.chooseStraggler(card)}}
            />
          );
        })}
      </div>

      <div id="myMainGrid" className={classes["main-table__grid"]}>
       

        {["a", "b", "c"].map((e, index) => (
          <img
          key={index}
            id={e}
            onClick={() => {
              takeCards(e);
            }}
            className={`${classes.catPaw} ${classes[e]}`}
            src={catPaw}
          />
        ))}
        {["d", "e", "f"].map((e, index) => (
          <img
          key={index}
            id={e}
            onClick={() => {
              takeCards(e);
            }}
            className={`${classes.catPaw} ${classes[e]}`}
            src={catPawH}
          />
        ))}

        {currentGrid.length &&
          currentGrid.map((card, index) => {
            return (
              index < 9 && (
                <CardShape
                  key={index}
                  type={card?.type}
                  title={card?.title}
                  straggler={card?.straggler}
                  description={card?.description}
                  req={card?.req}
                  VP={card?.VP}
                  colors={card?.colors || "z"}
                />
              )
            );
          })}
      </div>

      <div className={`${classes["mainStock-table__grid"]} ${props.end === true && classes2.NoVisible}`}>
        {arrayTemp.map((card, index) => {
          return (
            <CardShape
             key={index}
              id="mainStock"
              type={card}
              title="włóczka"
              straggler={true}
              description="Możesz użyć 2 dowolnych przysmaków jako rarytasów"
              req={`1) -2PZ 2-3) 1PZ x 😼 4) 2PZ x 😼`}
              VP={5}
              colors="B R C"
            />
          );
        })}
      </div>
    </div>
  );
}

export default Grid;
