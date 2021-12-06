import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DaContainer from './DaContainer';
import Home from '../components/Home';


const MainContainer = () => {

  return (
    <Router>
      <Switch>
        <Route exact path="/" render ={() => {return <Home/>}} />
        <Route path="/select" component={DaContainer} />
        <Route path="/fight" component={DaContainer} />
        <Route path="/result" component={DaContainer} />
        <Route path="/finish" component={DaContainer} />
        <Route path="/mode" component={DaContainer} />
        <Route path="/multiplayer" component={DaContainer} />
        <Route path="/multiplayerfight" component={DaContainer} />
        <Route path="/simulation" component={DaContainer} />
        <Route path="/simulationfight" component={DaContainer} />
        <Route path="/create-a-da" component={DaContainer} />
        <Route path="/scoreboard/:id" component={DaContainer} />
      </Switch>
    </Router>
  )
}

export default MainContainer;