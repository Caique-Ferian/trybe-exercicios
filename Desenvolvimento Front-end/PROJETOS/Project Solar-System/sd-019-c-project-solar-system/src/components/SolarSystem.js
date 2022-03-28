import React from 'react';
import Title from './Title';
import PlanetCard from './PlanetCard';
import planets from '../data/planets';

class SolarSystem extends React.Component {
  render() {
    return (
      <div data-testid="solar-system">
        <Title headline="Planetas" />
        <section className="planets-container">
          {planets.map((planet) => (<PlanetCard
            planetName={ planet.name }
            planetImage={ planet.image }
            key={ planet.name }
          />))}
        </section>
      </div>
    );
  }
}

export default SolarSystem;
