import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DaContainer from './DaContainer';
import Home from '../components/Home';


const MainContainer = () => {

  return (
    <Router>
      <Switch>
        {/* <Route exact path="/das/new" component={DaContainer} /> */}
        <Route exact path="/" render ={() => {return <Home/>}} />
        <Route path="/select" component={DaContainer} />
        <Route path="/fight" component={DaContainer} />
        <Route path="/result" component={DaContainer} />

      </Switch>
    </Router>
  )
}

export default MainContainer;