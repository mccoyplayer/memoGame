import { useState } from "react";
import MainScreen from "./components/MainScreen";
import GameScreen from "./components/GameScreen"
import FinishScreen from "./components/FinishScreen";

function App() {

  // VARIABLES DE ESTADO
  const [stateGame, setStateGame] = useState(0)
  const [level, setLevel] = useState(0)

  // OBJETO CON NUMERO DE CARTAS, SEGUN NIVEL
  const cardsByLevel = {
      0: 8,
      1: 16,
      2: 24
  }

  // CAMBIAR DIFICULTAD
  const changeDifficulty = () =>{
    setLevel( level === 2 ? 0 : level + 1)
  }

  // CAMBIAR EL ESTADO DE JUEGO 0: NO INICIADO, 1: EN PROCESO, 2:FINALIZAO
  const changeStateGame = ( value ) =>{
    setStateGame(value)
    if( value === 1) playTimer()
  }

  // const reiniciar el juego
  const restartGame = () => {
    setStateGame(0)
    setLevel(0)
    resetTimer()
  }

  // CONTADOR DE TIEMPO
  const [intervalId, setIntervalId] = useState(0);
  const [mainMiliseconds, setMainMiliseconds] = useState(0);
  const playTimer = () => { 

    if(intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
    }
    
    const newIntervalId = setInterval( () =>{
      setMainMiliseconds( mainMiliseconds => mainMiliseconds + 1000 )
    }, 1000)
    
    setIntervalId(newIntervalId);
  }

  const resetTimer = () =>{
    setMainMiliseconds(0)
    if(intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
    }
  }

  return (
    <div className="container middle">
      { 
        stateGame === 0 ?
        <MainScreen 
          setStart={changeStateGame} 
          level={level} 
          changeDifficulty={changeDifficulty} 
        /> : stateGame === 1 ?
        <GameScreen 
          numCards={cardsByLevel[level]} 
          setRestart = {restartGame}
          setFinish={changeStateGame} 
          time={mainMiliseconds}
        /> : <FinishScreen setRestart={restartGame} />
      }
    </div>
  );
}

export default App;
