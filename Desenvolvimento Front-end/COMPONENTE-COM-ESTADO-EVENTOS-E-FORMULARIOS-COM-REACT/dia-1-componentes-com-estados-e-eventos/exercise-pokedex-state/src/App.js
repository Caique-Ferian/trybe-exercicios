import React from 'react';
import './myCSS.css';
import Pokedex from './Pokedex';
import data from './data';
class App extends React.Component {
  render(){

    return (
    <div>
      <h1>Pokedex</h1>
      <Pokedex pokelist ={data}/>
    </div>
    );
  }
}

export default App;
