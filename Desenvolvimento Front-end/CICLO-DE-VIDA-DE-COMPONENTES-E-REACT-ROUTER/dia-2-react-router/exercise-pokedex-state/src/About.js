import React from 'react';
import PokedexImg from './Pokédex.jpg'

class About extends React.Component {
    render() {
        return(
            <div className="pokedex">
                <h2>About Pokédex</h2>
                <p>This application simulates a Pokédex, 
                    a digital enciclopedia containing all Pokémons
                </p>
                <p>One can filter Pokémons by type, and see more details for each
                    one of them.
                </p>
                <img src={PokedexImg} alt="Pokédex" />
            </div>
        );
    }
}

export default About;