import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import DaList from '../components/DaList';
import CreateADa from '../components/CreateADa';
import FightScreen from '../components/FightScreen';
import ResultScreen from '../components/ResultScreen';
import FinishScreen from '../components/FinishScreen';
import ModeScreen from '../components/ModeScreen';
import Multiplayer from '../components/Multiplayer';
import Simulation from '../components/Simulation';
import MultiplayerFightScreen from '../components/MultiplayerFightScreen'
import SimulationFightScreen from '../components/SimulationFightScreen'
import Scoreboard from '../components/Scoreboard';
import Request from '../helpers/request';
import MultiplayerResultScreen from '../components/MultiplayerResultScreen';

const DaContainer = () => {
  const [das, setDas] = useState([])
  const [playerDa, setPlayerDa] = useState(null)
  const [computerDa, setComputerDa] = useState(null)
  const [winner, setWinner] = useState(null)
  const [gameFinished, setGameFinished] = useState(null)
  const [playerTwoDa, setPlayerTwoDa] = useState(null)
  const [messages, setMessages] = useState([])
  const [multiplayer, setMultiplayer] = useState(false)

  const requestAll = function () {
    const request = new Request();
    const dasPromise = request.get('/select')
    const messagesPromise = request.get('/select-messages')

    Promise.all([dasPromise])
      .then((data) => {
        setDas(data[0])
      })

    Promise.all([messagesPromise])
      .then((data) => {
        setMessages(data[0])
      })
  }

  useEffect(() => {
    requestAll()
  }, [])

  useEffect(() => {
    selectComputerDa()
  }, [playerDa])

  //   const playMusic = function () {
  //     let music = new Audio("/main_page_screen.wav")
  //     music.play();
  // }

  const handlePost = function (da) {
    const request = new Request();
    request.post("/create-a-da", da)
      .then(() => window.location = '/select')
  }

  const findDaById = function (id) {
    return das.find((da) => {
      return da.id === parseInt(id);
    })
  }

  const handleUpdate = function (da) {
    const request = new Request();
    request.patch('/scoreboard/' + da.id, da)
    // .then(() => {
    //   window.location = '/scoreboard/:id'
    // })
  }

  const onDaClicked = function (da) {
    setPlayerDa(da);
    // <Route path="/result" render={() => {
    //   return <ResultScreen />
    // }} />
  }

  const changeMultiplayer = function (bool) {
    setMultiplayer(bool);
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
          <Route path="/select" render={() => {
            return <DaList classname="DaList" das={das} onDaClicked={onDaClicked} />
          }} />
          <Route path="/fight" render={() => {
            return <FightScreen playerDa={playerDa} computerDa={computerDa} onGameFinished={onGameFinished} das={das} />
          }} />
          <Route path="/multiplayerfight" render={() => {
            return <MultiplayerFightScreen playerDa={playerDa} playerTwoDa={playerTwoDa} onGameFinished={onGameFinished} changeMultiplayer={changeMultiplayer} />
          }} />
          <Route path="/simulationfight" render={() => {
            return <SimulationFightScreen computerDaOne={playerDa} computerDaTwo={playerTwoDa} onGameFinished={onGameFinished} changeMultiplayer={changeMultiplayer} />
          }} />
          <Route path="/mode" render={() => {
            return <ModeScreen />
          }} />
          <Route path="/multiplayer" render={() => {
            return <Multiplayer das={das} onDaClicked={onDaClicked} onPlayerTwoDaClicked={onPlayerTwoDaClicked} />
          }} />
          <Route path="/simulation" render={() => {
            return <Simulation das={das} onDaClicked={onDaClicked} onPlayerTwoDaClicked={onPlayerTwoDaClicked} />
          }} />
          {/* <Route path="/result" render={() => {
          return <ResultScreen playerDa={playerDa} computerDa={computerDa} />
        }} /> */}
          <Route path="/create-a-da" render={() => {
            return <CreateADa handlePost={handlePost} />
          }} />
          <Route path="/scoreboard/:id" render={(props) => {
            const id = props.match.params.id;
            const da = findDaById(id);
            return <Scoreboard das={das} handleUpdate={handleUpdate} />
          }} />
        </Switch>
      </div>
    )
  } else if (gameFinished != null) {
    return (
      <div>
        <FinishScreen winner={winner} />
      </div>
    )
  } else if (multiplayer === true) {
    return (
      <div>
        <MultiplayerResultScreen winner={winner} playerDa={playerDa} playerTwoDa={playerTwoDa} onGameFinished={onGameFinished} das={das} onChooseNextRandomDa={onChooseNextRandomDa} onPlayerDaContinue={onPlayerDaContinue} onNewDasList={onNewDasList} onAllDasBeaten={onAllDasBeaten} messages={messages} changeMultiplayer={changeMultiplayer} />
      </div>
    )
  } else {
  return (
    <div>
      <ResultScreen winner={winner} playerDa={playerDa} onGameFinished={onGameFinished} das={das} computerDa={computerDa} onChooseNextRandomDa={onChooseNextRandomDa} onPlayerDaContinue={onPlayerDaContinue} onNewDasList={onNewDasList} onAllDasBeaten={onAllDasBeaten} messages={messages} />
    </div>
  )
}
}

export default DaContainer;