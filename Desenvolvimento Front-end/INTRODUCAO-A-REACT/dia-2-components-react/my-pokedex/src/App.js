import React from 'react';
import './myCSS.css';
import Pokedex from './Pokedex';
class App extends React.Component {
  render(){

    return (
    <div>
      <h1>Pokedex</h1>
      <Pokedex/>
    </div>
    );
  }
}

export default App;
