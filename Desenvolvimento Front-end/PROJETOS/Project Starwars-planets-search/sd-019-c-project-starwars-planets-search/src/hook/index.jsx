import { useContext } from 'react';
import { StarWarsContext } from '../context/StarWars';

export default function useStarWars() {
  const { data, filteredData, setFilteredData } = useContext(StarWarsContext);
  return ({
    data,
    filteredData,
    setFilteredData,
  });
}
