import "./App.css";
import RightSide from "./components/Chat/RightSide";
import CardShape from "./components/Table/CardShape";
import Grid from "./components/Table/Grid";
import classes from "../src/components/Table/table.module.css";
import YourCats from "./components/Table/YourCats";
import YourTreats from "./components/Table/YourTreats";
import YourHandCards from "./components/Table/YourHandCards";
import { useEffect } from "react";
import Axios from "axios";
import MainStart from "./components/mainWelkomUi/MainStart";
import React, { useState } from "react";
import Pz from "./components/Table/Pz";
import classes2 from "./components/Table/YourCards.module.css"

function App() {
  const [mainStock, setMainStock] = useState([]);
  const [playersNumber, setPlayersNumber] = useState();
  const [ready, setReady] = useState(false);
  const [myCatsArray, setMyCatsArray] = useState([]);
  const [stragglers, setStragglers] = useState([]);
  const [yourHandCards, setYourHandCards] = useState([]);
  const [spryskiwaczMode, setSpryskiwaczMode] = useState(false);
  const [zaginionyMode, setZaginionyMode] = useState(false);
  const [myPz, setMyPz] = useState(0);
  const [draggingName, setDraggingName] = useState("");
  const [draggingCatName, setDraggingCatName] = useState("");
  const [yourTreats, setYourTreats] = useState({
    tuna: 0,
    drumstick: 0,
    milk: 0,
    rarytas: 0,
  });
  const [end, setEnd] = useState(false);

  const gridFields = {
    a: [0, 3, 6],
    b: [1, 4, 7],
    c: [2, 5, 8],
    d: [6, 7, 8],
    e: [3, 4, 5],
    f: [0, 1, 2],
  };

  const [myEating, setMyEating] = useState({});

  useEffect(() => {
    console.log("useEffect z app");

    const obj = myCatsArray.reduce(
      (o, cat) => ({ ...o, [cat.title]: Array(cat.req.length).fill("x") }),
      {}
    );

    setMyEating((prev) => {
      return { ...obj, ...prev };
    });

    console.log(myEating);
  }, [ready, stragglers, myCatsArray, end]);


  function PodliczPunkty(){

  }

  function startTheGame(playersNumber) {
    if (playersNumber > 0) {
      Axios.get("http://localhost:3001/getCardsfromDatabase" + playersNumber)
        .then((response) => {
          for (let i =0; i<60; i++){
            response.data.pop();
          }
          response.data.pop();
          response.data.pop();

          if (playersNumber < 4) {
            setMainStock(response.data); //.pop().pop());
          } else {
            setMainStock(response.data);
          }
        })
        .then(
          Axios.get("http://localhost:3001/getStragglersfromDatabase").then(
            (response) => {
              setStragglers(response.data.splice(0, 3));
            }
          )
        )

        .then(setReady(true));
    }
  }

  function removeOne(title) {
    setYourHandCards((prev) => {
      return prev.filter(
        (card, index) => index !== prev.findIndex((el) => el.title === title)
      );
    });
  }

  function blockRowColumn(e) {
    const { [e]: fieldArray } = gridFields;
    fieldArray.map((indx) => {
      document
        .querySelector("#myMainGrid")
        .children[indx + 6].classList.add("unableCard");
    });
    document.getElementById(e).classList.add("unableCard");
  }

  // const cardArray = [
  //   "type__cat",
  //   "type__clothes",
  //   "type__tuna",
  //   "type__toy",
  //   "type__rarytas",
  //   "type__milk",
  //   "type__wanted",
  //   "type__drumstick",
  //   "type__catMint",
  //];

  function chooseStraggler(card) {
    if (!document.getElementById(card.title).classList.contains("takenOut")) {
      if (zaginionyMode === true) {
        setMyCatsArray((prev) => {
          return [...prev, card];
        });
        setStragglers((prev) => prev.map((el) => takeStragglerOut(el, card)));
        removeOne("zaginiony kot");
        removeOne("zaginiony kot");
      }

      setZaginionyMode(false);
    }
  }

  function takeStragglerOut(el, card) {
    if (card.title === el.title) {
      document.getElementById(card.title).classList.add("takenOut");
      return el;
    } else {
      return el;
    }
  }

  function dragTreat(name, cardName) {
    setDraggingName(name);
    setDraggingCatName(cardName);
  }

  function dropTreat(event) {
    let name = event.currentTarget.getAttribute("name");

    let tmpDragName = draggingName;
    console.log(name + "--name");
    console.log(myEating);
    let tempEat = myCatsArray.filter((card) => {
      return card.title === name;
    })[0].req;
    console.log("temp eating");
    console.log(tempEat);
    console.log("my iting z nejm");
    console.log(myEating[name]);
    let tempEat2 = tempEat.map((element, index) => {
      if (
        (element === draggingName || draggingName === "rarytas") &&
        myEating[name][index] === "x" &&
        tmpDragName !== ""
      ) {
        console.log("karmienie");
        setYourTreats((prev) => {
          return {
            ...prev,
            [draggingName]: prev[draggingName] - 1,
          };
        });
        tmpDragName = "";
        return draggingName;
      } else {
        console.log("NIET");
        console.log(element);
        return myEating[name][index];
      }
    });

    console.log("po karmieniu");
    console.log(tempEat2);
    setDraggingName("");
    setMyEating((prev) => {
      return { ...prev, [name]: tempEat2 };
    });
  }

  function dropTreatBack(event) {
    let tmpDragName = draggingName;
    let tempEat = myCatsArray.filter((card) => {
      return card.title === draggingCatName;
    })[0].req;

    console.log("TEST");
    console.log(tmpDragName + draggingCatName);

    let tempEat2 = tempEat.map((element, index) => {
      if (myEating[draggingCatName][index] !== "x" && tmpDragName !== "") {
        setYourTreats((prev) => {
          return {
            ...prev,
            [draggingName]: prev[draggingName] + 1,
          };
        });
        tmpDragName = "";
        return "x";
      } else {
        return myEating[draggingCatName][index];
      }
    });

    setDraggingName("");
    setMyEating((prev) => {
      return { ...prev, [draggingCatName]: tempEat2 };
    });
  }

  function dragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  return (
    <div className="App">
      {ready ? (
        <React.Fragment>
          <RightSide />
          <div className={classes.leftSide}>
            <h1> Najlepsza gra o Kotach </h1>

            <Grid
              cardArray={mainStock}
              setMyCatsArray={setMyCatsArray}
              setYourTreats={setYourTreats}
              setYourHandCards={setYourHandCards}
              gridFields={gridFields}
              blockRowColumn={blockRowColumn}
              spryskiwaczMode={spryskiwaczMode}
              setSpryskiwaczMode={setSpryskiwaczMode}
              chooseStraggler={chooseStraggler}
              arrayStraggler={stragglers}
              removeOne={removeOne}
              setEnd={setEnd}
              end={end}
            />
            <YourCats
              draggingName={draggingName}
              setDraggingName={setDraggingName}
              onDragOver={dragOver}
              onDrag={dragTreat}
              onDrop={dropTreat}
              cardArray={myCatsArray}
              title="Your adopted cats"
              treats={yourTreats}
              setYourTreats={setYourTreats}
              myEating={myEating}
            />
            <YourTreats
              treats={yourTreats}
              setYourTreats={setYourTreats}
              myPz={myPz}
              draggingName={draggingName}
              setDraggingName={setDraggingName}
              onDragOver={dragOver}
              onDrag={dragTreat}
              onDrop={dropTreatBack}
            />

            <YourHandCards
              handCards={yourHandCards}
              blockRowColumn={blockRowColumn}
              gridFields={gridFields}
              spryskiwaczMode={spryskiwaczMode}
              setSpryskiwaczMode={setSpryskiwaczMode}
              setYourHandCards={setYourHandCards}
              setZaginionyMode={setZaginionyMode}
              zaginionyMode={zaginionyMode}
              setMyPz={setMyPz}
              removeOne={removeOne}
              end={end}
            />

            {/* <CardShape type="type__toy" 
        title="włóczka"
        straggler={true}
        description="Możesz użyć 2 dowolnych przysmaków jako rarytasów"
        req={`1/3/5/8/12`}
        VP={5}
        colors="B R C"
      /> */}
            {/* <CardShape type="type__cat" />
      <CardShape type="type__clothes" />
      <CardShape type="type__tuna" />
      <CardShape type="type__rarytas" />
      <CardShape type="type__milk" />
      <CardShape type="type__wanted" />
      <CardShape type="type__drumstick" />
      <CardShape type="type__catMint" /> */}
          </div>
        </React.Fragment>
      ) : (
        <MainStart
          startTheGame={startTheGame}
          setPlayersNumber={setPlayersNumber}
          playersNumber={playersNumber}
        />
        /* <button onClick={() => startTheGame(2)}>START</button> */
      )}

      {end && (
        <div className={classes2.notification}>
          <p>
            {" "}
            <b> KONIEC GRY. </b> <br />
            Nakarm swoje koty pamiętając o zasadzie przydzielania końcowych
            punktów. Gdy skończysz przejdż do podliczania punktów klikając przycisk poniżej.
          </p>
          <button onClick={PodliczPunkty}>
            {" "}
            PODLICZANIE
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
