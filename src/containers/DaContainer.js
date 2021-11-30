import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import DaList from '../components/DaList';
import DaForm from '../components/DaForm';
import Request from '../helpers/request';
import FightScreen from '../components/FightScreen';
import Home from '../components/Home';


const DaContainer = () => {
  const [das, setDas] = useState([]);
  const [playerDa, setPlayerDa] = useState(null)
  const [computerDa, setComputerDa] = useState(null)

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
    setPlayerDa(da)
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

  return (
    <>
      <Switch>

        {/* <Route exact path="/das/new" render={() => {
          return <DaForm handlePost={handlePost} />
        }} /> */}
        <Route path="/select" render={() => {
          return <DaList das={das} onDaClicked={onDaClicked} />
        }} />
        <Route path="/fight" render={() => {
          return <FightScreen playerDa={playerDa} computerDa={computerDa} />
        }} />
        {/* <Route path="/result" render={() => {
          return <ResultScreen playerDa={playerDa} computerDa={computerDa} />
        }} /> */}
      </Switch>
    </>
  )
}

export default DaContainer;