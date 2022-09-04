import React from 'react';
// import DataTable from 'react-data-table-component';
import useStarWars from '../../hook';

export default function Table() {
  const { filteredData } = useStarWars();
  // const columns = filteredData.length && Object.keys(filteredData[0])
  //   .filter((element) => element !== 'residents')
  //   .map((keys) => ({ name: keys, selector: (row) => row[keys] }));
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.length && filteredData.map((data, i) => (
          <tr key={ i }>
            <td data-testid="planet-name">{data.name}</td>
            <td>{data.rotation_period}</td>
            <td>{data.orbital_period}</td>
            <td>{data.diameter}</td>
            <td>{data.climate}</td>
            <td>{data.gravity}</td>
            <td>{data.terrain}</td>
            <td>{data.surface_water}</td>
            <td>{data.population}</td>
            <td>{data.films}</td>
            <td>{data.created}</td>
            <td>{data.edited}</td>
            <td>{data.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
