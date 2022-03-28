import React from 'react';
import Pokemon from './Pokemon';
import data from './data';

class Pokedex extends React.Component {
  
    render(){
    return (
      <div className="pokedex">
        {data.map((pokemon) => <Pokemon 
         name={pokemon.name} 
         type={pokemon.type} 
         averageWeight={pokemon.averageWeight} 
         image={pokemon.image}
         key={pokemon.id} />
        )}
      </div>
      );
  }
}

export default Pokedex;
