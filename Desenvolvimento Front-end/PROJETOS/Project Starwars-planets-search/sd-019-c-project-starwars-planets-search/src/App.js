import React from 'react';
import './App.css';
import Home from './pages/Home';
import ProviderStarWars from './context/StarWars';

function App() {
  return (
    <ProviderStarWars>
      <Home />
    </ProviderStarWars>
  );
}

export default App;
