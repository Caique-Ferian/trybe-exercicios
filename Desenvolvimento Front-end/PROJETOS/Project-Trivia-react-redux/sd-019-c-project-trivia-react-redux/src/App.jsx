import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';
import Game from './Pages/Game';
import Login from './Pages/Login';
import Settings from './Pages/Settings';
import Feedback from './Pages/Feedback';
import Ranking from './Pages/Ranking';

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/game" component={ Game } />
          <Route exact path="/settings" component={ Settings } />
          <Route exact path="/feedback" component={ Feedback } />
          <Route exact path="/ranking" component={ Ranking } />
        </Switch>
      </div>
    );
  }
}
