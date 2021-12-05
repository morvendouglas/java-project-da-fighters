import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import DaList from '../components/DaList';
import DaForm from '../components/DaForm';
import Request from '../helpers/request';
import FightScreen from '../components/FightScreen';
import Home from '../components/Home';
import ResultScreen from '../components/ResultScreen';
import FinishScreen from '../components/FinishScreen';
import ModeScreen from '../components/ModeScreen';
import Multiplayer from '../components/Multiplayer';


const DaContainer = () => {
  const [das, setDas] = useState([]);
  const [playerDa, setPlayerDa] = useState(null)
  const [computerDa, setComputerDa] = useState(null)
  const [winner, setWinner] = useState(null)
  const [gameFinished, setGameFinished] = useState(null)
  const [playerTwoDa, setPlayerTwoDa] = useState(null)

  const requestAll = function () {
    const request = new Request();
    const dasPromise = request.get('/das')

    Promise.all([dasPromise])
      .then((data) => {
        setDas(data[0]);
      })
  }

  useEffect(() => {
    requestAll()
  }, [])

  useEffect(() => {
    selectComputerDa()
  }, [playerDa])

  const handlePost = function (da) {
    const request = new Request();
    request.post("/api/das", da)
      .then(() => window.location = '/das')
  }

  const onDaClicked = function (da) {
    setPlayerDa(da);
    // <Route path="/result" render={() => {
    //   return <ResultScreen />
    // }} />
  }

  const onPlayerTwoDaClicked = function (da) {
    setPlayerTwoDa(da);
  }

  const onGameFinished = function (da) {
    setWinner(da)
  }

  const onChooseNextRandomDa = function (da) {
    setComputerDa(da)
  }

  const onPlayerDaContinue = function (da) {
    setPlayerDa(da)
  }

  const onNewDasList = function (das) {
    setDas(das)
  }

  const onAllDasBeaten = function (da) {
    setGameFinished(da)
  }

  const selectComputerDa = function () {
    const copiedDas = [...das]
    for (var i = 0; i < copiedDas.length; i++) {
      if (copiedDas[i] === playerDa) {
        copiedDas.splice(i, 1);
      }
    }
    const randomIndex = Math.floor(Math.random() * copiedDas.length);
    const randomDa = copiedDas[randomIndex];
    setComputerDa(randomDa)
  }


  if (winner === null) {
    return (
      <div>
        <Switch>

          {/* <Route exact path="/das/new" render={() => {
          return <DaForm handlePost={handlePost} />
        }} /> */}
          <Route path="/select" render={() => {
            return <DaList das={das} onDaClicked={onDaClicked} />
          }} />
          <Route path="/fight" render={() => {
            return <FightScreen playerDa={playerDa} computerDa={computerDa} onGameFinished={onGameFinished} das={das} />
          }} />
          <Route path="/mode" render={() => {
            return <ModeScreen />
          }} />
          <Route path="/multiplayer" render={() => {
            return <Multiplayer das={das} onDaClicked={onDaClicked} onPlayerTwoDaClicked={onPlayerTwoDaClicked}/>
          }} />
          {/* <Route path="/result" render={() => {
          return <ResultScreen playerDa={playerDa} computerDa={computerDa} />
        }} /> */}
        </Switch>
      </div>
    )
  } else if (gameFinished != null) {
    return (
      <div>
        <FinishScreen />
      </div>
    )
  } else {
    return (
      <div>
        <ResultScreen winner={winner} playerDa={playerDa} onGameFinished={onGameFinished} das={das} computerDa={computerDa} onChooseNextRandomDa={onChooseNextRandomDa} onPlayerDaContinue={onPlayerDaContinue} onNewDasList={onNewDasList} onAllDasBeaten={onAllDasBeaten} />
      </div>
    )
  }
}

export default DaContainer;