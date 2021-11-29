import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DaContainer from './DaContainer';

const MainContainer = () => {

  return (
    <Router>
      <Switch>
      
        {/* <Route exact path="/das/new" component={DaContainer} /> */}
        <Route path="/select" component={DaContainer} />
        <Route path="/fight" component={DaContainer} />
      </Switch>
    </Router>
  )
}

export default MainContainer;