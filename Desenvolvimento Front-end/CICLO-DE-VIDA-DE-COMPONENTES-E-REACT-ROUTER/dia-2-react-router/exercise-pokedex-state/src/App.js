import React from 'react';
import './myCSS.css';
import Pokedex from './Pokedex';
import About from './About';
import data from './data';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
class App extends React.Component {
  render(){

    return (
    <div>
      <h1>Pokédex</h1>
      <BrowserRouter>
      <div className="test">
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
      </div>
        <Switch>
          <Route exact path="/" render={ () => <Pokedex pokelist={data}/> } />
          <Route exact path="/about" component={ About } />
        </Switch>
      </BrowserRouter>
    </div>
    );
  }
}

export default App;
